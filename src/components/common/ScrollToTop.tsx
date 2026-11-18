import { useState, useEffect } from "react";
import Image from "./Image";
import Button from "./Button";
import gotoTop from "../../assets/images/Home/Header/gotoTop.png";

const ScrollToTop = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (totalScroll > 0) {
        const progress = Math.min(
          100,
          Math.max(0, (scrollY / totalScroll) * 100),
        );
        setScrollProgress(progress);
        setIsVisible(scrollY > 80);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed right-8 bottom-8 max-[640px]:right-4 max-[640px]:bottom-4 z-50 transition-all duration-300 ${
        isVisible
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-75 pointer-events-none"
      }`}
    >
      <Button
        variant="unstyled"
        type="button"
        onClick={scrollToTop}
        title="Scroll to Top"
        className="group relative w-12 h-12 max-[640px]:w-10 max-[640px]:h-10 rounded-full flex items-center justify-center cursor-pointer select-none transition-transform duration-200 hover:scale-110 active:scale-95 shadow-2xl focus:outline-none shrink-0"
      >
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="#0B0F17"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="2.5"
            className="transition-colors group-hover:stroke-white/25"
          />

          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="#FABE2C"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
        </svg>

        <div className="relative z-10 flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-0.5 pointer-events-none">
          <Image
            src={gotoTop}
            alt="Scroll to top"
            className="w-3.5 h-3.5 max-[640px]:w-3 max-[640px]:h-3 object-contain"
          />
        </div>
      </Button>
    </div>
  );
};

export default ScrollToTop;
