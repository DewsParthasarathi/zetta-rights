import { useState } from "react";
import type { TMDBMovieDetail } from "../../../services/tmdbService";
import { getImageUrl } from "../../../services/tmdbService";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";

import newImg from "../../../assets/images/DetailPage/newImg.png";
import Kantara_Img2 from "../../../assets/images/DetailPage/Kantara_Img2.webp";
import Kantara_Img3 from "../../../assets/images/DetailPage/Kantara_Img3.webp";
import Plybutton_Icon from "../../../assets/images/DetailPage/Plybutton_Icon.png";
import Playbutton_Icon from "../../../assets/images/DetailPage/PopupVideo/Playbutton_Icon.png";
import Default_Img from "../../../assets/images/Home/LatestContent/Default_Img.png";

export interface MediaGalleryProps {
  movie: TMDBMovieDetail;
  backdrops?: string[];
  posters?: string[];
  onOpenVideo: (previewSrc?: string) => void;
  className?: string;
}

interface MediaItem {
  type: "image" | "video";
  src: string;
  label: string;
}

const MediaGallery = ({
  movie,
  backdrops = [],
  posters = [],
  onOpenVideo,
  className = "",
}: MediaGalleryProps) => {
  const isKantara =
    movie.id === 102 ||
    movie.id === 858485 ||
    movie.title.toLowerCase().includes("kantara");

  const movieBackdrop =
    getImageUrl(movie.backdrop_path || movie.poster_path, "original") ||
    Default_Img;
  const moviePoster =
    getImageUrl(movie.poster_path || movie.backdrop_path, "original") ||
    Default_Img;

  const mediaItems: MediaItem[] = isKantara
    ? [
        { type: "image", src: newImg, label: "Main Artwork" },
        { type: "video", src: Kantara_Img2, label: "Official Teaser" },
        { type: "video", src: Kantara_Img3, label: "Official Trailer" },
      ]
    : [
        {
          type: "image",
          src:
            (backdrops[0] && getImageUrl(backdrops[0], "original")) ||
            movieBackdrop ||
            moviePoster,
          label: "Movie Artwork",
        },
        {
          type: "video",
          src:
            (backdrops[1] && getImageUrl(backdrops[1], "original")) ||
            (posters[0] && getImageUrl(posters[0], "original")) ||
            moviePoster ||
            movieBackdrop,
          label: "Official Teaser",
        },
        {
          type: "video",
          src:
            (backdrops[2] && getImageUrl(backdrops[2], "original")) ||
            (backdrops[0] && getImageUrl(backdrops[0], "original")) ||
            movieBackdrop ||
            moviePoster,
          label: "Official Trailer",
        },
      ];

  const [prevMovieId, setPrevMovieId] = useState(movie.id);
  const [activeIndex, setActiveIndex] = useState(0);

  if (prevMovieId !== movie.id) {
    setPrevMovieId(movie.id);
    setActiveIndex(0);
  }

  const activeMedia = mediaItems[activeIndex] || mediaItems[0];

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleOpenActiveVideo = () => {
    if (activeMedia.type === "video") {
      onOpenVideo(activeMedia.src);
    }
  };

  return (
    <div
      className={`w-full flex items-stretch gap-4 max-[640px]:flex-col select-none ${className}`}
    >
      <div className="flex flex-col justify-between gap-3 w-[26%] max-[1440px]:w-[28%] max-[1024px]:w-[24%] max-[640px]:w-full max-[640px]:flex-row shrink-0">
        {mediaItems.map((item, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <Button
              key={idx}
              variant="unstyled"
              type="button"
              onClick={() => handleThumbnailClick(idx)}
              className={`relative flex-1 min-h-0 w-full max-[640px]:aspect-[4/3] rounded-[10px] overflow-hidden bg-black/60 border-2 transition-all duration-200 cursor-pointer group flex items-center justify-center ${
                isSelected
                  ? "border-[#FABE2C] shadow-[0_0_15px_rgba(250,190,44,0.4)] scale-[1.02]"
                  : "border-white/10 lg:hover:border-white/40 opacity-75 lg:hover:opacity-100"
              }`}
            >
              <Image
                src={item.src}
                alt={item.label}
                fallbackSrc={Default_Img}
                className="w-full h-full object-cover transition-transform duration-300 lg:group-hover:scale-105 pointer-events-none"
              />

              {item.type === "video" && (
                <div className="absolute inset-0 m-auto w-7 h-7 bg-black/50 backdrop-blur-[2px] rounded-full flex items-center justify-center pointer-events-none shadow-md">
                  <Image
                    src={Plybutton_Icon}
                    alt="Play"
                    className="w-3.5 h-3.5 object-contain"
                  />
                </div>
              )}
            </Button>
          );
        })}
      </div>

      <div
        className={`flex-1 relative rounded-[14px] overflow-hidden bg-black/80 aspect-[1/1] max-[1024px]:aspect-[16/10] border border-white/10 shadow-2xl group flex items-center justify-center ${
          activeMedia.type === "video" ? "cursor-pointer" : ""
        }`}
        onClick={activeMedia.type === "video" ? handleOpenActiveVideo : undefined}
      >
        <Image
          src={activeMedia.src}
          alt={movie.title}
          fallbackSrc={Default_Img}
          className="w-full h-full object-cover transition-transform duration-500 lg:group-hover:scale-[1.02]"
        />

        {activeMedia.type === "video" && (
          <Button
            variant="unstyled"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenActiveVideo();
            }}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110 shadow-2xl"
            title="Watch Trailer"
          >
            <Image
              src={Playbutton_Icon}
              alt="Play Video"
              className="w-10 h-10 object-contain pointer-events-none"
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;
