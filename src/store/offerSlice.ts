import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/api";
import type { RootState } from "./store";
import { addOfferToCurrentUser } from "./authSlice";
import type { OfferRecord } from "../types/offer";

export interface SubmitOfferPayload {
  movieId: number;
  movieTitle: string;
  moviePoster: string;
  movieBackdrop?: string;
  movieYear?: string;

  includedCountries: string[];
  excludedCountries: string[];
  startDate: string;
  endDate: string;
  years: number;
  months: number;

  currency: string;
  rightsType: string;
  exclusivity: "Exclusive" | "Non Exclusive";
  holdback: string;

  pricingModel: "flat_rate" | "share_revenue";
  flatRateAmount?: number;
  priceListingUnit?: string;
  totalAmount?: number;
  transactionMinPrice?: number;
  transactionMaxPrice?: number;
  revenueSharePercentage?: number;
  estimatedMonthlyMin?: number;
  estimatedMonthlyMax?: number;
  hasMinimumGuarantee?: boolean;
  minimumGuaranteeAmount?: number;
  minimumGuaranteePeriod?: string;
  minimumGuaranteeScope?: string;
}

interface OfferState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  submittedOffer: OfferRecord | null;
  userOffers: OfferRecord[];
}

const initialState: OfferState = {
  isSubmitting: false,
  isSuccess: false,
  error: null,
  submittedOffer: null,
  userOffers: [],
};

export const submitOffer = createAsyncThunk<
  OfferRecord,
  SubmitOfferPayload,
  { rejectValue: string; state: RootState }
>("offers/submitOffer", async (payload, { getState, dispatch, rejectWithValue }) => {
  try {
    const state = getState();
    const currentUser = state.auth.user;

    const userId = currentUser?.id || "1";
    const userEmail = currentUser?.email || "buyer@zetarights.com";
    const userName = currentUser?.fullName || currentUser?.name || "Alexander Vance";
    const userRole = currentUser?.role || "Buyer";
    const userCompany = currentUser?.companyName || "Apex Cinema Productions";

    const newOffer: OfferRecord = {
      ...payload,
      id: `OFFER-${Date.now()}`,
      userId,
      userEmail,
      userName,
      userRole,
      companyName: userCompany,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const endpoint = userRole === "Buyer" ? `/buyers/${userId}` : `/sellers/${userId}`;
      const userRes = await api.get(endpoint);
      const existingOffers: OfferRecord[] = userRes.data?.offers || currentUser?.offers || [];

      const filteredOffers = existingOffers.filter(
        (o) => o.id !== newOffer.id && o.movieId !== newOffer.movieId,
      );
      const updatedOffers = [...filteredOffers, newOffer];

      await api.patch(endpoint, {
        offers: updatedOffers,
      });
    } catch {
      void 0;
    }

    dispatch(addOfferToCurrentUser(newOffer));

    return newOffer;
  } catch (err: unknown) {
    const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
    const errorMsg =
      errorObj.response?.data?.message ||
      errorObj.message ||
      "Failed to submit offer. Please try again.";
    return rejectWithValue(errorMsg);
  }
});

const offerSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    resetOfferState: (state) => {
      state.isSubmitting = false;
      state.isSuccess = false;
      state.error = null;
      state.submittedOffer = null;
    },
    setUserOffers: (state, action: PayloadAction<OfferRecord[]>) => {
      state.userOffers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOffer.pending, (state) => {
        state.isSubmitting = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(submitOffer.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.isSuccess = true;
        state.error = null;
        state.submittedOffer = action.payload;
        const filtered = state.userOffers.filter(
          (o) =>
            o.id !== action.payload.id && o.movieId !== action.payload.movieId,
        );
        state.userOffers = [...filtered, action.payload];
      })
      .addCase(submitOffer.rejected, (state, action) => {
        state.isSubmitting = false;
        state.isSuccess = false;
        state.error = action.payload || "Failed to submit offer";
      });
  },
});

export const { resetOfferState, setUserOffers } = offerSlice.actions;
export default offerSlice.reducer;
