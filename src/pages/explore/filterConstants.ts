export interface FilterState {
  contentTypes: string[];
  genres: string[];
  languages: string[];
  formats: string[];
}

export const CONTENT_TYPE_OPTIONS = [
  "Movie",
  "Series",
  "Short Films",
  "VR/AR",
  "Stage Plays",
  "Music",
  "Documentary",
];

export const GENRE_OPTIONS = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "SciFi",
  "Romance",
  "Horror",
  "Thriller",
  "Fantasy",
  "Musical",
  "Animation",
  "Short Films",
];

export const LANGUAGE_OPTIONS = [
  "Tamil",
  "Kannada",
  "Telugu",
  "English",
  "Hindi",
];

export const FORMAT_OPTIONS = [
  "HD",
  "Full HD",
  "DVD",
  "4K",
  "Dolby Digital",
];

export const GENRE_NAME_TO_TMDB_ID: Record<string, number> = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Horrer: 27,
  Music: 10402,
  Musical: 10402,
  Mystery: 9648,
  Romance: 10749,
  "Sci-Fi": 878,
  SciFi: 878,
  "Short Films": -1,
  "Short...": -1,
  War: 10752,
  Western: 37,
};

export const TMDB_ID_TO_GENRE_NAMES: Record<number, string[]> = {
  28: ["Action"],
  12: ["Adventure"],
  16: ["Animation"],
  35: ["Comedy"],
  80: ["Crime"],
  99: ["Documentary"],
  18: ["Drama"],
  10751: ["Family"],
  14: ["Fantasy"],
  36: ["History"],
  27: ["Horror", "Horrer"],
  10402: ["Musical", "Music"],
  9648: ["Mystery"],
  10749: ["Romance"],
  878: ["SciFi", "Sci-Fi"],
  [-1]: ["Short Films", "Short..."],
  10752: ["War"],
  37: ["Western"],
};

export const LANGUAGE_NAME_TO_CODE: Record<string, string> = {
  Tamil: "ta",
  Kannada: "kn",
  Telugu: "te",
  English: "en",
  Hindi: "hi",
};
