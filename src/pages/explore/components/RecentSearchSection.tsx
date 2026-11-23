import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import type { TMDBMovie } from "../../../services/tmdbService";
import MovieCard from "../../home/components/MovieCard";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";

import "swiper/css";

import Leftarrow_Icon from "../../../assets/images/Home/LatestContent/Leftarrow_Icon.png";
import RightArrow_Icon from "../../../assets/images/Home/LatestContent/RightArrow_Icon.png";

export interface RecentSearchSectionProps {
  movies: TMDBMovie[];
  isLoading?: boolean;
  onOfferClick?: (movie: TMDBMovie) => void;
  className?: string;
}

const RecentSearchSection = ({
  movies,
  isLoading = false,
  onOfferClick,
  className = "",
}: RecentSearchSectionProps) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  if (!isLoading && movies.length === 0) {
    return null;
  }

  return (
    <section
      className={`w-full flex flex-col gap-4 font-century select-none ${className}`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-fs22 max-[1440px]:text-[18px] max-[1024px]:text-[16px] max-[768px]:text-[14px] font-bold text-white tracking-tight">
          Recent Search
        </h2>

        <div className="flex items-center gap-2">
          <Button
            variant="unstyled"
            type="button"
            onClick={handlePrev}
            disabled={isBeginning}
            className="carousel-nav-btn w-8 h-8 max-[640px]:w-7 max-[640px]:h-7 flex items-center justify-center transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-85 active:scale-95 shrink-0"
            title="Previous recent search"
          >
            <Image
              src={Leftarrow_Icon}
              alt="Prev"
              className="w-full h-full object-contain pointer-events-none select-none"
            />
          </Button>

          <Button
            variant="unstyled"
            type="button"
            onClick={handleNext}
            disabled={isEnd}
            className="carousel-nav-btn w-8 h-8 max-[640px]:w-7 max-[640px]:h-7 flex items-center justify-center transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-85 active:scale-95 shrink-0"
            title="Next recent search"
          >
            <Image
              src={RightArrow_Icon}
              alt="Next"
              className="w-full h-full object-contain pointer-events-none select-none"
            />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-5 max-[1440px]:grid-cols-4 max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2 max-[640px]:grid-cols-1 gap-5">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-[#18202F]/60 rounded-[10px] p-2 border border-white/5 animate-pulse flex flex-col gap-3 min-h-[360px]"
            >
              <div className="w-full aspect-[16/10] bg-white/10 rounded-[6px]" />
              <div className="w-3/4 h-5 bg-white/10 rounded mt-2" />
              <div className="w-full h-12 bg-white/5 rounded" />
              <div className="w-full h-6 bg-white/5 rounded mt-auto" />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            spaceBetween={18}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 14 },
              900: { slidesPerView: 3.2, spaceBetween: 16 },
              1280: { slidesPerView: 4, spaceBetween: 18 },
              1536: { slidesPerView: 5, spaceBetween: 18 },
            }}
            className="w-full pt-2 pb-8 px-3 -mx-3 -mb-6"
          >
            {movies.map((movie, index) => (
              <SwiperSlide
                key={`recent-${movie.id}-${index}`}
                className="!h-auto flex pt-2 px-2 pb-6 lg:hover:z-30 transition-all"
              >
                <MovieCard
                  movie={movie}
                  isFeatured={index % 3 === 0}
                  onOfferClick={onOfferClick}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
};

export default RecentSearchSection;
