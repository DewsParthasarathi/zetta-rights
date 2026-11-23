import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../../store/store";
import { submitOffer, resetOfferState } from "../../store/slices/offerSlice";
import tmdbService, { type TMDBMovieDetail } from "../../services/tmdbService";
import { toInputDateFormat, calculateEndDate } from "./utils/offerDateUtils";

import OfferStepper from "./components/OfferStepper";
import Step1LicenseRegion, {
  type Step1Data,
} from "./components/Step1LicenseRegion";
import Step2RightsCommercials, {
  type Step2Data,
} from "./components/Step2RightsCommercials";
import Step3PaymentDetails, {
  type Step3Data,
} from "./components/Step3PaymentDetails";
import OfferSuccessModal from "./components/OfferSuccessModal";

const MakeOffer = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id ? parseInt(id, 10) : 102;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { isSubmitting, isSuccess, submittedOffer } = useSelector(
    (state: RootState) => state.offers,
  );

  const [movie, setMovie] = useState<TMDBMovieDetail | null>(null);
  const [isLoadingMovie, setIsLoadingMovie] = useState(true);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [step1Data, setStep1Data] = useState<Step1Data>(() => {
    const today = new Date();
    const defaultEnd = calculateEndDate(today, 1, 2);
    return {
      includedCountries: ["Global"],
      excludedCountries: ["Sri Lanka", "India"],
      startDate: toInputDateFormat(today),
      endDate: toInputDateFormat(defaultEnd),
      years: 1,
      months: 2,
    };
  });

  const [step2Data, setStep2Data] = useState<Step2Data>({
    currency: "₹ - Indian Rupee",
    rightsType: "T-VOD (Rental)",
    exclusivity: "Exclusive",
    holdback: "1 Month",
  });

  const [step3Data, setStep3Data] = useState<Step3Data>({
    pricingModel: "flat_rate",
    flatRateAmount: 100,
    priceListingUnit: "Price Listing",
    totalAmount: 10000,
    transactionMinPrice: 10,
    transactionMaxPrice: 50,
    revenueSharePercentage: 70,
    estimatedMonthlyMin: 20000,
    estimatedMonthlyMax: 200000,
    hasMinimumGuarantee: true,
    minimumGuaranteeAmount: 20000,
    minimumGuaranteePeriod: "Month",
    minimumGuaranteeScope: "Entire Bundle",
  });

  useEffect(() => {
    let isMounted = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(resetOfferState());

    const fetchMovie = async () => {
      setIsLoadingMovie(true);
      try {
        const data = await tmdbService.getMovieDetails(movieId);
        if (isMounted) {
          setMovie(data);
        }
      } catch {
        void 0;
      } finally {
        if (isMounted) {
          setIsLoadingMovie(false);
        }
      }
    };

    fetchMovie();

    return () => {
      isMounted = false;
    };
  }, [movieId, dispatch]);

  const handleStep1Change = (updated: Partial<Step1Data>) => {
    setStep1Data((prev) => ({ ...prev, ...updated }));
  };

  const handleStep2Change = (updated: Partial<Step2Data>) => {
    setStep2Data((prev) => ({ ...prev, ...updated }));
  };

  const handleStep3Change = (updated: Partial<Step3Data>) => {
    setStep3Data((prev) => ({ ...prev, ...updated }));
  };

  const handleFinalSubmit = async () => {
    if (!movie) return;

    try {
      const resultAction = await dispatch(
        submitOffer({
          movieId: movie.id,
          movieTitle: movie.title,
          moviePoster: movie.poster_path || "",
          movieBackdrop: movie.backdrop_path || "",
          movieYear: movie.release_date?.slice(0, 4) || "2024",
          ...step1Data,
          ...step2Data,
          ...step3Data,
        }),
      );

      if (submitOffer.fulfilled.match(resultAction)) {
        toast.success(`Offer successfully submitted for "${movie.title}"!`);
      } else {
        toast.error(
          resultAction.payload || "Failed to submit offer. Please try again.",
        );
      }
    } catch {
      toast.error("An unexpected error occurred while submitting your offer.");
    }
  };

  if (isLoadingMovie) {
    return (
      <div className="w-full min-h-screen bg-[#111826] text-white font-century flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#FABE2C] border-t-transparent rounded-full animate-spin" />
          <p className="text-fs16 text-gray-300 font-medium">
            Loading movie information...
          </p>
        </div>
      </div>
    );
  }

  const navState = location.state as {
    origin?: string;
    from?: string;
    movieTitle?: string;
    direct?: boolean;
  } | null;

  const origin =
    navState?.origin ||
    (navState?.from?.includes("explore")
      ? "explore"
      : navState?.from === "/" || navState?.from?.includes("home")
        ? "home"
        : sessionStorage.getItem("nav_origin") === "explore"
          ? "explore"
          : "home");

  const originPath = origin === "explore" ? "/explore" : "/";
  const originLabel = origin === "explore" ? "Explore" : "Home";

  const isDirect =
    navState?.direct ??
    (navState?.from === "/explore" ||
      navState?.from === "/" ||
      navState?.from === "/home");

  const movieTitle = movie?.title || navState?.movieTitle || "Movie";

  return (
    <div className="w-full min-h-screen bg-[#111826] text-white font-century select-none pb-12 max-[1024px]:pb-8">
      <div className="w-[93%] max-[1024px]:w-[96%] max-[768px]:w-[98%] max-[480px]:w-full px-12 max-[1024px]:px-4 max-[768px]:px-3 max-[480px]:px-2.5 mx-auto">
        <div className="pt-8 pb-6 flex items-center justify-between border-b border-white/5 mb-8 max-[1024px]:mb-6">
          <h1 className="text-fs32 max-[1440px]:text-fs28 max-[640px]:text-[20px] font-bold text-white tracking-tight">
            Make an Offer
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
            {!isDirect && (
              <>
                <span className="text-gray-600">&gt;</span>
                <Link
                  to={`/movie/${movieId}`}
                  state={{ origin, from: originPath }}
                  className="hover:text-white transition truncate max-w-[150px] max-[640px]:max-w-[100px]"
                >
                  {movieTitle}
                </Link>
              </>
            )}
            <span className="text-gray-600">&gt;</span>
            <span className="text-white font-medium">Make an Offer</span>
          </nav>
        </div>

        <div className="flex items-start gap-10 max-[1440px]:gap-8 max-[1024px]:flex-col max-[1024px]:items-stretch max-[1024px]:gap-6 w-full">
          <div className="w-[240px] shrink-0 max-[1024px]:w-full">
            <OfferStepper
              currentStep={currentStep}
              onStepClick={(s) => setCurrentStep(s)}
            />
          </div>

          <div className="flex-1 min-w-0 w-full">
            {currentStep === 1 && (
              <Step1LicenseRegion
                data={step1Data}
                onChange={handleStep1Change}
                onNext={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 2 && (
              <Step2RightsCommercials
                data={step2Data}
                onChange={handleStep2Change}
                onNext={() => setCurrentStep(3)}
                onPrevious={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 3 && (
              <Step3PaymentDetails
                data={step3Data}
                currency={step2Data.currency}
                isSubmitting={isSubmitting}
                onChange={handleStep3Change}
                onSubmit={handleFinalSubmit}
                onPrevious={() => setCurrentStep(2)}
              />
            )}
          </div>
        </div>
      </div>

      <OfferSuccessModal
        isOpen={isSuccess}
        offer={submittedOffer}
        onViewMovie={() => {
          dispatch(resetOfferState());
          navigate(`/movie/${movieId}`, { state: { origin } });
        }}
        onExplore={() => {
          dispatch(resetOfferState());
          navigate("/explore");
        }}
      />
    </div>
  );
};

export default MakeOffer;
