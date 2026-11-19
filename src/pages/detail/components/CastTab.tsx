import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { TMDBCastMember } from "../../../services/tmdbService";
import { getImageUrl } from "../../../services/tmdbService";
import Image from "../../../components/common/Image";
import profileDefault from "../../../assets/images/DetailPage/profileDefault.png";

import "swiper/css";

export interface CastTabProps {
  cast: TMDBCastMember[];
}

const CastTab = ({ cast }: CastTabProps) => {
  const items = useMemo(() => {
    if (!cast || cast.length === 0) return [];
    let repeated = [...cast];
    while (repeated.length < 15) {
      repeated = [...repeated, ...cast];
    }
    return repeated;
  }, [cast]);

  if (!cast || cast.length === 0) {
    return (
      <div className="py-6 text-center text-gray-400 text-fs14">
        No cast details available.
      </div>
    );
  }

  return (
    <div className="w-full select-none overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={5}
        spaceBetween={16}
        loop={true}
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 2.2,
            spaceBetween: 8,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3.5,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 14,
          },
          1024: {
            slidesPerView: 4.5,
            spaceBetween: 14,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
        }}
        className="w-full py-2 swiper-smooth-marquee [&_.swiper-wrapper]:!ease-linear"
      >
        {items.map((member, idx) => {
          const photoUrl = member.profile_path
            ? getImageUrl(member.profile_path, "w500")
            : profileDefault;

          return (
            <SwiperSlide key={`${member.id}-${idx}`} className="!h-auto">
              <div className="flex flex-col items-center text-center w-full px-1 py-1 cursor-grab active:cursor-grabbing">
                <div className="w-14 h-14 max-[1440px]:w-12 max-[1440px]:h-12 rounded-full overflow-hidden border border-white/25 shadow-md bg-white/5 flex items-center justify-center mb-2 transition-transform duration-200 hover:scale-105 shrink-0">
                  <Image
                    src={photoUrl}
                    alt={member.name}
                    fallbackSrc={profileDefault}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>

                <h4
                  className="text-fs15 max-[1440px]:text-fs12 font-bold text-white tracking-tight truncate w-full"
                  title={member.name}
                >
                  {member.name}
                </h4>

                <p
                  className="text-fs13 max-[1440px]:text-fs10 text-gray-400 font-normal truncate w-full mt-0.5"
                  title={member.character}
                >
                  {member.character}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CastTab;
