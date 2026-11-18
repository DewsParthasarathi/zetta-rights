import type { TMDBMovie } from "../../../services/tmdbService";
import MovieCard from "../../home/components/MovieCard";
import Button from "../../../components/common/Button";

export interface TopSearchSectionProps {
  title?: string;
  movies: TMDBMovie[];
  isLoading?: boolean;
  totalResults?: number;
  onOfferClick?: (movie: TMDBMovie) => void;
  onResetFilters?: () => void;
  className?: string;
}

const TopSearchSection = ({
  title = "Top Search",
  movies,
  isLoading = false,
  totalResults,
  onOfferClick,
  onResetFilters,
  className = "",
}: TopSearchSectionProps) => {
  return (
    <section className={`w-full flex flex-col gap-5 font-century select-none ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <h2 className="text-fs22 max-[1440px]:text-fs20 font-bold text-white tracking-tight">
            {title}
          </h2>
          {totalResults !== undefined && totalResults > 0 && (
            <span className="text-fs13 text-gray-400 font-normal">
              ({totalResults} available)
            </span>
          )}
        </div>
      </div>

      {/* Grid of Movies */}
      {isLoading ? (
        <div className="grid grid-cols-5 max-[1600px]:grid-cols-4 max-[1280px]:grid-cols-3 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1 gap-5">
          {Array.from({ length: 15 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-[#18202F]/60 rounded-[10px] p-2 border border-white/5 animate-pulse flex flex-col gap-3 min-h-[380px]"
            >
              <div className="w-full aspect-[16/10] bg-white/10 rounded-[6px]" />
              <div className="w-3/4 h-5 bg-white/10 rounded mt-2" />
              <div className="w-full h-12 bg-white/5 rounded" />
              <div className="w-full h-6 bg-white/5 rounded mt-auto" />
            </div>
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-[#18202F]/40 border border-white/10 rounded-[16px] p-8">
          <div className="text-fs48 text-gray-500 mb-2">🎬</div>
          <h3 className="text-fs20 font-bold text-white mb-2">
            No Movies Found
          </h3>
          <p className="text-fs14 text-gray-400 max-w-md mb-6">
            We couldn't find any content matching your search query or selected filters.
            Try adjusting your search keywords or clearing your filters.
          </p>
          {onResetFilters && (
            <Button
              variant="primary"
              size="md"
              type="button"
              onClick={onResetFilters}
              className="!rounded-full px-6 py-2.5 font-bold text-fs14 shadow-lg cursor-pointer"
            >
              Reset All Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-5 max-[1600px]:grid-cols-4 max-[1280px]:grid-cols-3 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1 gap-5">
          {movies.map((movie, index) => (
            <div
              key={`grid-${movie.id}-${index}`}
              className="h-full relative hover:z-20 transition-all pb-3"
            >
              <MovieCard
                movie={movie}
                isFeatured={index % 6 === 0 || index % 6 === 4}
                onOfferClick={onOfferClick}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TopSearchSection;
