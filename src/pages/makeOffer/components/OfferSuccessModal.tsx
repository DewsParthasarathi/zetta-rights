import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";
import successIcon from "../../../assets/images/MakeAnOffer/successIcon.png";
import type { OfferRecord } from "../../../types/offer";

export interface OfferSuccessModalProps {
  isOpen: boolean;
  offer: OfferRecord | null;
  onViewMovie: () => void;
  onExplore: () => void;
  className?: string;
}

const OfferSuccessModal = ({
  isOpen,
  offer,
  onViewMovie,
  onExplore,
  className = "",
}: OfferSuccessModalProps) => {
  if (!isOpen || !offer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none font-century animate-fadeIn">
      <div
        className={`relative w-full max-w-lg bg-[#0F172A] border border-white/20 rounded-[20px] p-8 max-[640px]:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col items-center text-center ${className}`}
      >
        <div className="w-20 h-20 mb-4 flex items-center justify-center animate-bounce">
          <Image
            src={successIcon}
            alt="Success"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        <h3 className="text-fs22 max-[1440px]:text-[20px] max-[1024px]:text-[18px] max-[640px]:text-[16px] font-bold text-white mb-2 tracking-tight">
          Offer Submitted Successfully!
        </h3>
        <p className="text-[13px] text-gray-300 mb-6 max-w-md leading-relaxed">
          Your offer for <span className="text-[#FABE2C] font-semibold">&quot;{offer.movieTitle}&quot;</span> has been recorded and associated with your account record ({offer.userEmail}).
        </p>

        <div className="w-full bg-[#18202F] border border-white/10 rounded-[12px] p-4 text-left flex flex-col gap-2.5 mb-6 text-[13px]">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-gray-400">Offer ID:</span>
            <span className="text-white font-mono font-semibold">{offer.id}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Licensing Model:</span>
            <span className="text-[#FABE2C] font-semibold uppercase">
              {offer.pricingModel === "flat_rate" ? "Fixed Price / Flat Rate" : "Revenue Share"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Rights Type:</span>
            <span className="text-white font-medium">{offer.rightsType}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Licensing Period:</span>
            <span className="text-white font-medium">
              {offer.years}Y {offer.months}M ({offer.startDate} to {offer.endDate})
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-gray-400">Proposed Terms:</span>
            <span className="text-white font-bold">
              {offer.pricingModel === "flat_rate"
                ? `${offer.currency.split(" ")[0]} ${(offer.totalAmount || 0).toLocaleString()}`
                : `${offer.revenueSharePercentage}% Rev Share`}
            </span>
          </div>
        </div>

        <div className="w-full flex items-center justify-center gap-4 max-[640px]:flex-col">
          <Button
            variant="outline"
            type="button"
            onClick={onExplore}
            className="flex-1 py-2.5 rounded-[8px] border border-[#FABE2C] text-[#FABE2C] hover:bg-[#FABE2C]/10 font-bold text-[14px] transition"
          >
            Explore Movies
          </Button>

          <Button
            variant="primary"
            type="button"
            onClick={onViewMovie}
            className="flex-1 py-2.5 rounded-[8px] bg-[#FABE2C] hover:bg-[#E5AD25] text-black font-bold text-[14px] transition shadow-md"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferSuccessModal;
