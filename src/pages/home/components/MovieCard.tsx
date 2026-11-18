import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store";
import { toggleFavorite } from "../../../store/movieSlice";
import {
  type TMDBMovie,
  TMDB_GENRES,
  getImageUrl,
} from "../../../services/tmdbService";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";

// LatestContent Assets
import FeaturedStar_Icon from "../../../assets/images/Home/LatestContent/FeaturedStar_Icon.png";
import Like_Icon from "../../../assets/images/Home/LatestContent/Like_Icon.png";
import Time_Icon from "../../../assets/images/Home/LatestContent/Time_Icon.png";
import StarFilled_Icon from "../../../assets/images/Home/LatestContent/StarFilled_Icon.png";
import StarOutline_Icon from "../../../assets/images/Home/LatestContent/StarOutline_Icon.png";
import Default_Img from "../../../assets/images/Home/LatestContent/Default_Img.png";

export interface MovieCardProps {
  movie: TMDBMovie;
  isFeatured?: boolean;
  onOfferClick?: (movie: TMDBMovie) => void;
  className?: string;
}

const MovieCard = ({
  movie,
  isFeatured = false,
  onOfferClick,
  className = "",
}: MovieCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const isLiked = favorites.includes(movie.id);

  // Derive poster/backdrop image URL
  const imageUrl =
    getImageUrl(movie.backdrop_path || movie.poster_path, "w500") ||
    Default_Img;

  // Resolve genres from TMDB genre_ids
  const genreNames = (movie.genre_ids || [])
    .slice(0, 3)
    .map((gid) => TMDB_GENRES[gid] || "Movie");

  // Normalized 5-star rating scale from 10-point scale
  const normalizedRating = Math.max(
    1,
    Math.min(5, (movie.vote_average || 7) / 2),
  );
  const roundedStars = Math.round(normalizedRating);

  // Realistic movie runtime simulation based on movie ID for display
  const simulatedMinutes = 85 + (Math.abs(movie.id) % 65);
  const durationText = `${Math.floor(simulatedMinutes / 60)}h ${simulatedMinutes % 60}m`;

  return (
    <div
      className={`group relative select-none font-century w-full h-full hover:z-20 ${className}`}
    >
      {/* 3D Blue Hover Backdrop matching reference UI (smoothly emerges along lower-left & bottom) */}
      <div
        className="absolute top-[44%] -left-[7%] right-0 -bottom-[5%] z-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient
              id={`movie-hover-grad-${Math.abs(movie.id)}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#0055FF" />
              <stop offset="45%" stopColor="#0077FF" />
              <stop offset="85%" stopColor="#00C8FF" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>
          </defs>
          <path
            d="M 6.5 0 L 0 86 C 0 94 2 100 6.5 100 L 88 100 C 92 100 96 97 96 91 L 96 0 Z"
            fill={`url(#movie-hover-grad-${Math.abs(movie.id)})`}
          />
        </svg>
      </div>

      {/* Main Movie Card */}
      <div className="relative z-10 flex flex-col justify-between h-full bg-[#18202F] border border-white/10 group-hover:border-white/20 rounded-[10px] p-2 transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.5)] group-hover:-translate-y-1">
        {/* Top Media / Poster Container */}
        <div className="relative aspect-[16/10] rounded-[6px] overflow-hidden bg-black/60">
          <Image
            src={imageUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Featured Badge (Top-Left) */}
          {isFeatured && (
            <div className="absolute top-2.5 left-2.5 z-20 bg-[#FABE2C] text-black font-bold text-fs12 px-2 py-0.5 rounded-[4px] flex items-center gap-1 shadow-md">
              <Image
                src={FeaturedStar_Icon}
                alt="Featured"
                className="w-2.5 h-2.5 object-contain"
              />
              <span>FEATURED</span>
            </div>
          )}

          {/* Favorite / Heart Button (Top-Right: thin white outline heart matching reference) */}
          <Button
            variant="ghost"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleFavorite(movie.id));
            }}
            className="absolute top-3 right-3 z-30 transition-transform duration-200 hover:scale-110 cursor-pointer drop-shadow-md p-0 h-auto"
            title={isLiked ? "Remove Favorite" : "Add to Favorites"}
          >
            {isLiked ? (
              <Image
                src={Like_Icon}
                alt="Liked"
                className="w-5 h-5 object-contain"
              />
            ) : (
              <svg
                className="w-5 h-5 text-white/90 hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            )}
          </Button>

          {/* Hover "Make an Offer" Button Overlay (matching reference screenshot) */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <Button
              variant="primary"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOfferClick?.(movie);
              }}
              className="bg-[#FABE2C] hover:bg-[#E5AD25] active:scale-95 text-black font-bold text-fs16 max-[1024px]:text-fs14 px-7 py-2.5 rounded-[8px] shadow-[0_6px_20px_rgba(0,0,0,0.5)] cursor-pointer transition transform scale-95 group-hover:scale-100 select-none h-auto"
            >
              Make an Offer
            </Button>
          </div>
        </div>

        {/* Movie Details */}
        <div className="flex flex-col flex-1 mt-3.5">
          {/* Movie Title */}
          <h3
            className="text-fs18 max-[1024px]:text-fs16 font-bold text-white truncate tracking-tight"
            title={movie.title}
          >
            {movie.title}
          </h3>

          {/* Overview / Description */}
          <p className="text-[#8E8E8E] text-fs12 leading-relaxed line-clamp-3 mt-1.5 min-h-[3.8em]">
            {movie.overview || "No description available for this content."}
          </p>

          {/* Duration & Genres Row */}
          <div className="flex items-center gap-1.5 mt-3.5 pt-3 border-t border-white/10 text-fs12 overflow-hidden">
            <div className="flex items-center gap-1 shrink-0 text-white">
              <Image
                src={Time_Icon}
                alt="Duration"
                className="w-3.5 h-3.5 object-contain opacity-90"
              />
              <span className="text-fs12 font-semibold">{durationText}</span>
            </div>

            <div className="flex items-center gap-1 overflow-hidden truncate">
              {genreNames.map((genre, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-[6px] border border-white/20 text-fs11 text-gray-200 font-medium whitespace-nowrap shrink-0"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Rating & Reviews Row */}
          <div className="flex items-center justify-between mt-3 text-fs12">
            {/* Star Icons & Rating score */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Image
                    key={star}
                    src={
                      star <= roundedStars ? StarFilled_Icon : StarOutline_Icon
                    }
                    alt="star"
                    className="w-3.5 h-3.5 object-contain"
                  />
                ))}
              </div>
              <span className="text-white/90 font-semibold text-fs12">
                ({normalizedRating.toFixed(1)})
              </span>
            </div>

            {/* Review Count */}
            <span className="text-white font-bold text-fs12 truncate">
              {movie.vote_count || 10} Reviews
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
