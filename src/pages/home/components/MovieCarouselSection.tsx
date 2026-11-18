import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import type { TMDBMovie } from "../../../services/tmdbService";
import MovieCard from "./MovieCard";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";

// Import Swiper styles
import "swiper/css";

// Arrows
import Leftarrow_Icon from "../../../assets/images/Home/LatestContent/Leftarrow_Icon.png";
import RightArrow_Icon from "../../../assets/images/Home/LatestContent/RightArrow_Icon.png";

export interface MovieCarouselSectionProps {
  title: string;
  movies: TMDBMovie[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onOfferClick?: (movie: TMDBMovie) => void;
  featuredIndex?: number;
}

const MovieCarouselSection = ({
  title,
  movies,
  isLoading = false,
  error = null,
  onRetry,
  onOfferClick,
  featuredIndex = 0,
}: MovieCarouselSectionProps) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null,
  );
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  return (
    <section className="w-full py-5 select-none font-century">
      <div className=" mx-auto px-12 max-[1024px]:px-6 max-[640px]:px-4">
        {/* Section Header: Title & Prev/Next Arrows */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-fs22 max-[1024px]:text-fs20 max-[640px]:text-fs18 font-bold text-white tracking-tight">
            {title}
          </h2>

          <div className="flex items-center gap-2">
            {/* Prev Arrow Button */}
            <Button
              variant="unstyled"
              type="button"
              onClick={handlePrev}
              disabled={isBeginning}
              className="w-8 h-8 max-[640px]:w-7 max-[640px]:h-7 flex items-center justify-center transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-85 active:scale-95 shrink-0"
              title="Previous"
            >
              <Image
                src={Leftarrow_Icon}
                alt="Previous"
                className="w-full h-full object-contain pointer-events-none select-none"
              />
            </Button>

            {/* Next Arrow Button */}
            <Button
              variant="unstyled"
              type="button"
              onClick={handleNext}
              disabled={isEnd}
              className="w-8 h-8 max-[640px]:w-7 max-[640px]:h-7 flex items-center justify-center transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-85 active:scale-95 shrink-0"
              title="Next"
            >
              <Image
                src={RightArrow_Icon}
                alt="Next"
                className="w-full h-full object-contain pointer-events-none select-none"
              />
            </Button>
          </div>
        </div>

        {/* Content Body */}
        {isLoading ? (
          // Loading Skeleton Grid
          <div className="grid grid-cols-5 max-[1440px]:grid-cols-4 max-[1024px]:grid-cols-3 max-[640px]:grid-cols-2 max-[480px]:grid-cols-1 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="bg-[#131926] border border-white/5 rounded-[14px] p-3 animate-pulse space-y-3"
              >
                <div className="aspect-[16/10] bg-white/5 rounded-[10px]" />
                <div className="h-4 bg-white/10 rounded-sm w-3/4" />
                <div className="h-3 bg-white/5 rounded-sm w-full" />
                <div className="h-3 bg-white/5 rounded-sm w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          // Error State
          <div className="w-full bg-[#131926] border border-red-500/20 rounded-[14px] p-8 text-center space-y-3">
            <p className="text-red-400 text-fs14 font-medium">{error}</p>
            {onRetry && (
              <Button
                variant="primary"
                size="sm"
                type="button"
                onClick={onRetry}
                className="px-4 py-1.5 font-semibold text-fs13 rounded-[6px] cursor-pointer"
              >
                Retry
              </Button>
            )}
          </div>
        ) : movies.length === 0 ? (
          // Empty State
          <div className="w-full bg-[#131926] border border-white/5 rounded-[14px] p-8 text-center text-[#8E8E8E] text-fs14">
            No content available in this section.
          </div>
        ) : (
          // Swiper Carousel
          <Swiper
            spaceBetween={16}
            slidesPerView={5}
            onSwiper={(swiper) => {
              setSwiperInstance(swiper);
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            breakpoints={{
              320: {
                slidesPerView: 1.2,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 14,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
              1440: {
                slidesPerView: 5,
                spaceBetween: 18,
              },
            }}
            className="w-full pt-2 pb-10 px-4 -mx-4"
          >
            {movies.map((movie, index) => (
              <SwiperSlide
                key={movie.id}
                className="!h-auto flex pt-2 px-2 pb-8 hover:z-30 transition-all"
              >
                <MovieCard
                  movie={movie}
                  isFeatured={
                    index === featuredIndex ||
                    (featuredIndex === -1 ? false : index % 3 === 0)
                  }
                  onOfferClick={onOfferClick}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default MovieCarouselSection;
