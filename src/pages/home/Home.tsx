import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../../store/store";
import {
  fetchLatestMovies,
  fetchTamilMovies,
  fetchShortMovies,
  fetchLowBudgetMovies,
} from "../../store/movieSlice";
import BannerSection from "./components/BannerSection";
import MovieCarouselSection from "./components/MovieCarouselSection";
import type { TMDBMovie } from "../../services/tmdbService";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { latest, tamil, short, lowBudget } = useSelector(
    (state: RootState) => state.movies,
  );

  useEffect(() => {
    dispatch(fetchLatestMovies());
    dispatch(fetchTamilMovies());
    dispatch(fetchShortMovies());
    dispatch(fetchLowBudgetMovies());
  }, [dispatch]);

  const handleOfferClick = (movie: TMDBMovie) => {
    toast.success(`Offer request initiated for "${movie.title}"`);
  };

  return (
    <div className="w-full min-h-screen bg-[#111826] text-white font-century pb-16">
      {/* 1. Hero / Banner Section */}
      <BannerSection />

      {/* 2. Movie Carousels */}
      <div className="space-y-6">
        {/* Latest Content */}
        <MovieCarouselSection
          title="Latest Content"
          movies={latest.movies}
          isLoading={latest.isLoading}
          error={latest.error}
          onRetry={() => dispatch(fetchLatestMovies())}
          featuredIndex={0}
        />

        {/* Tamil Content */}
        <MovieCarouselSection
          title="Tamil Content"
          movies={tamil.movies}
          isLoading={tamil.isLoading}
          error={tamil.error}
          onRetry={() => dispatch(fetchTamilMovies())}
          onOfferClick={handleOfferClick}
          featuredIndex={1}
        />

        {/* Short Content */}
        <MovieCarouselSection
          title="Short Content"
          movies={short.movies}
          isLoading={short.isLoading}
          error={short.error}
          onRetry={() => dispatch(fetchShortMovies())}
          featuredIndex={2}
        />

        {/* Low Budget Content */}
        <MovieCarouselSection
          title="Low Budget Content"
          movies={lowBudget.movies}
          isLoading={lowBudget.isLoading}
          error={lowBudget.error}
          onRetry={() => dispatch(fetchLowBudgetMovies())}
          featuredIndex={0}
        />
      </div>
    </div>
  );
};

export default Home;
