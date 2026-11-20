import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import tmdbService, { type TMDBMovie } from "../../services/tmdbService";

export interface MovieSectionState {
  movies: TMDBMovie[];
  isLoading: boolean;
  error: string | null;
}

export interface MovieState {
  latest: MovieSectionState;
  tamil: MovieSectionState;
  short: MovieSectionState;
  lowBudget: MovieSectionState;
  favorites: number[];
}

const initialSectionState: MovieSectionState = {
  movies: [],
  isLoading: false,
  error: null,
};

const initialState: MovieState = {
  latest: { ...initialSectionState },
  tamil: { ...initialSectionState },
  short: { ...initialSectionState },
  lowBudget: { ...initialSectionState },
  favorites: [],
};

export const fetchLatestMovies = createAsyncThunk(
  "movies/fetchLatest",
  async (_, { rejectWithValue }) => {
    try {
      const data = await tmdbService.getLatestMovies();
      return data;
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to fetch latest movies";
      return rejectWithValue(errorMsg);
    }
  },
);

export const fetchTamilMovies = createAsyncThunk(
  "movies/fetchTamil",
  async (_, { rejectWithValue }) => {
    try {
      const data = await tmdbService.getTamilMovies();
      return data;
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to fetch Tamil movies";
      return rejectWithValue(errorMsg);
    }
  },
);

export const fetchShortMovies = createAsyncThunk(
  "movies/fetchShort",
  async (_, { rejectWithValue }) => {
    try {
      const data = await tmdbService.getShortMovies();
      return data;
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to fetch short content";
      return rejectWithValue(errorMsg);
    }
  },
);

export const fetchLowBudgetMovies = createAsyncThunk(
  "movies/fetchLowBudget",
  async (_, { rejectWithValue }) => {
    try {
      const data = await tmdbService.getLowBudgetMovies();
      return data;
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Failed to fetch low budget movies";
      return rejectWithValue(errorMsg);
    }
  },
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestMovies.pending, (state) => {
        state.latest.isLoading = true;
        state.latest.error = null;
      })
      .addCase(fetchLatestMovies.fulfilled, (state, action) => {
        state.latest.isLoading = false;
        state.latest.movies = action.payload;
      })
      .addCase(fetchLatestMovies.rejected, (state, action) => {
        state.latest.isLoading = false;
        state.latest.error = action.payload as string;
      });

    builder
      .addCase(fetchTamilMovies.pending, (state) => {
        state.tamil.isLoading = true;
        state.tamil.error = null;
      })
      .addCase(fetchTamilMovies.fulfilled, (state, action) => {
        state.tamil.isLoading = false;
        state.tamil.movies = action.payload;
      })
      .addCase(fetchTamilMovies.rejected, (state, action) => {
        state.tamil.isLoading = false;
        state.tamil.error = action.payload as string;
      });

    builder
      .addCase(fetchShortMovies.pending, (state) => {
        state.short.isLoading = true;
        state.short.error = null;
      })
      .addCase(fetchShortMovies.fulfilled, (state, action) => {
        state.short.isLoading = false;
        state.short.movies = action.payload;
      })
      .addCase(fetchShortMovies.rejected, (state, action) => {
        state.short.isLoading = false;
        state.short.error = action.payload as string;
      });

    builder
      .addCase(fetchLowBudgetMovies.pending, (state) => {
        state.lowBudget.isLoading = true;
        state.lowBudget.error = null;
      })
      .addCase(fetchLowBudgetMovies.fulfilled, (state, action) => {
        state.lowBudget.isLoading = false;
        state.lowBudget.movies = action.payload;
      })
      .addCase(fetchLowBudgetMovies.rejected, (state, action) => {
        state.lowBudget.isLoading = false;
        state.lowBudget.error = action.payload as string;
      });
  },
});

export const { toggleFavorite } = movieSlice.actions;
export default movieSlice.reducer;
