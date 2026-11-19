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
  adult?: boolean;
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface TMDBCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TMDBMovieDetail extends TMDBMovie {
  runtime?: number;
  genres_details?: { id: number; name: string }[];
  tagline?: string;
  status?: string;
  commentsCount?: number;
  likesCount?: string;
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

export const FALLBACK_EXPLORE_MOVIES: TMDBMovie[] = [
  {
    id: 101,
    title: "Love Today",
    overview:
      "A young couple is challenged by the girl's father to swap their smartphones for a day before getting married, leading to hilarious and dramatic revelations.",
    poster_path: "/iRfIti4RhDFZ11UyCmz5Mk5wtGI.jpg",
    backdrop_path: "/tLYTWKiSHoR0yVz8ScrQDa1Youu.jpg",
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
    poster_path: "/jIsKmkxMzdCZ0Ux1GVSnu8m6Na6.jpg",
    backdrop_path: "/kXElm7wt2kAXEVwJqW4cFhP43nW.jpg",
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
    poster_path: "/774UV1aCURb4s4JfEFg3IEMu5Zj.jpg",
    backdrop_path: "/dkIX4dSMuVqjfrPGunBJUR7K3LQ.jpg",
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
    poster_path: "/zSNyZUeqDdii0doQ9970E90kCkb.jpg",
    backdrop_path: "/nrVpYaBw0kqm2ySiwbxo33LnRkr.jpg",
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
    poster_path: "/zG3V1ZGzr9pRnN4y5YjupDEaSAZ.jpg",
    backdrop_path: "/cFaoWKKA3ICxbG1EUSPBak6NgLw.jpg",
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
    poster_path: "/zO4mfRXYwuOYSy4YoXGVxh3oz1p.jpg",
    backdrop_path: "/8yZGPxCT5NubBSdfw4OalHTFzA9.jpg",
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
    poster_path: "/iMUIsV6u0pPqfv1j8tGxbJw40sw.jpg",
    backdrop_path: "/fjd6RKx4Zh8UKQfjpSSkM53eJw6.jpg",
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
    poster_path: "/9jYssBJkPynlxoTV13BQTZlpfyD.jpg",
    backdrop_path: "/6KInqtZwOW5W0BpFTSmtOVYZHRH.jpg",
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
    poster_path: "/oTxPji8PY3PL0SK9e4mkt2laJKg.jpg",
    backdrop_path: "/zHcOppWpmIfbmbuvF98xTnqf4jk.jpg",
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
    poster_path: "/pGWoCTdrM4pLbMUSLJ2O6V6XTzi.jpg",
    backdrop_path: "/ymvsmF2HN2M3jkrGbQnyapP8xyf.jpg",
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
    poster_path: "/mwEn3zXAvKiMEt3xmaEynKFCqP0.jpg",
    backdrop_path: "/sYDsiXb88fMuTazC6J72PG6VpVw.jpg",
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
    poster_path: "/ea8IuI1vB8qcrH6MKPu9FP0Xtbh.jpg",
    backdrop_path: "/1ffhek5LfLX1FC7iJ9YIaEvMPRP.jpg",
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
    poster_path: "/rNI3Y4mfsOUpQidwBtZj9EjwImb.jpg",
    backdrop_path: "/suNieOOgWZ4lhFk6K94HtKIuptj.jpg",
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
    poster_path: "/sZ6b5VYTZRFI1Q66tsOQXKokre7.jpg",
    backdrop_path: "/5GWX9A160cglkIOFDFliSOxgH4h.jpg",
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
    poster_path: "/mY7hQyVcZR1qFlw7vUSO2ltwDGL.jpg",
    backdrop_path: "/32GfduBdRY95oX2YF0MAEL9WEgt.jpg",
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
    poster_path: "/yE8bsjy9hvuSY5JdtFlJGXyaTeH.jpg",
    backdrop_path: "/dVViUXK436JNODkj5NwWjMm8NYu.jpg",
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
    poster_path: "/zlh80l4fmOZy8KL34QVBtVjqYFs.jpg",
    backdrop_path: "/tKBDhCFlnA3wAH39pnhIBlb8O46.jpg",
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
    poster_path: "/5BU4qoPUPiOSiLue8ni8VdxNP4U.jpg",
    backdrop_path: "/h4zs9niqsGScMPODIkHGuwNcskf.jpg",
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
    poster_path: "/5U8MWIk9XZ60NALyOTpyX7vXIR7.jpg",
    backdrop_path: "/uygLz1ENt12Riv2ppTtdAIBRIT1.jpg",
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
    poster_path: "/k0L5ZQP4PjdNziVGvcOeaihXyCc.jpg",
    backdrop_path: "/iBfpVJCn2nKSkuWjv1Wp4GTiqoG.jpg",
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
    poster_path: "/zld0TGM1hOzRrbzzzQWWXqqT8v5.jpg",
    backdrop_path: "/lYXoJWYLKyimbVVqzx54I7DN9Iy.jpg",
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
    poster_path: "/rHcwUUy3gRVUEUepYOd7xkesiNf.jpg",
    backdrop_path: "/oSyVAH0o7nv6sMHhZUgDqxhpFHX.jpg",
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
    poster_path: "/3gN32gdxdXd96Usl1vEzg7RFMQ7.jpg",
    backdrop_path: "/o8uOj958wG6aPhWcnIsNvaPMWON.jpg",
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
    poster_path: "/4jgiaVOGD8sTjWlwBdx8q5JMJM3.jpg",
    backdrop_path: "/pyYcByKY5HyRsYdhTyIwFOnO6jT.jpg",
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
    poster_path: "/re19ZmjNy8eg3gnqO8YL2CEGOna.jpg",
    backdrop_path: "/4IY2v8g0NM2eUn8hJn9BD3wByhD.jpg",
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
    poster_path: "/waqlWEPyebrXzD5N0g9YN1p0LHN.jpg",
    backdrop_path: "/dJz5luVAulgXpyVTpReRmUJD5uI.jpg",
    vote_average: 8.0,
    vote_count: 125,
    genre_ids: [18, 53],
    release_date: "2022-12-30",
    original_language: "ta",
    adult: false,
  },
  {
    id: 904557,
    title: "Thunivu",
    overview:
      "A mysterious mastermind - Daredevil and his team forms a plan and commits bank heist to find the corporate looted people's money.",
    poster_path: "/5Cdi9MFxEGsfphvDxV4TyY4znP6.jpg",
    backdrop_path: "/oeqw3D9a8qyrSNtkZIK1QaCxBMe.jpg",
    vote_average: 7.0,
    vote_count: 47,
    genre_ids: [28, 80, 53],
    release_date: "2023-01-10",
    original_language: "ta",
    adult: false,
  },
  {
    id: 76600,
    title: "Avatar: The Way of Water",
    overview:
      "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started...",
    poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    backdrop_path: "/kJsPVzdyBrYHLomuNv5SJDXUQ2f.jpg",
    vote_average: 7.6,
    vote_count: 14905,
    genre_ids: [28, 12, 878],
    release_date: "2022-12-14",
    original_language: "en",
    adult: false,
  },
  {
    id: 155,
    title: "The Dark Knight",
    overview:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/cfT29Im5VDvjE0RpyKOSdCKZal7.jpg",
    vote_average: 8.5,
    vote_count: 37424,
    genre_ids: [28, 53, 80],
    release_date: "2008-07-16",
    original_language: "en",
    adult: false,
  },
];

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

const ADULT_KEYWORDS = [
  "erotic",
  "erotica",
  "erotism",
  "porn",
  "porno",
  "pornography",
  "pornographic",
  "xxx",
  "nsfw",
  "sex doll",
  "adult toy",
  "adult toys",
  "sex toy",
  "sex toys",
  "sex worker",
  "sex workers",
  "sex work",
  "prostitute",
  "prostitutes",
  "prostitution",
  "escort service",
  "escorts",
  "call girl",
  "call girls",
  "call boy",
  "gigolo",
  "brothel",
  "strip club",
  "strip clubs",
  "stripper",
  "strippers",
  "striptease",
  "unsimulated sex",
  "sexual intercourse",
  "sexual desire",
  "sexual passion",
  "sexual fantasy",
  "sexual intimacy",
  "sexual relationship",
  "sexual life",
  "sexual encounter",
  "sexual awakening",
  "sexual exploration",
  "sexual obsession",
  "sexual pleasures",
  "sex addict",
  "sex addiction",
  "sensual desire",
  "sensual pleasure",
  "cunnilingus",
  "fellatio",
  "blowjob",
  "blow job",
  "handjob",
  "hand job",
  "orgasm",
  "ejaculation",
  "softcore",
  "hardcore",
  "nudity",
  "nakedness",
  "nude scenes",
  "bdsm",
  "fetish",
  "incest",
  "swinger",
  "swingers",
  "orgy",
  "orgies",
  "voyeur",
  "voyeurism",
  "masturbat",
  "gangbang",
  "lustful",
  "peep show",
  "sexuality and desire",
  "intercourse",
  "b-grade erotic",
  "sleazy erotic",
  "nymphomaniac",
];

const ADULT_TITLE_BLOCKLIST = [
  "9 songs",
  "robotica",
  "shanthi appuram nithya",
  "anaagarigam",
  "modha rathri",
  "365 days",
  "fifty shades",
  "lust, caution",
  "the dreamers",
  "basic instinct",
  "nymphomaniac",
  "blue is the warmest color",
  "wild orchid",
  "caligula",
  "emmanuelle",
  "eyes wide shut",
  "anora",
  "babylon",
  "la bola negra",
  "secretary",
  "deep water",
  "chloe",
  "lie with me",
  "shortbus",
  "original sin",
  "killing me softly",
  "the voyeurs",
  "sliver",
  "wild things",
  "unfaithful",
  "below her mouth",
  "in the realm of the senses",
  "tie me up! tie me down!",
  "the piano teacher",
  "bitter moon",
  "body of evidence",
  "addicted",
  "the duke of burgundy",
];

const ADULT_MOVIE_IDS = new Set<number>([
  27,
  1644210,
  1088602,
  1088615,
  1685882,
  1422041,
  1064213,
  615777,
]);

const ADULT_KEYWORD_REGEX = new RegExp(
  `\\b(${ADULT_KEYWORDS.join("|")})\\b`,
  "i",
);

export const isAdultContent = (movie: TMDBMovie): boolean => {
  if (!movie) return false;
  if (movie.adult === true) return true;
  if (ADULT_MOVIE_IDS.has(movie.id)) return true;

  const titleLower = (movie.title || "").toLowerCase();
  const origTitleLower = (movie.original_title || "").toLowerCase();
  const overviewLower = (movie.overview || "").toLowerCase();

  for (const blockTitle of ADULT_TITLE_BLOCKLIST) {
    if (
      titleLower.includes(blockTitle) ||
      origTitleLower.includes(blockTitle)
    ) {
      return true;
    }
  }

  if (
    ADULT_KEYWORD_REGEX.test(titleLower) ||
    ADULT_KEYWORD_REGEX.test(origTitleLower) ||
    ADULT_KEYWORD_REGEX.test(overviewLower)
  ) {
    return true;
  }

  return false;
};

export const filterOutAdultContent = (movies: TMDBMovie[]): TMDBMovie[] => {
  return (movies || []).filter((movie) => movie && !isAdultContent(movie));
};

export const tmdbService = {
  getLatestMovies: async (): Promise<TMDBMovie[]> => {
    try {
      const res = await tmdbClient.get<TMDBResponse>("/movie/now_playing", {
        params: { language: "en-US", page: 1, include_adult: false },
      });
      if (res.data.results && res.data.results.length > 0) {
        return filterOutAdultContent(res.data.results);
      }
    } catch {
      void 0;
    }
    return filterOutAdultContent(FALLBACK_EXPLORE_MOVIES).slice(0, 8);
  },

  getTamilMovies: async (): Promise<TMDBMovie[]> => {
    try {
      const res = await tmdbClient.get<TMDBResponse>("/discover/movie", {
        params: {
          with_original_language: "ta",
          sort_by: "popularity.desc",
          page: 1,
          "vote_count.gte": 5,
          include_adult: false,
        },
      });
      if (res.data.results && res.data.results.length > 0) {
        return filterOutAdultContent(res.data.results);
      }
    } catch {
      void 0;
    }
    return filterOutAdultContent(
      FALLBACK_EXPLORE_MOVIES.filter((m) => m.original_language === "ta"),
    );
  },

  getShortMovies: async (): Promise<TMDBMovie[]> => {
    try {
      const res = await tmdbClient.get<TMDBResponse>("/discover/movie", {
        params: {
          "with_runtime.lte": 95,
          sort_by: "popularity.desc",
          page: 1,
          "vote_count.gte": 5,
          include_adult: false,
        },
      });
      if (res.data.results && res.data.results.length > 0) {
        return filterOutAdultContent(res.data.results);
      }
    } catch {
      void 0;
    }
    return filterOutAdultContent(FALLBACK_EXPLORE_MOVIES).slice(5, 12);
  },

  getLowBudgetMovies: async (): Promise<TMDBMovie[]> => {
    try {
      const res = await tmdbClient.get<TMDBResponse>("/discover/movie", {
        params: {
          with_genres: "18,35",
          sort_by: "popularity.desc",
          page: 2,
          "vote_count.gte": 10,
          include_adult: false,
        },
      });
      if (res.data.results && res.data.results.length > 0) {
        return filterOutAdultContent(res.data.results);
      }
    } catch {
      void 0;
    }
    return filterOutAdultContent(FALLBACK_EXPLORE_MOVIES).slice(12, 19);
  },

  getExploreMovies: async (
    params: ExploreMovieParams = {},
  ): Promise<TMDBResponse> => {
    const page = params.page || 1;
    const query = params.query?.trim();

    try {
      if (query) {
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
          let filtered = filterOutAdultContent(res.data.results);
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
          return {
            ...res.data,
            results: filterOutAdultContent(res.data.results),
          };
        }
      }
    } catch {
      void 0;
    }

    let list = filterOutAdultContent(FALLBACK_EXPLORE_MOVIES);

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

  getRecentSearchMovies: async (): Promise<TMDBMovie[]> => {
    try {
      const res = await tmdbClient.get<TMDBResponse>("/movie/popular", {
        params: { language: "en-US", page: 1, include_adult: false },
      });
      if (res.data.results && res.data.results.length > 0) {
        return filterOutAdultContent(res.data.results).slice(0, 10);
      }
    } catch {
      void 0;
    }
    return filterOutAdultContent(FALLBACK_EXPLORE_MOVIES).slice(0, 10);
  },

  getMovieDetails: async (id: number): Promise<TMDBMovieDetail | null> => {
    if (id === 102 || id === 858485) {
      return {
        id: 102,
        title: "Kantara",
        original_title: "ಕಾಂತಾರ",
        overview:
          "When greed paves the way for betrayal, scheming and murder, a young tribal reluctantly dons the traditions of his ancestors to seek justice.",
        poster_path: "/53zcbjJkLq2i62O1w7o0bL1iGv5.jpg",
        backdrop_path: "/53zcbjJkLq2i62O1w7o0bL1iGv5.jpg",
        vote_average: 9.8,
        vote_count: 1576,
        genre_ids: [28, 12, 18, 35, 53, 27],
        release_date: "2022-09-30",
        original_language: "kn",
        adult: false,
        runtime: 148,
        commentsCount: 256,
        likesCount: "5.5K +",
      };
    }

    try {
      const res = await tmdbClient.get<
        TMDBMovieDetail & {
          genres?: { id: number; name: string }[];
        }
      >(`/movie/${id}`, {
        params: { language: "en-US" },
      });

      if (res.data && !isAdultContent(res.data)) {
        return {
          ...res.data,
          genre_ids:
            res.data.genre_ids ||
            (res.data.genres ? res.data.genres.map((g) => g.id) : [28, 18]),
          runtime: res.data.runtime || 120 + (Math.abs(id) % 45),
          commentsCount: 50 + (Math.abs(id) % 300),
          likesCount: `${((Math.abs(id) % 80) / 10 + 1).toFixed(1)}K +`,
        };
      }
    } catch {
      void 0;
    }

    const fallback = FALLBACK_EXPLORE_MOVIES.find((m) => m.id === id);
    if (fallback) {
      return {
        ...fallback,
        runtime: 110 + (Math.abs(id) % 45),
        commentsCount: 100 + (Math.abs(id) % 250),
        likesCount: `${((Math.abs(id) % 70) / 10 + 2).toFixed(1)}K +`,
      };
    }

    return null;
  },

  getMovieCredits: async (
    id: number,
  ): Promise<{ cast: TMDBCastMember[]; crew: TMDBCrewMember[] }> => {
    const fallbackKantaraCast: TMDBCastMember[] = [
      {
        id: 1,
        name: "Rishab Shetty",
        character: "Kaadubettu Shiva",
        profile_path: "/eRaOUg2B02XH1l6P4juGzaPDr3u.jpg",
      },
      {
        id: 2,
        name: "Kishore Kumar G.",
        character: "Murali",
        profile_path: "/qDKUEHZRsVgbXKJjuziUnZcOC1L.jpg",
      },
      {
        id: 3,
        name: "Achyuth Kumar",
        character: "Devendra Suttooru",
        profile_path: "/zO1MoCgaz0RxILjga8VYXguROMp.jpg",
      },
      {
        id: 4,
        name: "Sapthami Gowda",
        character: "Leela",
        profile_path: "/kmWJZ7Fz2RCvOcMTuaqIxOhzKGd.jpg",
      },
      {
        id: 5,
        name: "Manasi Sudhir",
        character: "Kamala",
        profile_path: "/ujBnBxV2UQGufTkQTlf05qFzx5l.jpg",
      },
      {
        id: 6,
        name: "Pramod Shetty",
        character: "Sudhakara",
        profile_path: "/86EdpeMO9V7tQt1tgIk3MpnKSTH.jpg",
      },
      {
        id: 7,
        name: "Prakash Thuminad",
        character: "Raampa",
        profile_path: "/m328E0h7G9cZ4Y9x3Jb6K8q8Y5W.jpg",
      },
      {
        id: 8,
        name: "Deepak Rai Panaje",
        character: "Sundara",
        profile_path: null,
      },
      {
        id: 9,
        name: "Shanil Guru",
        character: "Bulla",
        profile_path: null,
      },
      {
        id: 10,
        name: "Swaraj Shetty",
        character: "Guruva",
        profile_path: null,
      },
    ];

    const fallbackKantaraCrew: TMDBCrewMember[] = [
      {
        id: 10,
        name: "Shanil Guru",
        job: "Bulla",
        department: "Crew",
        profile_path: null,
      },
      {
        id: 11,
        name: "Deepak Rai Panaje",
        job: "Sundara",
        department: "Crew",
        profile_path: null,
      },
      {
        id: 12,
        name: "Pramod Shetty",
        job: "Sudhakara",
        department: "Crew",
        profile_path: "/86EdpeMO9V7tQt1tgIk3MpnKSTH.jpg",
      },
      {
        id: 13,
        name: "Ranjan Saju",
        job: "Lacchu",
        department: "Crew",
        profile_path: null,
      },
      {
        id: 14,
        name: "Raghu Pandeshwar",
        job: "Raghu",
        department: "Crew",
        profile_path: null,
      },
      {
        id: 15,
        name: "Rishab Shetty",
        job: "Director & Writer",
        department: "Directing",
        profile_path: "/eRaOUg2B02XH1l6P4juGzaPDr3u.jpg",
      },
      {
        id: 16,
        name: "Vijay Kiragandur",
        job: "Producer",
        department: "Production",
        profile_path: null,
      },
      {
        id: 17,
        name: "B. Ajaneesh Loknath",
        job: "Music Composer",
        department: "Sound",
        profile_path: null,
      },
      {
        id: 18,
        name: "Arvind S. Kashyap",
        job: "Cinematographer",
        department: "Camera",
        profile_path: null,
      },
      {
        id: 19,
        name: "K. M. Prakash",
        job: "Editor",
        department: "Editing",
        profile_path: null,
      },
    ];

    if (id === 102 || id === 858485) {
      return {
        cast: fallbackKantaraCast,
        crew: fallbackKantaraCrew,
      };
    }

    try {
      const res = await tmdbClient.get<{
        cast: TMDBCastMember[];
        crew: TMDBCrewMember[];
      }>(`/movie/${id}/credits`);

      if (res.data) {
        return {
          cast: (res.data.cast || []).slice(0, 20),
          crew: (res.data.crew || []).slice(0, 20),
        };
      }
    } catch {
      void 0;
    }

    return {
      cast: fallbackKantaraCast,
      crew: fallbackKantaraCrew,
    };
  },

  getSimilarMovies: async (id: number): Promise<TMDBMovie[]> => {
    try {
      const res = await tmdbClient.get<TMDBResponse>(`/movie/${id}/similar`, {
        params: { language: "en-US", page: 1, include_adult: false },
      });
      if (res.data.results && res.data.results.length >= 4) {
        const filtered = filterOutAdultContent(res.data.results).filter(
          (m) => m.id !== id,
        );
        if (filtered.length >= 4) return filtered.slice(0, 10);
      }
    } catch {
      void 0;
    }

    try {
      const res = await tmdbClient.get<TMDBResponse>(`/discover/movie`, {
        params: {
          with_original_language: "ta",
          sort_by: "popularity.desc",
          page: 1,
          "vote_count.gte": 10,
          include_adult: false,
        },
      });
      if (res.data.results && res.data.results.length > 0) {
        const filtered = filterOutAdultContent(res.data.results).filter(
          (m) => m.id !== id,
        );
        if (filtered.length > 0) return filtered.slice(0, 10);
      }
    } catch {
      void 0;
    }

    return filterOutAdultContent(FALLBACK_EXPLORE_MOVIES)
      .filter((m) => m.id !== id)
      .slice(0, 10);
  },

  getMovieImages: async (
    id: number,
  ): Promise<{ backdrops: string[]; posters: string[] }> => {
    try {
      const res = await tmdbClient.get<{
        backdrops: { file_path: string }[];
        posters: { file_path: string }[];
      }>(`/movie/${id}/images`);

      if (res.data) {
        return {
          backdrops: (res.data.backdrops || [])
            .map((b) => b.file_path)
            .filter(Boolean),
          posters: (res.data.posters || [])
            .map((p) => p.file_path)
            .filter(Boolean),
        };
      }
    } catch {
      void 0;
    }

    return { backdrops: [], posters: [] };
  },

  getMovieTrailer: async (id: number): Promise<string> => {
    const KNOWN_TRAILERS: Record<number, string> = {
      101: "9fux9G4etSw",
      1032627: "9fux9G4etSw",
      102: "8mrVmf239GU",
      858485: "8mrVmf239GU",
      103: "OKBMCLhsG-o",
      743563: "OKBMCLhsG-o",
      104: "bf272SLdk9T",
      660046: "bf272SLdk9T",
      105: "vK4lG0F7v-0",
      918864: "vK4lG0F7v-0",
      106: "wF_o684DqV8",
      535156: "wF_o684DqV8",
      107: "9fux9G4etSw",
      835017: "9fux9G4etSw",
      904557: "nI9TBoMlmv4",
      937020: "xenOE1Tma0A",
      1234139: "xenOE1Tma0A",
      949229: "Po3jStA673E",
      927342: "hylIXfZeB4c",
      1118224: "s0m4TM1XRAf",
      155: "EXeTwQWrcwY",
      76600: "d9MyW72ELq0",
    };

    if (KNOWN_TRAILERS[id]) {
      return KNOWN_TRAILERS[id];
    }

    try {
      const res = await tmdbClient.get<{
        results: { key: string; site: string; type: string }[];
      }>(`/movie/${id}/videos`);

      if (res.data && res.data.results) {
        const youtubeTrailers = res.data.results.filter(
          (v) => v.site === "YouTube",
        );
        const official =
          youtubeTrailers.find((v) => v.type === "Trailer") ||
          youtubeTrailers.find((v) => v.type === "Teaser") ||
          youtubeTrailers[0];

        if (official?.key) {
          return official.key;
        }
      }
    } catch {
      void 0;
    }

    return "8mrVmf239GU";
  },
};

export default tmdbService;
