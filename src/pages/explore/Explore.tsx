import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import tmdbService, {
  type TMDBMovie,
  TMDB_GENRES,
} from "../../services/tmdbService";
import GenreSwiper from "./components/GenreSwiper";
import ExploreFiltersBar from "./components/ExploreFiltersBar";
import RecentSearchSection from "./components/RecentSearchSection";
import TopSearchSection from "./components/TopSearchSection";
import Pagination from "./components/Pagination";
import FilterModal from "./components/FilterModal";
import {
  type FilterState,
  GENRE_NAME_TO_TMDB_ID,
  TMDB_ID_TO_GENRE_NAMES,
  LANGUAGE_NAME_TO_CODE,
} from "./filterConstants";

const Explore = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const initialGenre = searchParams.get("genre")
    ? Number(searchParams.get("genre"))
    : null;
  const initialYear = searchParams.get("year") || "Release Year";
  const initialContentType = searchParams.get("type") || "All Content";
  const initialPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(
    initialGenre,
  );
  const [contentType, setContentType] = useState(initialContentType);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [exploreMovies, setExploreMovies] = useState<TMDBMovie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isExploreLoading, setIsExploreLoading] = useState(false);

  const [recentMovies, setRecentMovies] = useState<TMDBMovie[]>([]);
  const [isRecentLoading, setIsRecentLoading] = useState(false);

  const initialGenreNames = initialGenre && TMDB_ID_TO_GENRE_NAMES[initialGenre]
    ? [TMDB_ID_TO_GENRE_NAMES[initialGenre][0]]
    : [];

  const [filterModalState, setFilterModalState] = useState<FilterState>({
    contentTypes: [],
    genres: initialGenreNames,
    languages: [],
    formats: [],
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const activeFilterCount =
    filterModalState.contentTypes.length +
    filterModalState.genres.length +
    filterModalState.languages.length +
    filterModalState.formats.length;

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

  const gridSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  const handleSelectGenre = (genreId: number | null) => {
    if (genreId === null) return;
    const genreNames = TMDB_ID_TO_GENRE_NAMES[genreId] || [];
    const isAlreadyActive = activeGenreIds.includes(genreId);

    if (isAlreadyActive) {
      setSelectedGenreId((prev) => (prev === genreId ? null : prev));
      setFilterModalState((prev) => ({
        ...prev,
        genres: prev.genres.filter(
          (g) => !genreNames.includes(g) && GENRE_NAME_TO_TMDB_ID[g] !== genreId,
        ),
      }));
    } else {
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
    navigate(`/make-offer/${movie.id}`);
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

        <GenreSwiper
          selectedGenreId={selectedGenreId}
          selectedGenreIds={activeGenreIds}
          onSelectGenre={handleSelectGenre}
        />

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

        {!debouncedQuery && activeGenreIds.length === 0 && activeFilterCount === 0 && (
          <RecentSearchSection
            movies={recentMovies}
            isLoading={isRecentLoading}
            onOfferClick={handleOfferClick}
          />
        )}

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

        <div className="pt-4 pb-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

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
