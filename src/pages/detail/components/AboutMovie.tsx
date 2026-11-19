import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../../../store/store";
import { toggleFavorite } from "../../../store/movieSlice";
import type {
  TMDBMovieDetail,
  TMDBCastMember,
  TMDBCrewMember,
} from "../../../services/tmdbService";
import { TMDB_GENRES } from "../../../services/tmdbService";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";

import CastTab from "./CastTab";
import CrewTab from "./CrewTab";
import RightsTab from "./RightsTab";

import Time_Icon from "../../../assets/images/DetailPage/Time_Icon.png";
import Comment_Icon from "../../../assets/images/DetailPage/Comment_Icon.png";
import Heart_Icon from "../../../assets/images/DetailPage/Heart_Icon.png";
import Starfiiled_Icon from "../../../assets/images/DetailPage/Starfiiled_Icon.png";
import Staroutline_Icon from "../../../assets/images/DetailPage/Staroutline_Icon.png";
import shareIcon from "../../../assets/images/DetailPage/shareIcon.png";
import Fb from "../../../assets/images/DetailPage/Fb.png";
import instaIcon from "../../../assets/images/DetailPage/instaIcon.png";
import twitter from "../../../assets/images/DetailPage/twitter.png";
import youTube from "../../../assets/images/DetailPage/youTube.png";

export interface AboutMovieProps {
  movie: TMDBMovieDetail;
  cast: TMDBCastMember[];
  crew: TMDBCrewMember[];
  onOpenOffer: () => void;
  className?: string;
}

type TabType = "Casts" | "Crew" | "Rights";

const AboutMovie = ({
  movie,
  cast,
  crew,
  onOpenOffer,
  className = "",
}: AboutMovieProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const isLiked = favorites.includes(movie.id);

  const [activeTab, setActiveTab] = useState<TabType>("Casts");
  const [isExpanded, setIsExpanded] = useState(false);

  const totalMinutes = movie.runtime || 148;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const durationText = `${hours}h ${minutes}m`;

  const genreNames =
    movie.genres_details && movie.genres_details.length > 0
      ? movie.genres_details.map((g) => g.name)
      : (movie.genre_ids || [28, 12, 18]).map(
          (gid) => TMDB_GENRES[gid] || "Drama",
        );

  const normalizedRating = Math.max(
    1,
    Math.min(5, (movie.vote_average || 9.8) / 2),
  );
  const roundedStars = Math.round(normalizedRating);
  const reviewsCount = movie.vote_count || 1576;
  const commentsCount = movie.commentsCount || 256;
  const likesDisplay = movie.likesCount || "5.5K +";

  const handleToggleLike = () => {
    dispatch(toggleFavorite(movie.id));
    if (!isLiked) {
      toast.success(`Added "${movie.title}" to your favorites!`);
    } else {
      toast.info(`Removed "${movie.title}" from your favorites.`);
    }
  };

  const handleSocialShare = (platform: string) => {
    const url = window.location.href;
    if (platform === "Share") {
      if (navigator.share) {
        navigator.share({ title: movie.title, url }).catch(() => {});
      } else {
        navigator.clipboard.writeText(url);
        toast.success("Movie link copied to clipboard!");
      }
      return;
    }
    toast.info(`Sharing "${movie.title}" on ${platform}...`);
  };

  return (
    <div
      className={`w-full flex flex-col justify-between font-century select-none text-white ${className}`}
    >
      <div>
        <h2 className="text-fs26 max-[1440px]:text-fs22 max-[1024px]:text-fs20 font-bold text-white tracking-tight mb-3">
          About {movie.title}
        </h2>

        <div className="text-fs14 max-[1440px]:text-fs13 text-[#A0AEC0] leading-relaxed mb-4">
          <p className="inline">
            {isExpanded
              ? movie.overview
              : movie.overview.length > 180
                ? `${movie.overview.slice(0, 180)}... `
                : `${movie.overview} `}
          </p>
          {movie.overview.length > 180 && (
            <Button
              variant="unstyled"
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline text-[#FABE2C] hover:text-[#E5AD25] font-semibold text-fs14 max-[1440px]:text-fs13 cursor-pointer ml-1 transition"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-white/10 mb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] border border-white/15 bg-white/5 text-fs12 max-[1440px]:text-fs11 text-gray-300">
              <Image
                src={Time_Icon}
                alt="Time"
                className="w-3.5 h-3.5 object-contain"
              />
              <span>{durationText}</span>
            </span>

            {genreNames.slice(0, 6).map((name, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-3 py-1 rounded-[6px] border border-white/15 bg-white/5 text-fs12 max-[1440px]:text-fs11 text-gray-300"
              >
                {name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-5 max-[640px]:gap-3">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Image
                    key={star}
                    src={
                      star <= roundedStars ? Starfiiled_Icon : Staroutline_Icon
                    }
                    alt="Star"
                    className="w-3.5 h-3.5 object-contain"
                  />
                ))}
              </div>
              <span className="text-fs12 max-[1440px]:text-fs11 text-gray-300 font-medium">
                ({normalizedRating.toFixed(1)}) {reviewsCount} Reviews
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-fs12 max-[1440px]:text-fs11 text-gray-300 font-medium">
              <Image
                src={Comment_Icon}
                alt="Comments"
                className="w-4 h-4 object-contain"
              />
              <span>Comments ({commentsCount})</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Button
            variant="primary"
            type="button"
            onClick={onOpenOffer}
            className="px-8 py-2.5 rounded-[8px] font-bold text-black text-fs15 max-[1440px]:text-fs14 bg-[#FABE2C] hover:bg-[#E5AD25] active:scale-95 shadow-md transition"
          >
            Make an Offer
          </Button>

          <Button
            variant="unstyled"
            type="button"
            onClick={handleToggleLike}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] border transition cursor-pointer ${
              isLiked
                ? "bg-[#FABE2C]/20 border-[#FABE2C] text-[#FABE2C]"
                : "bg-[#18202F] border-white/20 text-white hover:bg-white/10"
            }`}
            title={isLiked ? "Unlike" : "Like"}
          >
            <Image
              src={Heart_Icon}
              alt="Like"
              className="w-4 h-4 object-contain"
            />
            <span className="text-fs14 max-[1440px]:text-fs13 font-semibold">
              {isLiked ? `${likesDisplay} Liked` : likesDisplay}
            </span>
          </Button>

          <div className="flex items-center gap-3 ml-auto max-[640px]:ml-0">
            <Button
              variant="unstyled"
              type="button"
              onClick={() => handleSocialShare("Share")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-75 transition cursor-pointer"
              title="Share"
            >
              <Image
                src={shareIcon}
                alt="Share"
                className="w-4 h-4 object-contain pointer-events-none"
              />
            </Button>

            <Button
              variant="unstyled"
              type="button"
              onClick={() => handleSocialShare("Facebook")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-75 transition cursor-pointer"
              title="Facebook"
            >
              <Image
                src={Fb}
                alt="Facebook"
                className="w-4 h-4 object-contain pointer-events-none"
              />
            </Button>

            <Button
              variant="unstyled"
              type="button"
              onClick={() => handleSocialShare("Instagram")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-75 transition cursor-pointer"
              title="Instagram"
            >
              <Image
                src={instaIcon}
                alt="Instagram"
                className="w-4 h-4 object-contain pointer-events-none"
              />
            </Button>

            <Button
              variant="unstyled"
              type="button"
              onClick={() => handleSocialShare("Twitter")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-75 transition cursor-pointer"
              title="Twitter"
            >
              <Image
                src={twitter}
                alt="Twitter"
                className="w-4 h-4 object-contain pointer-events-none"
              />
            </Button>

            <Button
              variant="unstyled"
              type="button"
              onClick={() => handleSocialShare("YouTube")}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-75 transition cursor-pointer"
              title="YouTube"
            >
              <Image
                src={youTube}
                alt="YouTube"
                className="w-4 h-4 object-contain pointer-events-none"
              />
            </Button>
          </div>
        </div>

        <div className="w-[70%] mx-auto bg-[#18202F] border border-white/10 rounded-[10px] p-1 flex items-center mb-5 select-none">
          {(["Casts", "Crew", "Rights"] as TabType[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <Button
                key={tab}
                variant="unstyled"
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-fs14 max-[1440px]:text-fs13 font-bold rounded-[8px] transition-all cursor-pointer text-center ${
                  isActive
                    ? "bg-white text-black shadow-md font-bold"
                    : "text-white/80 hover:text-white hover:bg-white/5 font-semibold"
                }`}
              >
                {tab}
              </Button>
            );
          })}
        </div>

        <div className="min-h-[110px]">
          {activeTab === "Casts" && <CastTab cast={cast} />}
          {activeTab === "Crew" && <CrewTab crew={crew} />}
          {activeTab === "Rights" && <RightsTab />}
        </div>
      </div>

      <Button
        variant="primary"
        type="button"
        onClick={onOpenOffer}
        fullWidth
        className="py-3.5 w-[70%]! mx-auto rounded-[10px] font-bold text-black text-fs16 max-[1440px]:text-fs15 bg-[#FABE2C] hover:bg-[#E5AD25] active:scale-[0.99] shadow-lg transition mt-6"
      >
        Make an Offer
      </Button>
    </div>
  );
};

export default AboutMovie;
