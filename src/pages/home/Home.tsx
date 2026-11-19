import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
    navigate(`/make-offer/${movie.id}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#111826] text-white font-century pb-16">
      <BannerSection />

      <div className="space-y-6">
        <MovieCarouselSection
          title="Latest Content"
          movies={latest.movies}
          isLoading={latest.isLoading}
          error={latest.error}
          onRetry={() => dispatch(fetchLatestMovies())}
          onOfferClick={handleOfferClick}
          featuredIndex={0}
        />

        <MovieCarouselSection
          title="Tamil Content"
          movies={tamil.movies}
          isLoading={tamil.isLoading}
          error={tamil.error}
          onRetry={() => dispatch(fetchTamilMovies())}
          onOfferClick={handleOfferClick}
          featuredIndex={1}
        />

        <MovieCarouselSection
          title="Short Content"
          movies={short.movies}
          isLoading={short.isLoading}
          error={short.error}
          onRetry={() => dispatch(fetchShortMovies())}
          onOfferClick={handleOfferClick}
          featuredIndex={2}
        />

        <MovieCarouselSection
          title="Low Budget Content"
          movies={lowBudget.movies}
          isLoading={lowBudget.isLoading}
          error={lowBudget.error}
          onRetry={() => dispatch(fetchLowBudgetMovies())}
          onOfferClick={handleOfferClick}
          featuredIndex={0}
        />
      </div>
    </div>
  );
};

export default Home;
