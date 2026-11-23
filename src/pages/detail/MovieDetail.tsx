import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import type {
  TMDBMovie,
  TMDBMovieDetail,
  TMDBCastMember,
  TMDBCrewMember,
} from "../../services/tmdbService";
import tmdbService, { getImageUrl } from "../../services/tmdbService";

import MediaGallery from "./components/MediaGallery";
import AboutMovie from "./components/AboutMovie";
import VideoModal from "./components/VideoModal";
import RelatedItemsSection from "./components/RelatedItemsSection";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id ? parseInt(id, 10) : 102;
  const navigate = useNavigate();
  const location = useLocation();

  const [movie, setMovie] = useState<TMDBMovieDetail | null>(null);
  const [cast, setCast] = useState<TMDBCastMember[]>([]);
  const [crew, setCrew] = useState<TMDBCrewMember[]>([]);
  const [relatedMovies, setRelatedMovies] = useState<TMDBMovie[]>([]);
  const [backdrops, setBackdrops] = useState<string[]>([]);
  const [posters, setPosters] = useState<string[]>([]);
  const [videoKey, setVideoKey] = useState<string>("8mrVmf239GU");
  const [isLoading, setIsLoading] = useState(true);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeVideoPreview, setActiveVideoPreview] = useState<
    string | undefined
  >(undefined);

  const handleOpenVideo = (previewSrc?: string) => {
    setActiveVideoPreview(previewSrc);
    setIsVideoOpen(true);
  };

  useEffect(() => {
    let isMounted = true;
    window.scrollTo({ top: 0, behavior: "smooth" });

    const loadData = async () => {
      setIsLoading(true);
      try {
        const [movieData, creditsData, similarData, imagesData, trailerKey] =
          await Promise.all([
            tmdbService.getMovieDetails(movieId),
            tmdbService.getMovieCredits(movieId),
            tmdbService.getSimilarMovies(movieId),
            tmdbService.getMovieImages(movieId),
            tmdbService.getMovieTrailer(movieId),
          ]);

        if (isMounted) {
          setMovie(movieData);
          setCast(creditsData.cast || []);
          setCrew(creditsData.crew || []);
          setRelatedMovies(similarData || []);
          setBackdrops(imagesData.backdrops || []);
          setPosters(imagesData.posters || []);
          setVideoKey(trailerKey || "8mrVmf239GU");
        }
      } catch (err) {
        console.error("Failed to load movie details:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [movieId]);

  const originState = location.state as {
    origin?: string;
    from?: string;
  } | null;
  const origin =
    originState?.origin ||
    (originState?.from?.includes("explore")
      ? "explore"
      : originState?.from === "/" || originState?.from?.includes("home")
        ? "home"
        : sessionStorage.getItem("nav_origin") === "explore"
          ? "explore"
          : "home");
  const originPath = origin === "explore" ? "/explore" : "/";
  const originLabel = origin === "explore" ? "Explore" : "Home";

  const handleOpenOfferModal = (targetMovie?: TMDBMovie) => {
    const idToUse = targetMovie?.id || movieId;
    navigate(`/make-offer/${idToUse}`, {
      state: {
        origin,
        from: `/movie/${movieId}`,
        movieTitle: targetMovie?.title || movie?.title || "Movie",
        direct: false,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#111826] text-white font-century flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#FABE2C] border-t-transparent rounded-full animate-spin" />
          <p className="text-fs16 text-gray-300 font-medium">
            Loading movie details...
          </p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="w-full min-h-screen bg-[#111826] text-white font-century flex flex-col items-center justify-center p-6 gap-4">
        <h2 className="text-fs24 font-bold text-red-400">
          Movie Details Unavailable
        </h2>
        <p className="text-fs14 text-gray-400">
          The requested movie could not be loaded or was removed.
        </p>
        <Link
          to="/"
          className="px-6 py-2.5 bg-[#FABE2C] text-black font-semibold text-fs14 rounded-[8px] hover:bg-[#E5AD25] transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const trailerPreviewImage =
    (backdrops[0] && getImageUrl(backdrops[0], "original")) ||
    getImageUrl(movie.backdrop_path || movie.poster_path, "original");

  return (
    <div className="w-full min-h-screen bg-[#111826] text-white font-century select-none pb-20">
      <div className="w-[93%] max-[1024px]:w-[96%] max-[768px]:w-[98%] max-[480px]:w-full px-12 max-[1024px]:px-4 max-[768px]:px-3 max-[480px]:px-2.5 mx-auto">
        <div className="pt-8 pb-6 flex items-center justify-between border-b border-white/5 mb-8">
          <h1 className="text-fs32 max-[1440px]:text-fs28 max-[640px]:text-[20px] font-bold text-white tracking-tight">
            {movie.title}
          </h1>

          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[14px] text-[#8E8E8E] max-[640px]:text-[12px]"
          >
            <Link
              to={originPath}
              state={{ origin }}
              className="hover:text-white transition"
            >
              {originLabel}
            </Link>
            <span className="text-gray-500 font-light">&gt;</span>
            <span className="text-white font-bold truncate max-w-[200px]">
              {movie.title}
            </span>
          </nav>
        </div>

        <div className="grid grid-cols-12 gap-8 max-[1440px]:gap-6 max-[1024px]:grid-cols-1 mb-10">
          <div className="col-span-6 max-[1440px]:col-span-6 max-[1024px]:col-span-12">
            <MediaGallery
              movie={movie}
              backdrops={backdrops}
              posters={posters}
              onOpenVideo={handleOpenVideo}
            />
          </div>

          <div className="col-span-6 max-[1440px]:col-span-6 max-[1024px]:col-span-12">
            <AboutMovie
              movie={movie}
              cast={cast}
              crew={crew}
              onOpenOffer={() => handleOpenOfferModal()}
            />
          </div>
        </div>

        <RelatedItemsSection
          movies={relatedMovies}
          onOfferClick={(relMovie) => handleOpenOfferModal(relMovie)}
        />
      </div>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title={movie.title}
        videoKey={videoKey}
        previewImage={activeVideoPreview || trailerPreviewImage}
      />
    </div>
  );
};

export default MovieDetail;
