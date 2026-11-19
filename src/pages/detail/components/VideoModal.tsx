import { useState } from "react";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";

import Playbutton_Icon from "../../../assets/images/DetailPage/PopupVideo/Playbutton_Icon.png";
import Close_Icon from "../../../assets/images/DetailPage/PopupVideo/Close_Icon.png";
import Default_Img from "../../../assets/images/Home/LatestContent/Default_Img.png";

export interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  previewImage?: string;
  videoKey?: string;
}

const VideoModal = ({
  isOpen,
  onClose,
  title = "Movie Trailer",
  previewImage,
  videoKey = "8mrVmf239GU",
}: VideoModalProps) => {
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [isPlaying, setIsPlaying] = useState(false);

  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setIsPlaying(false);
    }
  }

  if (!isOpen) return null;

  const handleClose = () => {
    setIsPlaying(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none font-century animate-fadeIn">
      <div
        className="fixed inset-0 -z-10"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-4xl max-[1024px]:max-w-2xl bg-[#0D131F] border border-white/20 rounded-[18px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col">
        <Button
          variant="unstyled"
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition cursor-pointer"
          title="Close"
        >
          <Image
            src={Close_Icon}
            alt="Close"
            className="w-5 h-5 object-contain pointer-events-none"
          />
        </Button>

        <div className="relative w-full aspect-[16/9] bg-black flex items-center justify-center overflow-hidden">
          {isPlaying ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
              title={`${title} Official Trailer`}
              className="w-full h-full border-0 rounded-[14px]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <Image
                src={previewImage || Default_Img}
                alt={title}
                fallbackSrc={Default_Img}
                className="w-full h-full object-cover"
              />

              <Button
                variant="unstyled"
                type="button"
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 m-auto w-20 h-20 max-[640px]:w-14 max-[640px]:h-14 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                title="Play Trailer"
              >
                <Image
                  src={Playbutton_Icon}
                  alt="Play"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
