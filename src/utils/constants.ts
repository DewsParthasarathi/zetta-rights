export const MOVIE_CATEGORIES = [
  { label: "Film Production", value: "Film Production" },
  { label: "Film Distribution", value: "Film Distribution" },
  { label: "Movie Theatre / Exhibition", value: "Movie Theatre / Exhibition" },
  { label: "OTT / Streaming Platform", value: "OTT / Streaming Platform" },
  { label: "Film Marketing", value: "Film Marketing" },
  { label: "Film Equipment Rental", value: "Film Equipment Rental" },
  { label: "Post Production", value: "Post Production" },
  { label: "Film Licensing", value: "Film Licensing" },
  { label: "Other", value: "Other" },
];

export const COUNTRIES = [
  { label: "United States", value: "United States" },
  { label: "India", value: "India" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "Canada", value: "Canada" },
  { label: "Australia", value: "Australia" },
];

export const STATES_BY_COUNTRY: Record<
  string,
  { label: string; value: string }[]
> = {
  "United States": [
    { label: "California", value: "California" },
    { label: "New York", value: "New York" },
    { label: "Texas", value: "Texas" },
    { label: "Florida", value: "Florida" },
    { label: "Georgia", value: "Georgia" },
    { label: "Washington", value: "Washington" },
    { label: "Illinois", value: "Illinois" },
  ],
  India: [
    { label: "Tamilnadu", value: "Tamilnadu" },
    { label: "Tamil Nadu", value: "Tamil Nadu" },
    { label: "Maharashtra", value: "Maharashtra" },
    { label: "Karnataka", value: "Karnataka" },
    { label: "Telangana", value: "Telangana" },
    { label: "Kerala", value: "Kerala" },
    { label: "Delhi", value: "Delhi" },
    { label: "Andhra Pradesh", value: "Andhra Pradesh" },
    { label: "West Bengal", value: "West Bengal" },
  ],
  "United Kingdom": [
    { label: "England", value: "England" },
    { label: "Scotland", value: "Scotland" },
    { label: "Wales", value: "Wales" },
    { label: "Northern Ireland", value: "Northern Ireland" },
  ],
  Canada: [
    { label: "Ontario", value: "Ontario" },
    { label: "Quebec", value: "Quebec" },
    { label: "British Columbia", value: "British Columbia" },
    { label: "Alberta", value: "Alberta" },
  ],
  Australia: [
    { label: "New South Wales", value: "New South Wales" },
    { label: "Victoria", value: "Victoria" },
    { label: "Queensland", value: "Queensland" },
    { label: "Western Australia", value: "Western Australia" },
  ],
};

const constants = {
  API_KEY: import.meta.env.VITE_API_KEY || '',
  ACCESS_TOKEN: import.meta.env.VITE_ACCESS_TOKEN || '',
  BASE_URL: import.meta.env.VITE_JSON_SERVER_URL || 'http://localhost:3001',
  TMDB_BASE_URL: import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  MOVIE_CATEGORIES,
  COUNTRIES,
  STATES_BY_COUNTRY,
}

export default constants
