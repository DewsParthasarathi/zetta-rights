import { useState } from "react";
import { toast } from "react-toastify";
import type { TMDBMovie } from "../../../services/tmdbService";
import { getImageUrl, TMDB_GENRES } from "../../../services/tmdbService";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import closeIcon from "../../../assets/images/Explore/close_Icon.png";
import Default_Img from "../../../assets/images/Home/LatestContent/Default_Img.png";

export interface MakeOfferModalProps {
  movie: TMDBMovie | null;
  isOpen: boolean;
  onClose: () => void;
}

const RIGHTS_OPTIONS = [
  "Theatrical Exhibition Rights",
  "Digital / OTT Streaming Rights",
  "Satellite / Television Rights",
  "Music & Audio Rights",
  "Remake & Adaptation Rights",
  "All-Inclusive Rights Package",
].map((r) => ({ label: r, value: r }));

const TERRITORIES = [
  "Worldwide",
  "India (All Territories)",
  "Tamil Nadu & Pondicherry",
  "North America (USA & Canada)",
  "United Kingdom & Europe",
  "Southeast Asia & Middle East",
].map((t) => ({ label: t, value: t }));

const DURATIONS = [
  "1 Year License",
  "3 Years License",
  "5 Years License",
  "10 Years License",
  "Perpetual / Full Buyout",
].map((d) => ({ label: d, value: d }));

const MakeOfferModal = ({ movie, isOpen, onClose }: MakeOfferModalProps) => {
  const [rightsType, setRightsType] = useState(RIGHTS_OPTIONS[0].value);
  const [territory, setTerritory] = useState(TERRITORIES[0].value);
  const [duration, setDuration] = useState(DURATIONS[1].value);
  const [offerPrice, setOfferPrice] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !movie) return null;

  const posterUrl =
    getImageUrl(movie.backdrop_path || movie.poster_path, "w500") ||
    Default_Img;

  const genreNames = (movie.genre_ids || [])
    .slice(0, 3)
    .map((gid) => TMDB_GENRES[gid] || "Movie");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerPrice || Number(offerPrice) <= 0) {
      toast.error("Please specify a valid offer amount.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        `Your offer of $${Number(offerPrice).toLocaleString()} for "${movie.title}" has been successfully submitted!`,
      );
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none font-century animate-fadeIn">
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl bg-[#18202F] border border-white/20 rounded-[16px] p-6 max-[640px]:p-4 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-[#FABE2C] text-fs20 font-bold">🎬</span>
            <h3 className="text-fs20 max-[640px]:text-fs18 font-bold text-white tracking-tight">
              Make an Offer
            </h3>
          </div>
          <Button
            variant="ghost"
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition cursor-pointer"
            title="Close modal"
          >
            <Image src={closeIcon} alt="Close" className="w-3.5 h-3.5 object-contain" />
          </Button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 overflow-y-auto custom-scrollbar py-4"
        >
          <div className="flex items-center gap-4 bg-black/30 border border-white/10 rounded-[10px] p-3">
            <div className="w-20 aspect-[16/10] rounded-[6px] overflow-hidden bg-black/50 shrink-0">
              <Image
                src={posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <h4 className="text-fs16 font-bold text-white truncate">
                {movie.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-fs12 text-gray-400">
                  {movie.release_date?.slice(0, 4) || "2024"}
                </span>
                <span className="text-gray-600">•</span>
                <div className="flex items-center gap-1">
                  {genreNames.map((g, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded text-fs10 border border-white/10 text-gray-300"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-fs13 font-semibold text-gray-200">
              Licensing Rights Category *
            </label>
            <Select
              options={RIGHTS_OPTIONS}
              value={rightsType}
              onChange={(e) => setRightsType(e.target.value)}
              className="w-full bg-[#111826] border border-white/15 rounded-[8px] px-3.5 py-2.5 text-fs14 text-white focus:outline-none focus:border-[#FABE2C] transition cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 max-[640px]:grid-cols-1 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-fs13 font-semibold text-gray-200">
                Territory / Geography *
              </label>
              <Select
                options={TERRITORIES}
                value={territory}
                onChange={(e) => setTerritory(e.target.value)}
                className="w-full bg-[#111826] border border-white/15 rounded-[8px] px-3.5 py-2.5 text-fs14 text-white focus:outline-none focus:border-[#FABE2C] transition cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-fs13 font-semibold text-gray-200">
                License Duration *
              </label>
              <Select
                options={DURATIONS}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[#111826] border border-white/15 rounded-[8px] px-3.5 py-2.5 text-fs14 text-white focus:outline-none focus:border-[#FABE2C] transition cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-fs13 font-semibold text-gray-200">
              Proposed Offer Amount (USD) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-fs15">
                $
              </span>
              <Input
                type="number"
                min="1"
                step="500"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                placeholder="e.g. 50000"
                required
                className="w-full bg-[#111826] border border-white/15 rounded-[8px] pl-8 pr-4 py-2.5 text-fs14 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FABE2C] transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-fs13 font-semibold text-gray-200">
              Offer Notes & Pitch (Optional)
            </label>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Provide context regarding your distribution channels, platforms, or payment milestones..."
              className="w-full bg-[#111826] border border-white/15 rounded-[8px] px-3.5 py-2 text-fs14 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FABE2C] transition resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10 mt-2">
            <Button
              variant="secondary"
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-[8px] border border-white/15 text-white/80 hover:text-white hover:border-white/30 text-fs14 font-medium transition cursor-pointer h-auto"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="px-6 py-2.5 rounded-[8px] bg-[#FABE2C] hover:bg-[#e0a824] active:scale-95 text-black font-bold text-fs14 shadow-lg transition cursor-pointer h-auto"
            >
              Submit Offer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeOfferModal;
