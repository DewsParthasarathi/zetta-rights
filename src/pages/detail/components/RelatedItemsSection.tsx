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

export interface RelatedItemsSectionProps {
  movies: TMDBMovie[];
  isLoading?: boolean;
  onOfferClick?: (movie: TMDBMovie) => void;
  className?: string;
}

const RelatedItemsSection = ({
  movies,
  isLoading = false,
  onOfferClick,
  className = "",
}: RelatedItemsSectionProps) => {
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

  return (
    <section
      className={`w-full py-8 font-century select-none text-white ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-fs22 max-[1440px]:text-fs20 max-[1024px]:text-fs18 font-bold text-white tracking-tight">
          Related Item
        </h3>

        <div className="flex items-center gap-2">
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

      {isLoading ? (
        <div className="grid grid-cols-5 max-[1440px]:grid-cols-4 max-[1024px]:grid-cols-3 max-[640px]:grid-cols-2 max-[480px]:grid-cols-1 gap-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="bg-[#18202F]/60 rounded-[10px] p-2 border border-white/5 animate-pulse flex flex-col gap-3 min-h-[350px]"
            >
              <div className="w-full aspect-[16/10] bg-white/10 rounded-[6px]" />
              <div className="w-3/4 h-5 bg-white/10 rounded mt-2" />
              <div className="w-full h-12 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="w-full bg-[#18202F]/40 border border-white/5 rounded-[12px] p-8 text-center text-gray-400 text-fs14">
          No related items found.
        </div>
      ) : (
        <Swiper
          spaceBetween={16}
          slidesPerView={5}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
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
          className="w-full pt-2 pb-8 px-4 -mx-4"
        >
          {movies.map((movie, index) => (
            <SwiperSlide
              key={movie.id}
              className="!h-auto flex pt-2 px-2 pb-6 hover:z-30 transition-all"
            >
              <MovieCard
                movie={movie}
                isFeatured={index === 2}
                onOfferClick={onOfferClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default RelatedItemsSection;
