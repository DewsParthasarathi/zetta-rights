import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import type { Swiper as SwiperCore } from "swiper";
import Image from "../../../components/common/Image";

import "swiper/css";
import "swiper/css/effect-cards";

import Maaveeran_Poster from "../../../assets/images/Home/Header/Maaveeran_Poster.jpg";
import Jailerbanner_Image from "../../../assets/images/Home/Header/Jailerbanner_Image.jpg";
import Vikram_Poster from "../../../assets/images/Home/Header/Vikram_Poster.jpg";
import PS2_Poster from "../../../assets/images/Home/Header/PS2_Poster.jpg";
import Vaathi_Poster from "../../../assets/images/Home/Header/Vaathi_Poster.jpg";
import Maanaadu_Poster from "../../../assets/images/Home/Header/Maanaadu_Poster.jpg";
import Varisu_Poster from "../../../assets/images/Home/Header/Varisu_Poster.jpg";
import PathuThala_Poster from "../../../assets/images/Home/Header/PathuThala_Poster.jpg";

import SubmittedContent_Icon from "../../../assets/images/Home/Header/SubmittedContent_Icon.png";
import availablecontent_Icon from "../../../assets/images/Home/Header/availablecontent_Icon.png";
import SoldContent_Icon from "../../../assets/images/Home/Header/SoldContent_Icon.png";

const TAMIL_BANNER_MOVIES = [
  {
    id: 102,
    title: "Maaveeran",
    year: "2023",
    genre: "Action / Fantasy",
    image: Maaveeran_Poster,
    tag: "Super Hit",
  },
  {
    id: 101,
    title: "Jailer",
    year: "2023",
    genre: "Action / Drama",
    image: Jailerbanner_Image,
    tag: "Blockbuster",
  },
  {
    id: 103,
    title: "Vikram",
    year: "2022",
    genre: "Action / Thriller",
    image: Vikram_Poster,
    tag: "Mega Hit",
  },
  {
    id: 104,
    title: "Ponniyin Selvan: II",
    year: "2023",
    genre: "Historical / Epic",
    image: PS2_Poster,
    tag: "National Hit",
  },
  {
    id: 105,
    title: "Vaathi",
    year: "2023",
    genre: "Action / Drama",
    image: Vaathi_Poster,
    tag: "Super Hit",
  },
  {
    id: 106,
    title: "Maanaadu",
    year: "2021",
    genre: "Sci-Fi / Thriller",
    image: Maanaadu_Poster,
    tag: "Cult Classic",
  },
  {
    id: 107,
    title: "Varisu",
    year: "2023",
    genre: "Action / Family",
    image: Varisu_Poster,
    tag: "Blockbuster",
  },
  {
    id: 113,
    title: "Pathu Thala",
    year: "2023",
    genre: "Action / Crime",
    image: PathuThala_Poster,
    tag: "Action Hit",
  },
];

const AnimatedStatCount = ({
  value,
  duration = 1800,
  trigger = 0,
}: {
  value: number;
  duration?: number;
  trigger?: number;
}) => {
  const prefix = value >= 100 ? Math.floor(value / 100) : null;
  const targetDigits = value % 100;
  const [displayDigits, setDisplayDigits] = useState<string>("00");

  useEffect(() => {
    if (trigger === 0) return;
    let animationFrameId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
        setDisplayDigits("00");
      }
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = Math.sin((progress * Math.PI) / 2);
      const current = Math.min(Math.round(ease * targetDigits), targetDigits);
      setDisplayDigits(String(current).padStart(2, "0"));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayDigits(String(targetDigits).padStart(2, "0"));
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetDigits, duration, trigger]);

  return (
    <span className="tabular-nums inline-flex items-baseline justify-center">
      {prefix !== null && <span>{prefix}</span>}
      <span>{displayDigits}</span>
    </span>
  );
};

const BannerSection = () => {
  const statsContainerRef = useRef<HTMLDivElement | null>(null);
  const [animationTrigger, setAnimationTrigger] = useState<number>(0);

  useEffect(() => {
    const node = statsContainerRef.current;
    if (!node) return;

    let wasIntersecting = false;

    if (typeof IntersectionObserver === "undefined") {
      const timer = setTimeout(() => {
        setAnimationTrigger(1);
      }, 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!wasIntersecting) {
              wasIntersecting = true;
              setAnimationTrigger((prev) => prev + 1);
            }
          } else {
            wasIntersecting = false;
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);
  const updateSlideVisibility = (swiperInstance: SwiperCore) => {
    if (!swiperInstance || !swiperInstance.slides) return;
    const slides = swiperInstance.slides;
    for (let i = 0; i < slides.length; i++) {
      const slideEl = slides[i] as HTMLElement & { progress?: number };
      if (!slideEl) continue;
      const progress = slideEl.progress ?? 0;

      if (progress >= -0.25 && progress <= 1.25) {
        if (progress > 0.25) {
          slideEl.style.opacity = "0.92";
          slideEl.style.visibility = "visible";
          slideEl.style.pointerEvents = "auto";
        } else if (progress < -0.05) {
          const fade = Math.max(0, 1 + progress * 2.5);
          slideEl.style.opacity = String(fade);
          slideEl.style.visibility = fade > 0.05 ? "visible" : "hidden";
          slideEl.style.pointerEvents = fade > 0.4 ? "auto" : "none";
        } else {
          slideEl.style.opacity = "1";
          slideEl.style.visibility = "visible";
          slideEl.style.pointerEvents = "auto";
        }
      } else {
        slideEl.style.opacity = "0";
        slideEl.style.visibility = "hidden";
        slideEl.style.pointerEvents = "none";
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const swiperContainer = document.querySelector(".banner-swiper") as
        | (HTMLElement & { swiper?: SwiperCore })
        | null;
      if (swiperContainer?.swiper) {
        updateSlideVisibility(swiperContainer.swiper);
      }
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="banner-section-bg relative w-full h-screen min-h-[85vh] max-[1024px]:min-h-screen flex items-center justify-center overflow-hidden bg-[#111826] text-white font-century select-none">
      <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[38vw] aspect-square bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="w-[83%] max-[1024px]:w-[96%] max-[768px]:w-[98%] max-[480px]:w-full min-h-[75vh] max-[1440px]:min-h-[70vh] max-[1024px]:min-h-0 max-[1024px]:h-auto flex items-center justify-center mx-auto px-6 max-[1024px]:px-4 max-[768px]:px-3 max-[480px]:px-2.5 py-8 max-[1024px]:py-6">
        <div className="flex max-[1024px]:flex-col items-center justify-between gap-12 max-[1600px]:gap-8 max-[1440px]:gap-6 max-[1024px]:gap-10 w-full">
          <div className="w-[44%] max-[1440px]:w-[42%] max-[1280px]:w-[40%] max-[1024px]:w-full flex flex-col items-start z-10 max-[1024px]:items-center max-[1024px]:text-center shrink-0">
            <h1 className="text-fs58 max-[1024px]:text-[34px] max-[640px]:text-[28px] font-bold text-white tracking-tight leading-[1.12]">
              Buy and Sell
              <br />
              Movies,
            </h1>

            <div
              className="banner-stroke-text text-fs58 max-[1024px]:text-[34px] max-[640px]:text-[28px] font-bold leading-[1.12] text-transparent select-none mt-1"
              style={{
                WebkitTextStroke:
                  "1.2px var(--movie-stroke-color, rgba(255, 255, 255, 0.75))",
              }}
            >
              Movie Collection
            </div>

            <p className="text-[#8E8E8E] text-fs17 max-[1600px]:text-fs16 max-[1440px]:text-[14px] max-[1366px]:text-[12px] max-[1024px]:text-[12px] max-[640px]:text-[12px] font-normal max-w-lg leading-relaxed mt-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <Link
              to="/explore"
              className="banner-explore-btn mt-8 max-[1024px]:mt-6 max-[640px]:mt-5 px-8 max-[1440px]:px-7 max-[1024px]:px-6 max-[640px]:px-5 py-2.5 max-[1440px]:py-2 max-[640px]:py-1.5 bg-white hover:bg-gray-100 text-[#0F172A] font-extrabold text-fs18 max-[1440px]:text-[16px] max-[1024px]:text-[14px] max-[640px]:text-[12px] rounded-[8px] max-[640px]:rounded-[6px] shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center justify-center select-none"
            >
              Explore
            </Link>
          </div>

          <div className="w-[54%] max-[1440px]:w-[56%] max-[1280px]:w-[58%] max-[1024px]:w-full relative flex items-center justify-end max-[1024px]:justify-center max-[640px]:gap-3 z-10">
            <div className="relative flex items-center justify-center select-none flex-1 max-w-[460px] max-[1600px]:max-w-[420px] max-[1440px]:max-w-[380px] max-[1024px]:max-w-[330px] max-[640px]:max-w-[260px] py-4">
              <Swiper
                effect="cards"
                grabCursor={true}
                initialSlide={1}
                preventClicks={false}
                preventClicksPropagation={false}
                touchStartPreventDefault={false}
                simulateTouch={true}
                threshold={5}
                modules={[EffectCards, Autoplay]}
                cardsEffect={{
                  perSlideOffset: 35,
                  perSlideRotate: 8,
                  rotate: true,
                  slideShadows: false,
                }}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
                onSwiper={(swiper) => updateSlideVisibility(swiper)}
                onInit={(swiper) => updateSlideVisibility(swiper)}
                onSetTranslate={(swiper) => updateSlideVisibility(swiper)}
                onProgress={(swiper) => updateSlideVisibility(swiper)}
                onSlideChange={(swiper) => updateSlideVisibility(swiper)}
                onTransitionEnd={(swiper) => updateSlideVisibility(swiper)}
                onSetTransition={(swiper, duration) => {
                  if (!swiper || !swiper.slides) return;
                  swiper.slides.forEach((slideEl: HTMLElement) => {
                    slideEl.style.transitionDuration = `${duration}ms`;
                  });
                }}
                className="banner-swiper swiper-cards w-[315px] h-[450px] max-[1600px]:w-[290px] max-[1600px]:h-[415px] max-[1440px]:w-[265px] max-[1440px]:h-[380px] max-[1280px]:w-[245px] max-[1280px]:h-[350px] max-[1024px]:w-[220px] max-[1024px]:h-[315px] max-[640px]:w-[175px] max-[640px]:h-[250px] max-[400px]:w-[145px] max-[400px]:h-[210px]"
              >
                {TAMIL_BANNER_MOVIES.map((movie) => (
                  <SwiperSlide
                    key={movie.id}
                    className="rounded-[10px] max-[640px]:rounded-[8px] overflow-hidden"
                  >
                    <div className="banner-slide-frame w-full h-full p-3.5 max-[640px]:p-2 bg-white/20 backdrop-blur-md rounded-[10px]! shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/30">
                      <div className="relative w-full h-full overflow-hidden bg-black/80 ">
                        <Image
                          src={movie.image}
                          alt={movie.title}
                          fallbackSrc={Jailerbanner_Image}
                          className="w-full h-full object-cover pointer-events-none select-none"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div
              ref={statsContainerRef}
              className="flex flex-col gap-4 max-[1600px]:gap-3.5 max-[1440px]:gap-3 max-[640px]:gap-2.5 select-none z-10 w-[100px] max-[1600px]:w-[132px] max-[1440px]:w-[98px] max-[1024px]:w-[98px] max-[640px]:w-[94px] max-[400px]:w-[84px] shrink-0"
            >
              <div className="banner-stats-white relative overflow-hidden w-full aspect-[17/15] bg-white rounded-[3px] p-2 max-[640px]:p-1.5 flex flex-col items-center justify-center text-center shadow-md shrink-0 select-none">
                <Image
                  src={SubmittedContent_Icon}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 m-auto w-[62%] h-[62%] object-contain opacity-25 pointer-events-none select-none"
                />
                <div className="relative z-10 font-['SFPro'] text-[35px] max-[1600px]:text-[30px] max-[1440px]:text-[28px] max-[1024px]:text-[24px] max-[640px]:text-[20px] max-[400px]:text-[18px] font-bold text-[#31404F] leading-none">
                  <AnimatedStatCount value={234} trigger={animationTrigger} />
                </div>
                <div className="relative z-10 font-['SFPro'] text-[#31404F] text-[13px] max-[1600px]:text-[12px] max-[1440px]:text-[11px] max-[1024px]:text-[10px] max-[640px]:text-[9px] max-[400px]:text-[8px] font-bold leading-[1.15] mt-1.5 max-[1440px]:mt-1 max-[640px]:mt-0.5">
                  Submitted
                  <br />
                  Content
                </div>
              </div>

              <div className="banner-stats-green relative overflow-hidden w-full aspect-[17/15] bg-[#2EA753] rounded-[3px] p-2 max-[640px]:p-1.5 flex flex-col items-center justify-center text-center shadow-md shrink-0 select-none">
                <Image
                  src={availablecontent_Icon}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 m-auto w-[62%] h-[62%] object-contain opacity-25 pointer-events-none select-none"
                />
                <div className="relative z-10 font-['SFPro'] text-[38px] max-[1600px]:text-[34px] max-[1440px]:text-[30px] max-[1024px]:text-[28px] max-[640px]:text-[24px] max-[400px]:text-[21px] font-bold text-white leading-none">
                  <AnimatedStatCount value={174} trigger={animationTrigger} />
                </div>
                <div className="relative z-10 font-['SFPro'] text-white text-[13px] max-[1600px]:text-[12px] max-[1440px]:text-[11px] max-[1024px]:text-[10px] max-[640px]:text-[9px] max-[400px]:text-[8px] font-bold leading-[1.15] mt-1.5 max-[1440px]:mt-1 max-[640px]:mt-0.5">
                  Available
                  <br />
                  Content
                </div>
              </div>

              <div className="banner-stats-yellow relative overflow-hidden w-full aspect-[17/15] bg-[#FCC93D] rounded-[3px] p-2 max-[640px]:p-1.5 flex flex-col items-center justify-center text-center shadow-md shrink-0 select-none">
                <Image
                  src={SoldContent_Icon}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 m-auto w-[62%] h-[62%] object-contain opacity-25 pointer-events-none select-none"
                />
                <div className="relative z-10 font-['SFPro'] text-[38px] max-[1600px]:text-[34px] max-[1440px]:text-[30px] max-[1024px]:text-[28px] max-[640px]:text-[24px] max-[400px]:text-[21px] font-bold text-[#31404F] leading-none">
                  <AnimatedStatCount value={60} trigger={animationTrigger} />
                </div>
                <div className="relative z-10 font-['SFPro'] text-[#31404F] text-[13px] max-[1600px]:text-[12px] max-[1440px]:text-[11px] max-[1024px]:text-[10px] max-[640px]:text-[9px] max-[400px]:text-[8px] font-bold leading-[1.15] mt-1.5 max-[1440px]:mt-1 max-[640px]:mt-0.5">
                  Sold
                  <br />
                  Content
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
