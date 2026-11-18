import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import tmdbService, {
  type TMDBMovie,
  TMDB_GENRES,
} from "../../services/tmdbService";
import GenreSwiper from "./components/GenreSwiper";
import ExploreFiltersBar from "./components/ExploreFiltersBar";
import RecentSearchSection from "./components/RecentSearchSection";
import TopSearchSection from "./components/TopSearchSection";
import Pagination from "./components/Pagination";
import MakeOfferModal from "./components/MakeOfferModal";
import FilterModal from "./components/FilterModal";
import {
  type FilterState,
  GENRE_NAME_TO_TMDB_ID,
  TMDB_ID_TO_GENRE_NAMES,
  LANGUAGE_NAME_TO_CODE,
} from "./filterConstants";

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial states from URL params for deep-linking
  const initialQuery = searchParams.get("q") || "";
  const initialGenre = searchParams.get("genre")
    ? Number(searchParams.get("genre"))
    : null;
  const initialYear = searchParams.get("year") || "Release Year";
  const initialContentType = searchParams.get("type") || "All Content";
  const initialPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(
    initialGenre,
  );
  const [contentType, setContentType] = useState(initialContentType);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Data States
  const [exploreMovies, setExploreMovies] = useState<TMDBMovie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isExploreLoading, setIsExploreLoading] = useState(false);

  // Recent Search Data States
  const [recentMovies, setRecentMovies] = useState<TMDBMovie[]>([]);
  const [isRecentLoading, setIsRecentLoading] = useState(false);

  // Modal State
  const [selectedMovieForOffer, setSelectedMovieForOffer] =
    useState<TMDBMovie | null>(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  // Initial genre names if deep-linked via URL
  const initialGenreNames = initialGenre && TMDB_ID_TO_GENRE_NAMES[initialGenre]
    ? [TMDB_ID_TO_GENRE_NAMES[initialGenre][0]]
    : [];

  // Filter Modal State
  const [filterModalState, setFilterModalState] = useState<FilterState>({
    contentTypes: [],
    genres: initialGenreNames,
    languages: [],
    formats: [],
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Active filter badge count on "Filters By" button
  const activeFilterCount =
    filterModalState.contentTypes.length +
    filterModalState.genres.length +
    filterModalState.languages.length +
    filterModalState.formats.length;

  // Synchronized active genre IDs from both Filter Modal and Genre Swiper
  const activeGenreIds = useMemo(() => {
    const modalIds = filterModalState.genres
      .map((g) => GENRE_NAME_TO_TMDB_ID[g])
      .filter((id): id is number => typeof id === "number");

    return Array.from(
      new Set([
        ...(selectedGenreId !== null ? [selectedGenreId] : []),
        ...modalIds,
      ]),
    );
  }, [selectedGenreId, filterModalState.genres]);

  // Section reference for scrolling to grid on page change
  const gridSectionRef = useRef<HTMLDivElement>(null);

  // Debounce search input by 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1); // Reset page on new query
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Sync state to URL search parameters
  useEffect(() => {
    const params: Record<string, string> = {};
    if (debouncedQuery) params.q = debouncedQuery;
    if (activeGenreIds.length > 0) {
      params.genre = String(activeGenreIds[0]);
    }
    if (selectedYear !== "Release Year") params.year = selectedYear;
    if (contentType !== "All Content") params.type = contentType;
    if (currentPage > 1) params.page = String(currentPage);

    setSearchParams(params, { replace: true });
  }, [
    debouncedQuery,
    activeGenreIds,
    selectedYear,
    contentType,
    currentPage,
    setSearchParams,
  ]);

  // Fetch Recent Search / Trending Movies on initial mount
  useEffect(() => {
    let isMounted = true;
    const loadRecentSearches = async () => {
      setIsRecentLoading(true);
      try {
        const movies = await tmdbService.getRecentSearchMovies();
        if (isMounted) {
          setRecentMovies(movies);
        }
      } catch (err) {
        console.error("Failed to load recent search movies:", err);
      } finally {
        if (isMounted) setIsRecentLoading(false);
      }
    };
    loadRecentSearches();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch Dynamic Explore Movies whenever any filter changes
  useEffect(() => {
    let isMounted = true;

    const loadMovies = async () => {
      try {
        setIsExploreLoading(true);

        const modalLanguageCodes = filterModalState.languages
          .map((l) => LANGUAGE_NAME_TO_CODE[l])
          .filter(Boolean);

        const response = await tmdbService.getExploreMovies({
          query: debouncedQuery,
          genreId: activeGenreIds.length === 1 ? activeGenreIds[0] : null,
          genres: activeGenreIds.length > 0 ? activeGenreIds : undefined,
          languages:
            modalLanguageCodes.length > 0 ? modalLanguageCodes : undefined,
          contentTypes: filterModalState.contentTypes,
          formats: filterModalState.formats,
          year: selectedYear,
          contentType: contentType,
          page: currentPage,
        });

        if (isMounted) {
          setExploreMovies(response.results || []);
          setTotalPages(Math.min(50, response.total_pages || 1));
          setTotalResults(response.total_results || 0);
        }
      } catch (err) {
        console.error("Error fetching explore movies:", err);
        if (isMounted) {
          setExploreMovies([]);
        }
      } finally {
        if (isMounted) {
          setIsExploreLoading(false);
        }
      }
    };

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, [
    debouncedQuery,
    activeGenreIds,
    filterModalState,
    selectedYear,
    contentType,
    currentPage,
  ]);

  // Handle genre click from Genre Swiper: synchronizes with FilterModal
  const handleSelectGenre = (genreId: number | null) => {
    if (genreId === null) return;
    const genreNames = TMDB_ID_TO_GENRE_NAMES[genreId] || [];
    const isAlreadyActive = activeGenreIds.includes(genreId);

    if (isAlreadyActive) {
      // Toggle OFF: remove from selectedGenreId and modal genres
      setSelectedGenreId((prev) => (prev === genreId ? null : prev));
      setFilterModalState((prev) => ({
        ...prev,
        genres: prev.genres.filter(
          (g) => !genreNames.includes(g) && GENRE_NAME_TO_TMDB_ID[g] !== genreId,
        ),
      }));
    } else {
      // Toggle ON: add to selectedGenreId and modal genres
      setSelectedGenreId(genreId);
      const primaryName = genreNames[0] || TMDB_GENRES[genreId] || "Genre";
      setFilterModalState((prev) => ({
        ...prev,
        genres: prev.genres.includes(primaryName)
          ? prev.genres
          : [...prev.genres, primaryName],
      }));
    }
    setCurrentPage(1);
  };

  // Handle applying filters from FilterModal: synchronizes with GenreSwiper
  const handleApplyFilterModal = (newFilters: FilterState) => {
    setFilterModalState(newFilters);
    const newModalGenreIds = newFilters.genres
      .map((g) => GENRE_NAME_TO_TMDB_ID[g])
      .filter((id): id is number => typeof id === "number");

    if (newModalGenreIds.length > 0) {
      if (!selectedGenreId || !newModalGenreIds.includes(selectedGenreId)) {
        setSelectedGenreId(newModalGenreIds[0]);
      }
    } else {
      setSelectedGenreId(null);
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (gridSectionRef.current) {
      gridSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setSelectedGenreId(null);
    setSelectedYear("Release Year");
    setContentType("All Content");
    setFilterModalState({
      contentTypes: [],
      genres: [],
      languages: [],
      formats: [],
    });
    setCurrentPage(1);
  };

  const handleOfferClick = (movie: TMDBMovie) => {
    setSelectedMovieForOffer(movie);
    setIsOfferModalOpen(true);
  };

  const getSectionTitle = () => {
    if (debouncedQuery) {
      return `Search Results for "${debouncedQuery}"`;
    }
    if (activeGenreIds.length === 1) {
      const gid = activeGenreIds[0];
      const genreName =
        gid === -1 ? "Short Films" : TMDB_GENRES[gid] || "Genre";
      return `${genreName} Movies`;
    }
    if (activeGenreIds.length > 1) {
      return "Filtered Movies";
    }
    return "Top Search";
  };

  return (
    <div className="min-h-screen bg-[#111826] text-white font-century select-none pb-20">
      <div className="w-[88%] max-[1024px]:w-[92%] mx-auto pt-6 flex flex-col gap-8">
        {/* Top Header: Title & Breadcrumbs */}
        <div className="flex items-center justify-between">
          <h1 className="text-fs32 max-[1440px]:text-fs28 max-[640px]:text-fs24 font-bold text-white tracking-tight">
            Explore
          </h1>

          <nav className="flex items-center gap-2 text-fs14 text-[#8E8E8E]">
            <Link
              to="/"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </Link>
            <span className="text-gray-600">&gt;</span>
            <span className="text-white font-medium">Explore</span>
          </nav>
        </div>

        {/* 1. Genre Swiper Carousel (Fully synced with FilterModal) */}
        <GenreSwiper
          selectedGenreId={selectedGenreId}
          selectedGenreIds={activeGenreIds}
          onSelectGenre={handleSelectGenre}
        />

        {/* 2. Unified Search and Filter Controls Bar */}
        <ExploreFiltersBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          contentType={contentType}
          onContentTypeChange={(type) => {
            setContentType(type);
            setCurrentPage(1);
          }}
          selectedYear={selectedYear}
          onYearChange={(year) => {
            setSelectedYear(year);
            setCurrentPage(1);
          }}
          onOpenFilterModal={() => setIsFilterModalOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        {/* 3. Recent Search Section (Only shown when no search keywords or filters applied) */}
        {!debouncedQuery && activeGenreIds.length === 0 && activeFilterCount === 0 && (
          <RecentSearchSection
            movies={recentMovies}
            isLoading={isRecentLoading}
            onOfferClick={handleOfferClick}
          />
        )}

        {/* 4. Top Search / Main Filtered Movie Grid */}
        <div ref={gridSectionRef} className="pt-2">
          <TopSearchSection
            title={getSectionTitle()}
            movies={exploreMovies}
            isLoading={isExploreLoading}
            totalResults={totalResults}
            onOfferClick={handleOfferClick}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* 5. Pagination Bar */}
        <div className="pt-4 pb-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Make an Offer Modal */}
      <MakeOfferModal
        movie={selectedMovieForOffer}
        isOpen={isOfferModalOpen}
        onClose={() => {
          setIsOfferModalOpen(false);
          setSelectedMovieForOffer(null);
        }}
      />

      {/* Filter Modal (Fully synced with GenreSwiper) */}
      {isFilterModalOpen && (
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          activeFilters={filterModalState}
          onApplyFilters={handleApplyFilterModal}
        />
      )}
    </div>
  );
};

export default Explore;
