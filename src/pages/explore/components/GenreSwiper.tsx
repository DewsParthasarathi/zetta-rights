import { useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";

// Import Swiper styles
import "swiper/css";

// Genre Icons
import actionIcon from "../../../assets/images/Explore/action.png";
import adventureIcon from "../../../assets/images/Explore/adventure_Icon.png";
import dramaIcon from "../../../assets/images/Explore/drama.png";
import comedyIcon from "../../../assets/images/Explore/comedy.png";
import thrillerIcon from "../../../assets/images/Explore/thriller_Icon.png";
import horrorIcon from "../../../assets/images/Explore/horrer_Icon.png";
import romanceIcon from "../../../assets/images/Explore/romence_Icon.png";
import musicalIcon from "../../../assets/images/Explore/musical_Icon.png";
import scifiIcon from "../../../assets/images/Explore/scifi.png";
import shortIcon from "../../../assets/images/Explore/short_Icon.png";

// Arrow Icons
import backarrowIcon from "../../../assets/images/Explore/backarrow_Icon.png";
import nextarrowIcon from "../../../assets/images/Explore/nextarrow_Icon.png";

export interface GenreOption {
  id: number | null;
  label: string;
  icon: string;
}

const GENRE_LIST: GenreOption[] = [
  { id: 28, label: "Action", icon: actionIcon },
  { id: 12, label: "Adventure", icon: adventureIcon },
  { id: 18, label: "Drama", icon: dramaIcon },
  { id: 35, label: "Comedy", icon: comedyIcon },
  { id: 53, label: "Thriller", icon: thrillerIcon },
  { id: 27, label: "Horrer", icon: horrorIcon },
  { id: 10749, label: "Romance", icon: romanceIcon },
  { id: 10402, label: "Musical", icon: musicalIcon },
  { id: -1, label: "Short...", icon: shortIcon },
  { id: 878, label: "Sci-Fi", icon: scifiIcon },
  { id: 16, label: "Animation", icon: comedyIcon },
  { id: 14, label: "Fantasy", icon: adventureIcon },
  { id: 9648, label: "Mystery", icon: thrillerIcon },
  { id: 80, label: "Crime", icon: actionIcon },
  { id: 99, label: "Documentary", icon: shortIcon },
  { id: 10751, label: "Family", icon: comedyIcon },
  { id: 36, label: "History", icon: dramaIcon },
  { id: 10752, label: "War", icon: actionIcon },
  { id: 37, label: "Western", icon: adventureIcon },
];

export interface GenreSwiperProps {
  selectedGenreId?: number | null;
  selectedGenreIds?: number[];
  onSelectGenre: (genreId: number | null) => void;
  className?: string;
}

const GenreSwiper = ({
  selectedGenreId,
  selectedGenreIds,
  onSelectGenre,
  className = "",
}: GenreSwiperProps) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Combine single and multiple selected genre IDs
  const activeIds = selectedGenreIds ?? (
    selectedGenreId !== null && selectedGenreId !== undefined ? [selectedGenreId] : []
  );

  const updateNav = useCallback((swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

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
    <div
      className={`relative flex items-center gap-3 w-full select-none ${className}`}
    >
      {/* Left Navigation Arrow */}
      <Button
        variant="unstyled"
        type="button"
        onClick={handlePrev}
        disabled={isBeginning}
        className="shrink-0 p-2 flex items-center justify-center transition cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-100 hover:bg-white/10 rounded-[6px] opacity-75"
        title="Previous genres"
      >
        <Image
          src={backarrowIcon}
          alt="Prev"
          className="w-3 h-3.5 object-contain"
        />
      </Button>

      {/* Swiper Slider */}
      <div className="flex-1 overflow-hidden min-w-0">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateNav(swiper);
          }}
          onSlideChange={updateNav}
          onProgress={updateNav}
          onReachBeginning={updateNav}
          onReachEnd={updateNav}
          onFromEdge={updateNav}
          onResize={updateNav}
          slidesPerView="auto"
          spaceBetween={14}
          grabCursor
          observer
          observeParents
          watchSlidesProgress
          speed={400}
          className="w-full flex items-center"
        >
          {GENRE_LIST.map((genre) => {
            const isSelected = genre.id !== null && activeIds.includes(genre.id);
            return (
              <SwiperSlide key={genre.label} className="!w-auto">
                <Button
                  variant="unstyled"
                  type="button"
                  onClick={() => onSelectGenre(genre.id)}
                  className={`inline-flex items-center justify-center gap-2.5 px-6 py-2.5 max-[1600px]:px-5 max-[1440px]:px-4.5 max-[1440px]:py-2 min-w-[130px] max-[1600px]:min-w-[120px] max-[1440px]:min-w-[110px] rounded-[8px] text-fs16 max-[1600px]:text-fs15 max-[1440px]:text-fs14 font-medium transition cursor-pointer border ${
                    isSelected
                      ? "bg-[#141D2B] border-[#FABE2C] text-[#FABE2C] shadow-[0_0_14px_rgba(250,190,44,0.22)]"
                      : "bg-[#141D2B] border-white/10 text-white/90 hover:border-white/30 hover:text-white hover:bg-[#1A2536]"
                  }`}
                >
                  <Image
                    src={genre.icon}
                    alt={genre.label}
                    className="w-5 h-5 max-[1440px]:w-4.5 max-[1440px]:h-4.5 object-contain shrink-0"
                  />
                  <span className="whitespace-nowrap">{genre.label}</span>
                </Button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Right Navigation Arrow */}
      <Button
        variant="unstyled"
        type="button"
        onClick={handleNext}
        disabled={isEnd}
        className="shrink-0 p-2 flex items-center justify-center transition cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-100 hover:bg-white/10 rounded-[6px] opacity-75"
        title="Next genres"
      >
        <Image
          src={nextarrowIcon}
          alt="Next"
          className="w-3 h-3.5 object-contain"
        />
      </Button>
    </div>
  );
};

export default GenreSwiper;
