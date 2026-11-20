import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../utils/api";

import type { OfferRecord } from "../../types/offer";

export interface UserAccount {
  id?: string;
  email: string;
  fullName?: string;
  name?: string;
  mobileNumber?: string;
  companyName?: string;
  address?: string;
  city?: string;
  cities?: string[];
  state?: string;
  states?: string[];
  country?: string;
  countries?: string[];
  taxId?: string;
  category?: string;
  categories?: string[];
  profileImage?: string;
  role?: "Buyer" | "Seller";
  offers?: OfferRecord[];
}

export interface CheckAccountResult {
  exists: boolean;
  role?: "Buyer" | "Seller";
  account?: UserAccount;
  email: string;
}

export interface RegisterAccountPayload {
  email: string;
  fullName: string;
  name?: string;
  mobileNumber: string;
  role: "Buyer" | "Seller";
  companyName?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  taxId?: string;
  category?: string;
  profileImage?: string;
}

export interface RegistrationDraft {
  email: string;
  fullName: string;
  name?: string;
  mobileNumber: string;
  role?: "Buyer" | "Seller";
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserAccount | null;
  isLoading: boolean;
  error: string | null;
  accountExists: boolean | null;
  lastCheckedEmail: string | null;
  registrationDraft: RegistrationDraft | null;
}

const savedUser = localStorage.getItem("user");
const savedDraft = localStorage.getItem("registrationDraft");

const initialState: AuthState = {
  isAuthenticated: Boolean(savedUser),
  user: savedUser ? JSON.parse(savedUser) : null,
  isLoading: false,
  error: null,
  accountExists: null,
  lastCheckedEmail: null,
  registrationDraft: savedDraft ? JSON.parse(savedDraft) : null,
};

export const checkAccountByEmail = createAsyncThunk<
  CheckAccountResult,
  string,
  { rejectValue: string }
>("auth/checkAccountByEmail", async (email, { rejectWithValue }) => {
  try {
    const trimmedEmail = email.trim().toLowerCase();

    const buyersRes = await api.get<UserAccount[]>("/buyers");
    const matchedBuyer = (buyersRes.data || []).find(
      (b) => b.email?.trim().toLowerCase() === trimmedEmail,
    );

    if (matchedBuyer) {
      return {
        exists: true,
        role: "Buyer",
        account: { ...matchedBuyer, role: "Buyer" },
        email: trimmedEmail,
      };
    }

    const sellersRes = await api.get<UserAccount[]>("/sellers");
    const matchedSeller = (sellersRes.data || []).find(
      (s) => s.email?.trim().toLowerCase() === trimmedEmail,
    );

    if (matchedSeller) {
      return {
        exists: true,
        role: "Seller",
        account: { ...matchedSeller, role: "Seller" },
        email: trimmedEmail,
      };
    }

    return {
      exists: false,
      email: trimmedEmail,
    };
  } catch (err: unknown) {
    const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
    const errorMessage =
      errorObj.response?.data?.message ||
      errorObj.message ||
      "Failed to connect to JSON Server at http://localhost:3001. Ensure `npm run db` is running.";
    return rejectWithValue(errorMessage);
  }
});

export const registerAccount = createAsyncThunk<
  UserAccount,
  RegisterAccountPayload,
  { rejectValue: string }
>("auth/registerAccount", async (accountData, { rejectWithValue }) => {
  try {
    const trimmedEmail = accountData.email.trim().toLowerCase();

    const [buyersRes, sellersRes] = await Promise.all([
      api.get<UserAccount[]>("/buyers"),
      api.get<UserAccount[]>("/sellers"),
    ]);

    const emailInBuyers = (buyersRes.data || []).some(
      (b) => b.email?.trim().toLowerCase() === trimmedEmail,
    );
    const emailInSellers = (sellersRes.data || []).some(
      (s) => s.email?.trim().toLowerCase() === trimmedEmail,
    );

    if (emailInBuyers || emailInSellers) {
      return rejectWithValue(
        "An account with this email address already exists. Please login instead.",
      );
    }

    const userFullName =
      accountData.fullName?.trim() || accountData.name?.trim() || "";

    const newRecord: UserAccount = {
      id: Date.now().toString(),
      email: accountData.email.trim(),
      fullName: userFullName,
      name: userFullName,
      mobileNumber: accountData.mobileNumber.trim(),
      companyName:
        accountData.companyName?.trim() || userFullName,
      address: accountData.address?.trim() || "",
      city: accountData.city?.trim() || "",
      state: accountData.state?.trim() || "",
      country: accountData.country?.trim() || "",
      taxId: accountData.taxId?.trim() || "",
      category: accountData.category || "Film Production",
      profileImage: accountData.profileImage || "",
      role: accountData.role,
    };

    const endpoint = accountData.role === "Buyer" ? "/buyers" : "/sellers";
    const res = await api.post<UserAccount>(endpoint, newRecord);

    return res.data;
  } catch (err: unknown) {
    const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
    const errorMessage =
      errorObj.response?.data?.message ||
      errorObj.message ||
      "Failed to register account with JSON Server at http://localhost:3001.";
    return rejectWithValue(errorMessage);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserAccount>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.accountExists = null;
      state.lastCheckedEmail = null;
      state.registrationDraft = null;
      localStorage.removeItem("user");
      localStorage.removeItem("registrationDraft");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    resetAccountCheck: (state) => {
      state.accountExists = null;
      state.lastCheckedEmail = null;
    },
    setRegistrationDraft: (
      state,
      action: PayloadAction<RegistrationDraft>,
    ) => {
      state.registrationDraft = action.payload;
      localStorage.setItem(
        "registrationDraft",
        JSON.stringify(action.payload),
      );
    },
    clearRegistrationDraft: (state) => {
      state.registrationDraft = null;
      localStorage.removeItem("registrationDraft");
    },
    addOfferToCurrentUser: (state, action: PayloadAction<OfferRecord>) => {
      if (state.user) {
        const currentOffers = state.user.offers || [];
        const filtered = currentOffers.filter(
          (o) =>
            o.id !== action.payload.id && o.movieId !== action.payload.movieId,
        );
        state.user.offers = [...filtered, action.payload];
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    updateUserProfile: (state, action: PayloadAction<Partial<UserAccount>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAccountByEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAccountByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lastCheckedEmail = action.payload.email;
        state.accountExists = action.payload.exists;
        state.error = null;
      })
      .addCase(checkAccountByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to check account";
      })
      .addCase(registerAccount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        state.registrationDraft = null;
        localStorage.removeItem("registrationDraft");
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to register account";
      });
  },
});

export const {
  login,
  logout,
  clearAuthError,
  resetAccountCheck,
  setRegistrationDraft,
  clearRegistrationDraft,
  addOfferToCurrentUser,
  updateUserProfile,
} = authSlice.actions;

export default authSlice.reducer;
