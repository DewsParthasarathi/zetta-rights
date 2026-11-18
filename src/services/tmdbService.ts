import axios from "axios";
import constants from "../utils/constants";

export interface TMDBMovie {
  id: number;
  title: string;
  original_title?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  release_date: string;
  original_language?: string;
}

export interface TMDBResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

export interface ExploreMovieParams {
  query?: string;
  genreId?: number | null;
  genres?: number[];
  year?: string | null;
  contentType?: string | null;
  contentTypes?: string[];
  languages?: string[];
  formats?: string[];
  sortBy?: string | null;
  page?: number;
}

// Standard TMDB genre ID map
export const TMDB_GENRES: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Musical",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

// Fallback curated movies matching the reference UI cards
export const FALLBACK_EXPLORE_MOVIES: TMDBMovie[] = [
  {
    id: 101,
    title: "Love Today",
    overview:
      "A young couple is challenged by the girl's father to swap their smartphones for a day before getting married, leading to hilarious and dramatic revelations.",
    poster_path: "/e146YxW3G0vR8H56nU2MeqQ0D4q.jpg",
    backdrop_path: "/e146YxW3G0vR8H56nU2MeqQ0D4q.jpg",
    vote_average: 8.2,
    vote_count: 588,
    genre_ids: [35, 10749, 18],
    release_date: "2022-11-04",
    original_language: "ta",
  },
  {
    id: 102,
    title: "Kantara",
    overview:
      "When greed paves the way for betrayal, scheming and murder, a young tribal man reluctantly embraces the tradition of his ancestors to protect his village.",
    poster_path: "/53zcbjJkLq2i62O1w7o0bL1iGv5.jpg",
    backdrop_path: "/53zcbjJkLq2i62O1w7o0bL1iGv5.jpg",
    vote_average: 8.4,
    vote_count: 1276,
    genre_ids: [28, 12, 18, 53],
    release_date: "2022-09-30",
    original_language: "kn",
  },
  {
    id: 103,
    title: "Vikram",
    overview:
      "A special investigator is assigned a case of serial killings, leading him into an underworld drug empire ruled by a ruthless kingpin.",
    poster_path: "/t0b2G741s2wW49d56xR2207G31s.jpg",
    backdrop_path: "/t0b2G741s2wW49d56xR2207G31s.jpg",
    vote_average: 8.5,
    vote_count: 2450,
    genre_ids: [28, 53, 80],
    release_date: "2022-06-03",
    original_language: "ta",
  },
  {
    id: 104,
    title: "Ponniyin Selvan: Part II",
    overview:
      "Arulmozhi Varman continues his journey to become the greatest ruler of the historic Chola empire in South India amidst rebellion and war.",
    poster_path: "/12wS91P90F30w7KqL5A8G435jG.jpg",
    backdrop_path: "/12wS91P90F30w7KqL5A8G435jG.jpg",
    vote_average: 8.1,
    vote_count: 10555,
    genre_ids: [28, 12, 18, 36],
    release_date: "2023-04-28",
    original_language: "ta",
  },
  {
    id: 105,
    title: "Vaathi",
    overview:
      "A young third-grade teacher is assigned to a neglected rural government school and fights corporate educational cartels to educate underprivileged children.",
    poster_path: "/80K165WzHq0aJ7YkM5T3mQo2b1p.jpg",
    backdrop_path: "/80K165WzHq0aJ7YkM5T3mQo2b1p.jpg",
    vote_average: 7.8,
    vote_count: 14,
    genre_ids: [28, 18],
    release_date: "2023-02-17",
    original_language: "ta",
  },
  {
    id: 106,
    title: "Maanaadu",
    overview:
      "On the day of a public conference by the state's Chief Minister, a common man and a corrupt police officer are trapped in a time loop.",
    poster_path: "/jYq0z1v3w7L8A1K2M9N5P6R4T8.jpg",
    backdrop_path: "/jYq0z1v3w7L8A1K2M9N5P6R4T8.jpg",
    vote_average: 8.4,
    vote_count: 2,
    genre_ids: [28, 878, 53],
    release_date: "2021-11-25",
    original_language: "ta",
  },
  {
    id: 107,
    title: "Varisu",
    overview:
      "Vijay Rajendran is a happy-go-lucky man whose life changes when his foster father dies, leaving him at the helm of a multi-billion dollar business empire.",
    poster_path: "/b0z4K9W1H3mY5T7qP8L2N6R1V5.jpg",
    backdrop_path: "/b0z4K9W1H3mY5T7qP8L2N6R1V5.jpg",
    vote_average: 7.2,
    vote_count: 12,
    genre_ids: [28, 18, 35],
    release_date: "2023-01-11",
    original_language: "ta",
  },
  {
    id: 108,
    title: "Agilan",
    overview:
      "A crane operator in Chennai harbour secretly controls illegal sea smuggling and harbors ambitious schemes to dominate maritime trade.",
    poster_path: "/p9M1K3V5W7L8N2R4T6B8Y0H2Q4.jpg",
    backdrop_path: "/p9M1K3V5W7L8N2R4T6B8Y0H2Q4.jpg",
    vote_average: 7.4,
    vote_count: 1576,
    genre_ids: [28, 53, 18],
    release_date: "2023-03-10",
    original_language: "ta",
  },
  {
    id: 109,
    title: "Viduthalai Part-1",
    overview:
      "A newly appointed police constable in a remote village finds himself caught between police brutality and a rebel guerrilla group fighting for local rights.",
    poster_path: "/w4N2P6R8T0L2K4M6V8B0Y2H4Q6.jpg",
    backdrop_path: "/w4N2P6R8T0L2K4M6V8B0Y2H4Q6.jpg",
    vote_average: 8.5,
    vote_count: 1686,
    genre_ids: [28, 18, 80],
    release_date: "2023-03-31",
    original_language: "ta",
  },
  {
    id: 110,
    title: "Rudhran",
    overview:
      "A soft-spoken IT professional turns into an unstoppable vigilante to seek revenge against a powerful loan shark syndicate that ruined his family.",
    poster_path: "/k7M9N1P3R5T7L9V1B3Y5H7Q9W1.jpg",
    backdrop_path: "/k7M9N1P3R5T7L9V1B3Y5H7Q9W1.jpg",
    vote_average: 6.8,
    vote_count: 639,
    genre_ids: [28, 53],
    release_date: "2023-04-14",
    original_language: "ta",
  },
  {
    id: 111,
    title: "Bakasuran",
    overview:
      "A retired military officer and a vigilante team up to expose a ring of cyber blackmailers exploiting young college students.",
    poster_path: "/l2V4B6Y8H0Q2W4M6N8P0R2T4K6.jpg",
    backdrop_path: "/l2V4B6Y8H0Q2W4M6N8P0R2T4K6.jpg",
    vote_average: 7.1,
    vote_count: 2314,
    genre_ids: [28, 80, 18],
    release_date: "2023-02-17",
    original_language: "ta",
  },
  {
    id: 112,
    title: "Run Baby Run",
    overview:
      "A simple bank employee's life turns upside down when a terrified medical student hides inside his car trunk one rainy evening.",
    poster_path: "/h8Q0W2M4N6P8R0T2K4V6B8Y0L2.jpg",
    backdrop_path: "/h8Q0W2M4N6P8R0T2K4V6B8Y0L2.jpg",
    vote_average: 7.3,
    vote_count: 109,
    genre_ids: [28, 53],
    release_date: "2023-02-03",
    original_language: "ta",
  },
  {
    id: 113,
    title: "Pathu Thala",
    overview:
      "An undercover police officer goes rogue while infiltrating the syndicate of an all-powerful crime kingpin who has a heart of gold for the public.",
    poster_path: "/m6N8P0R2T4K6V8B0Y2H4Q6W8L0.jpg",
    backdrop_path: "/m6N8P0R2T4K6V8B0Y2H4Q6W8L0.jpg",
    vote_average: 7.7,
    vote_count: 2559,
    genre_ids: [28, 80, 18],
    release_date: "2023-03-30",
    original_language: "ta",
  },
  {
    id: 114,
    title: "Pichaikkaran 2",
    overview:
      "A billionaire undergoes a brain-transplant surgery conducted by devious scientists and wakes up trapped in the body of a beggar.",
    poster_path: "/r4T6K8V0B2Y4H6Q8W0M2N4P6L8.jpg",
    backdrop_path: "/r4T6K8V0B2Y4H6Q8W0M2N4P6L8.jpg",
    vote_average: 6.9,
    vote_count: 55,
    genre_ids: [28, 878, 18],
    release_date: "2023-05-19",
    original_language: "ta",
  },
  {
    id: 115,
    title: "Bommai Nayagi",
    overview:
      "A resilient lower-caste father leaves no stone unturned to seek justice for his young daughter against powerful perpetrators.",
    poster_path: "/v2B4Y6H8Q0W2M4N6P8R0T2K4L6.jpg",
    backdrop_path: "/v2B4Y6H8Q0W2M4N6P8R0T2K4L6.jpg",
    vote_average: 8.0,
    vote_count: 55,
    genre_ids: [18],
    release_date: "2023-02-03",
    original_language: "ta",
  },
  {
    id: 116,
    title: "Beast",
    overview:
      "A former RAW agent trapped inside a shopping mall taken over by terrorists attempts to save the hostages through raw courage and wits.",
    poster_path: "/y4H6Q8W0M2N4P6R8T0K2V4B6L8.jpg",
    backdrop_path: "/y4H6Q8W0M2N4P6R8T0K2V4B6L8.jpg",
    vote_average: 7.0,
    vote_count: 3007,
    genre_ids: [28, 35, 53],
    release_date: "2022-04-13",
    original_language: "ta",
  },
  {
    id: 117,
    title: "Valimai",
    overview:
      "An IPS officer is tasked with hunting down a deadly gang of motorcycle-riding outlaws committing heinous crimes across the city.",
    poster_path: "/q8W0M2N4P6R8T0K2V4B6Y8H0L2.jpg",
    backdrop_path: "/q8W0M2N4P6R8T0K2V4B6Y8H0L2.jpg",
    vote_average: 7.2,
    vote_count: 152,
    genre_ids: [28, 53],
    release_date: "2022-02-24",
    original_language: "ta",
  },
  {
    id: 118,
    title: "Etharkkum Thunindhavan",
    overview:
      "A fiery lawyer defends women victims against an extortionate sex video scandal mastermind and takes justice into his own hands.",
    poster_path: "/w2M4N6P8R0T2K4V6B8Y0H2Q4L6.jpg",
    backdrop_path: "/w2M4N6P8R0T2K4V6B8Y0H2Q4L6.jpg",
    vote_average: 7.3,
    vote_count: 1373,
    genre_ids: [28, 18, 53],
    release_date: "2022-03-10",
    original_language: "ta",
  },
  {
    id: 119,
    title: "Gatta Kusthi",
    overview:
      "A chauvinistic man who wants a subservient, uneducated wife accidentally marries a national wrestling champion.",
    poster_path: "/p8R0T2K4V6B8Y0H2Q4W6M8N0L2.jpg",
    backdrop_path: "/p8R0T2K4V6B8Y0H2Q4W6M8N0L2.jpg",
    vote_average: 7.9,
    vote_count: 10143,
    genre_ids: [35, 18, 10749],
    release_date: "2022-12-02",
    original_language: "ta",
  },
  {
    id: 120,
    title: "The Legend",
    overview:
      "A renowned foreign-educated scientist returns to his native village with a mission to develop world-class affordable medical facilities.",
    poster_path: "/k4V6B8Y0H2Q4W6M8N0P2R4T6L8.jpg",
    backdrop_path: "/k4V6B8Y0H2Q4W6M8N0P2R4T6L8.jpg",
    vote_average: 6.5,
    vote_count: 13914,
    genre_ids: [28, 878, 18],
    release_date: "2022-07-28",
    original_language: "ta",
  },
  {
    id: 121,
    title: "Raangi",
    overview:
      "An investigative journalist discovers her young niece's fake social media profile is being monitored by FBI cyber agents.",
    poster_path: "/b8Y0H2Q4W6M8N0P2R4T6K8V0L2.jpg",
    backdrop_path: "/b8Y0H2Q4W6M8N0P2R4T6K8V0L2.jpg",
    vote_average: 7.1,
    vote_count: 3,
    genre_ids: [28, 53],
    release_date: "2022-12-30",
    original_language: "ta",
  },
  {
    id: 122,
    title: "Mahaan",
    overview:
      "A gentle schoolteacher goes through a mid-life crisis, sheds his strict moral constraints, and rises as a powerful liquor baron.",
    poster_path: "/h2Q4W6M8N0P2R4T6K8V0B2Y4L6.jpg",
    backdrop_path: "/h2Q4W6M8N0P2R4T6K8V0B2Y4L6.jpg",
    vote_average: 8.2,
    vote_count: 112,
    genre_ids: [28, 18, 53],
    release_date: "2022-02-10",
    original_language: "ta",
  },
  {
    id: 123,
    title: "Gargi",
    overview:
      "A school teacher fights an uphill legal battle to prove the innocence of her beloved father, who is accused of a gruesome crime.",
    poster_path: "/q4W6M8N0P2R4T6K8V0B2Y4H6L8.jpg",
    backdrop_path: "/q4W6M8N0P2R4T6K8V0B2Y4H6L8.jpg",
    vote_average: 8.6,
    vote_count: 1585,
    genre_ids: [18, 53],
    release_date: "2022-07-15",
    original_language: "ta",
  },
  {
    id: 124,
    title: "The Great Indian Kitchen",
    overview:
      "A post-marriage saga highlighting the entrapment of a cultured young woman in an oppressive, endless cycle of domestic labor.",
    poster_path: "/w6M8N0P2R4T6K8V0B2Y4H6Q8L0.jpg",
    backdrop_path: "/w6M8N0P2R4T6K8V0B2Y4H6Q8L0.jpg",
    vote_average: 8.1,
    vote_count: 428,
    genre_ids: [18],
    release_date: "2021-01-15",
    original_language: "ml",
  },
  {
    id: 125,
    title: "Christy",
    overview:
      "A young teenage boy falls deeply in love with an older tuition tutor in his coastal hometown, navigating innocence and longing.",
    poster_path: "/m8N0P2R4T6K8V0B2Y4H6Q8W0L2.jpg",
    backdrop_path: "/m8N0P2R4T6K8V0B2Y4H6Q8W0L2.jpg",
    vote_average: 7.2,
    vote_count: 350,
    genre_ids: [10749, 18],
    release_date: "2023-02-17",
    original_language: "ml",
  },
  {
    id: 126,
    title: "Sembi",
    overview:
      "An elderly grandmother and her 10-year-old granddaughter embark on a desperate journey aboard a bus escaping corrupt lawmen.",
    poster_path: "/n0P2R4T6K8V0B2Y4H6Q8W0M2L4.jpg",
    backdrop_path: "/n0P2R4T6K8V0B2Y4H6Q8W0M2L4.jpg",
    vote_average: 8.0,
    vote_count: 125,
    genre_ids: [18, 53],
    release_date: "2022-12-30",
    original_language: "ta",
  },
];

// Create Axios client configured for TMDB API
const tmdbClient = axios.create({
  baseURL: constants.TMDB_BASE_URL || "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: constants.ACCESS_TOKEN
      ? `Bearer ${constants.ACCESS_TOKEN}`
      : undefined,
  },
  params: {
    api_key: constants.API_KEY,
  },
});

export const getImageUrl = (
  path: string | null,
  size: "w500" | "original" = "w500",
): string => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const tmdbService = {
  // 1. Latest Content (Now playing / popular movies)
  getLatestMovies: async (): Promise<TMDBMovie[]> => {
    try {
      const res = await tmdbClient.get<TMDBResponse>("/movie/now_playing", {
        params: { language: "en-US", page: 1 },
      });
      if (res.data.results && res.data.results.length > 0) {
        return res.data.results;
      }
    } catch {
      // Return fallback movies if network fails
    }
    return FALLBACK_EXPLORE_MOVIES.slice(0, 8);
  },

  // 2. Tamil Content (Popular Tamil language films)
  getTamilMovies: async (): Promise<TMDBMovie[]> => {
    try {
      const res = await tmdbClient.get<TMDBResponse>("/discover/movie", {
        params: {
          with_original_language: "ta",
          sort_by: "popularity.desc",
          page: 1,
        },
      });
      if (res.data.results && res.data.results.length > 0) {
        return res.data.results;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_EXPLORE_MOVIES.filter((m) => m.original_language === "ta");
  },

  // 3. Short Content (Movies with runtime <= 90 mins)
  getShortMovies: async (): Promise<TMDBMovie[]> => {
    try {
      const res = await tmdbClient.get<TMDBResponse>("/discover/movie", {
        params: {
          "with_runtime.lte": 95,
          sort_by: "popularity.desc",
          page: 1,
        },
      });
      if (res.data.results && res.data.results.length > 0) {
        return res.data.results;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_EXPLORE_MOVIES.slice(5, 12);
  },

  // 4. Low Budget Content (Indie / drama / low budget movies)
  getLowBudgetMovies: async (): Promise<TMDBMovie[]> => {
    try {
      const res = await tmdbClient.get<TMDBResponse>("/discover/movie", {
        params: {
          with_genres: "18,35",
          sort_by: "popularity.desc",
          page: 2,
        },
      });
      if (res.data.results && res.data.results.length > 0) {
        return res.data.results;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_EXPLORE_MOVIES.slice(12, 19);
  },

  // 5. Explore: Dynamic Movies (with Search, Genre, Year, ContentType, Sort, Page)
  getExploreMovies: async (
    params: ExploreMovieParams = {},
  ): Promise<TMDBResponse> => {
    const page = params.page || 1;
    const query = params.query?.trim();

    try {
      if (query) {
        // Direct TMDB Search
        const searchParams: Record<string, string | number | boolean> = {
          query,
          page,
          include_adult: false,
          language: "en-US",
        };
        if (params.year && params.year !== "All") {
          searchParams.primary_release_year = params.year;
        }

        const res = await tmdbClient.get<TMDBResponse>("/search/movie", {
          params: searchParams,
        });

        if (res.data && res.data.results) {
          // If genre filter is active alongside search query
          let filtered = res.data.results;
          if (params.genreId) {
            filtered = filtered.filter((m) =>
              m.genre_ids?.includes(params.genreId as number),
            );
          }
          return {
            page: res.data.page,
            results: filtered,
            total_pages: res.data.total_pages,
            total_results: res.data.total_results,
          };
        }
      } else {
        // Dynamic TMDB Discover
        const discoverParams: Record<string, string | number | boolean> = {
          page,
          sort_by: params.sortBy || "popularity.desc",
          include_adult: false,
          language: "en-US",
        };

        if (params.genreId) {
          discoverParams.with_genres = params.genreId;
        } else if (params.genres && params.genres.length > 0) {
          discoverParams.with_genres = params.genres.join("|");
        }
        if (params.languages && params.languages.length > 0) {
          discoverParams.with_original_language = params.languages.join("|");
        }
        if (params.year && params.year !== "All") {
          discoverParams.primary_release_year = params.year;
        }
        if (
          params.contentType === "Short Films" ||
          params.contentTypes?.includes("Short Films")
        ) {
          discoverParams["with_runtime.lte"] = 90;
        } else if (
          params.contentType === "Documentary" ||
          params.contentTypes?.includes("Documentary")
        ) {
          discoverParams.with_genres = 99;
        } else if (
          params.contentType === "Animation" ||
          params.contentTypes?.includes("Animation")
        ) {
          discoverParams.with_genres = 16;
        }

        const res = await tmdbClient.get<TMDBResponse>("/discover/movie", {
          params: discoverParams,
        });

        if (res.data && res.data.results && res.data.results.length > 0) {
          return res.data;
        }
      }
    } catch {
      // Graceful offline fallback
    }

    // Local in-memory filtering fallback for offline or failed requests
    let list = [...FALLBACK_EXPLORE_MOVIES];

    if (query) {
      const qLower = query.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(qLower) ||
          m.overview.toLowerCase().includes(qLower),
      );
    }
    if (params.genreId) {
      list = list.filter((m) => m.genre_ids?.includes(params.genreId as number));
    }
    if (params.genres && params.genres.length > 0) {
      list = list.filter((m) =>
        params.genres!.some((gid) => m.genre_ids?.includes(gid)),
      );
    }
    if (params.languages && params.languages.length > 0) {
      list = list.filter(
        (m) =>
          m.original_language &&
          params.languages!.includes(m.original_language),
      );
    }
    if (params.year && params.year !== "All") {
      list = list.filter((m) => m.release_date.startsWith(params.year as string));
    }

    const pageSize = 20;
    const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
    const startIdx = (page - 1) * pageSize;
    const paginated = list.slice(startIdx, startIdx + pageSize);

    return {
      page,
      results: paginated,
      total_pages: totalPages,
      total_results: list.length,
    };
  },

  // 6. Recent Search / Trending Hits for the Carousel
  getRecentSearchMovies: async (): Promise<TMDBMovie[]> => {
    try {
      const res = await tmdbClient.get<TMDBResponse>("/movie/popular", {
        params: { language: "en-US", page: 1 },
      });
      if (res.data.results && res.data.results.length > 0) {
        return res.data.results.slice(0, 10);
      }
    } catch {
      // Fallback
    }
    return FALLBACK_EXPLORE_MOVIES.slice(0, 10);
  },
};

export default tmdbService;
