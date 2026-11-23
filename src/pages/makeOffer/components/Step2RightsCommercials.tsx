import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";
import Select from "../../../components/common/Select";
import rightIcon from "../../../assets/images/MakeAnOffer/right_Icon.png";
import unavailableIcon from "../../../assets/images/MakeAnOffer/unavailable_Icon.png";
import exclusiveIcon from "../../../assets/images/MakeAnOffer/exclusive_Icon.png";

export interface Step2Data {
  currency: string;
  rightsType: string;
  exclusivity: "Exclusive" | "Non Exclusive";
  holdback: string;
}

export interface Step2RightsCommercialsProps {
  data: Step2Data;
  onChange: (updated: Partial<Step2Data>) => void;
  onNext: () => void;
  onPrevious: () => void;
  className?: string;
}

const CURRENCY_OPTIONS = [
  { label: "₹ - Indian Rupee", value: "₹ - Indian Rupee" },
  { label: "$ - US Dollar", value: "$ - US Dollar" },
  { label: "€ - Euro", value: "€ - Euro" },
  { label: "£ - British Pound", value: "£ - British Pound" },
];

const RIGHTS_TYPE_OPTIONS = [
  { label: "T-VOD (Rental)", value: "T-VOD (Rental)" },
  { label: "S-VOD (Subscription)", value: "S-VOD (Subscription)" },
  { label: "A-VOD (Free with Ads)", value: "A-VOD (Free with Ads)" },
  { label: "Theatrical Rights", value: "Theatrical Rights" },
  { label: "Satellite Rights", value: "Satellite Rights" },
  {
    label: "EST (Electronic Sell-Through)",
    value: "EST (Electronic Sell-Through)",
  },
];

const Step2RightsCommercials = ({
  data,
  onChange,
  onNext,
  onPrevious,
  className = "",
}: Step2RightsCommercialsProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full flex flex-col font-century select-none text-white ${className}`}
    >
      <div className="w-full pb-6 border-b border-white/10 mb-6">
        <h3 className="text-fs22 max-[1440px]:text-[18px] max-[1024px]:text-[16px] max-[768px]:text-[14px] font-bold text-white mb-5 tracking-tight">
          Rights &amp; Commercials
        </h3>

        <div className="flex flex-col w-full max-w-[430px]">
          <label className="text-[13px] text-[#A0AEC0] mb-2 font-medium">
            Offer Currency
          </label>
          <Select
            variant="solid"
            options={CURRENCY_OPTIONS}
            value={data.currency}
            onChange={(e) => onChange({ currency: e.target.value })}
            fullWidth
            className="text-[14px] font-medium"
          />
        </div>
      </div>

      <div className="flex flex-col mb-8 w-full max-w-[430px]">
        <h3 className="text-fs18 max-[1440px]:text-[16px] max-[1024px]:text-[15px] max-[768px]:text-[14px] font-bold text-white mb-3 tracking-tight">
          Rights Types
        </h3>
        <Select
          variant="solid"
          options={RIGHTS_TYPE_OPTIONS}
          value={data.rightsType}
          onChange={(e) => onChange({ rightsType: e.target.value })}
          fullWidth
          className="text-[14px] font-medium"
        />
      </div>

      <div className="flex items-center gap-8 mb-10 max-[768px]:flex-col max-[768px]:items-start">
        <div className="w-[370px] max-[480px]:w-full bg-[#1C2434] border border-white/10 rounded-[8px] overflow-hidden flex">
          <div className="flex flex-col flex-1">
            <h4 className="text-[16px] max-[1440px]:text-[15px] max-[1024px]:text-[14px] font-bold text-white py-3 border-b border-white/10 w-full text-center">
              Exclusivity
            </h4>
            <div className="flex flex-col gap-3 p-4 flex-1 justify-center">
              {(["Exclusive", "Non Exclusive"] as const).map((opt) => {
                const isSelected = data.exclusivity === opt;
                return (
                  <Button
                    key={opt}
                    variant="unstyled"
                    type="button"
                    onClick={() => onChange({ exclusivity: opt })}
                    className={`flex items-center gap-3 transition cursor-pointer text-left w-full ${
                      isSelected
                        ? "text-white font-semibold"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    <Image
                      src={exclusiveIcon}
                      alt="Available"
                      className="w-4 h-4 object-contain shrink-0"
                    />
                    <span className="text-[14px] max-[1440px]:text-[13px]">
                      {opt}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col flex-1 border-l border-white/10">
            <h4 className="text-[16px] max-[1440px]:text-[15px] max-[1024px]:text-[14px] font-bold text-white py-3 border-b border-white/10 w-full text-center">
              Holdback
            </h4>
            <div className="flex flex-col gap-3 p-4 flex-1 justify-center">
              <Button
                variant="unstyled"
                type="button"
                onClick={() => onChange({ holdback: "1 Month" })}
                className="flex mb-auto items-center gap-3 text-white font-semibold transition cursor-pointer text-left w-full"
              >
                <Image
                  src={exclusiveIcon}
                  alt="Available"
                  className="w-4 h-4 object-contain shrink-0"
                />
                <span className="text-[14px] max-[1440px]:text-[13px]">
                  1 Month
                </span>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3.5">
          <div className="flex items-center gap-3 text-[13px] max-[1440px]:text-[12px] text-gray-300 font-medium">
            <Image
              src={exclusiveIcon}
              alt="Available"
              className="w-4 h-4 object-contain shrink-0"
            />
            <span>Available</span>
          </div>

          <div className="flex items-center gap-3 text-[13px] max-[1440px]:text-[12px] text-gray-300 font-medium">
            <Image
              src={unavailableIcon}
              alt="Unavailable"
              className="w-4 h-4 object-contain shrink-0"
            />
            <span>Unavailable</span>
          </div>

          <div className="flex items-center gap-3 text-[13px] max-[1440px]:text-[12px] text-gray-300 font-medium">
            <Image
              src={rightIcon}
              alt="Right is no longer"
              className="w-4 h-4 object-contain shrink-0"
            />
            <span>Right is no longer</span>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
        <Button
          variant="outline"
          type="button"
          onClick={onPrevious}
          className="px-8 py-2.5 rounded-[8px] border border-[#FABE2C] text-[#FABE2C] hover:bg-[#FABE2C]/10 font-bold text-[15px]! max-[1024px]:text-[14px]! max-[640px]:text-[13px]! transition active:scale-95"
        >
          Previous
        </Button>

        <Button
          variant="primary"
          type="submit"
          className="px-8 py-2.5 rounded-[8px] bg-[#FABE2C] hover:bg-[#E5AD25] text-black font-extrabold text-[16px]! max-[1024px]:text-[15px]! max-[640px]:text-[14px]! transition active:scale-95 shadow-md cursor-pointer"
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default Step2RightsCommercials;
