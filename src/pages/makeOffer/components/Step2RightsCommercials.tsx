import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";
import Select from "../../../components/common/Select";
import rightIcon from "../../../assets/images/MakeAnOffer/right_Icon.png";
import unavailableIcon from "../../../assets/images/MakeAnOffer/unavailable_Icon.png";

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
  { label: "EST (Electronic Sell-Through)", value: "EST (Electronic Sell-Through)" },
];

const HOLDBACK_OPTIONS = ["1 Month", "3 Months", "6 Months", "None"];

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
      <h3 className="text-fs20 max-[1440px]:text-fs18 font-bold text-white mb-6">
        Rights &amp; Commercials
      </h3>

      <div className="flex flex-col mb-5">
        <label className="text-fs13 text-[#A0AEC0] mb-2 font-medium">
          Offer Currency
        </label>
        <Select
          options={CURRENCY_OPTIONS}
          value={data.currency}
          onChange={(e) => onChange({ currency: e.target.value })}
          fullWidth
          className="bg-[#151D2A] border-white/10 rounded-[8px] h-12 text-fs14 font-medium"
        />
      </div>

      <div className="flex flex-col mb-8">
        <label className="text-fs13 text-[#A0AEC0] mb-2 font-medium">
          Rights Types
        </label>
        <Select
          options={RIGHTS_TYPE_OPTIONS}
          value={data.rightsType}
          onChange={(e) => onChange({ rightsType: e.target.value })}
          fullWidth
          className="bg-[#151D2A] border-white/10 rounded-[8px] h-12 text-fs14 font-medium"
        />
      </div>

      <div className="flex items-center max-[1024px]:flex-col gap-8 mb-10">
        <div className="w-[60%] max-[1024px]:w-full bg-[#151D2A] border border-white/10 rounded-[12px] p-6">
          <div className="grid grid-cols-2 divide-x divide-white/10">
            <div className="flex flex-col items-center pr-4">
              <h4 className="text-fs16 max-[1440px]:text-fs15 font-bold text-white mb-4 pb-2 border-b border-white/10 w-full text-center">
                Exclusivity
              </h4>
              <div className="flex flex-col gap-3 w-full">
                {(["Exclusive", "Non Exclusive"] as const).map((opt) => {
                  const isSelected = data.exclusivity === opt;
                  return (
                    <Button
                      key={opt}
                      variant="unstyled"
                      type="button"
                      onClick={() => onChange({ exclusivity: opt })}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-[6px] transition cursor-pointer text-left w-full ${
                        isSelected
                          ? "bg-white/10 text-white font-semibold"
                          : "text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      <Image
                        src={rightIcon}
                        alt="Selected"
                        className="w-4 h-4 object-contain shrink-0"
                      />
                      <span className="text-fs14 max-[1440px]:text-fs13">
                        {opt}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col items-center pl-4">
              <h4 className="text-fs16 max-[1440px]:text-fs15 font-bold text-white mb-4 pb-2 border-b border-white/10 w-full text-center">
                Holdback
              </h4>
              <div className="flex flex-col gap-3 w-full">
                {HOLDBACK_OPTIONS.map((hb) => {
                  const isSelected = data.holdback === hb;
                  return (
                    <Button
                      key={hb}
                      variant="unstyled"
                      type="button"
                      onClick={() => onChange({ holdback: hb })}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-[6px] transition cursor-pointer text-left w-full ${
                        isSelected
                          ? "bg-white/10 text-white font-semibold"
                          : "text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      <Image
                        src={rightIcon}
                        alt="Selected"
                        className="w-4 h-4 object-contain shrink-0"
                      />
                      <span className="text-fs14 max-[1440px]:text-fs13">
                        {hb}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[40%] max-[1024px]:w-full flex flex-col justify-center gap-3.5 pl-4 max-[1024px]:pl-0">
          <div className="flex items-center gap-3 text-fs13 max-[1440px]:text-fs12 text-gray-300 font-medium">
            <Image
              src={rightIcon}
              alt="Available"
              className="w-4 h-4 object-contain shrink-0"
            />
            <span>Available</span>
          </div>

          <div className="flex items-center gap-3 text-fs13 max-[1440px]:text-fs12 text-gray-300 font-medium">
            <Image
              src={unavailableIcon}
              alt="Unavailable"
              className="w-4 h-4 object-contain shrink-0"
            />
            <span>Unavailable</span>
          </div>

          <div className="flex items-center gap-3 text-fs13 max-[1440px]:text-fs12 text-gray-300 font-medium">
            <div className="w-4 h-4 rounded-full border border-red-500 flex items-center justify-center text-red-500 text-fs10 font-bold shrink-0">
              ⊘
            </div>
            <span>Right is no longer</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 mt-auto">
        <Button
          variant="outline"
          type="button"
          onClick={onPrevious}
          className="px-8 py-2.5 rounded-[8px] border border-[#FABE2C] text-[#FABE2C] hover:bg-[#FABE2C]/10 font-bold text-fs14 transition active:scale-95"
        >
          Previous
        </Button>

        <Button
          variant="primary"
          type="submit"
          className="px-8 py-2.5 rounded-[8px] bg-[#FABE2C] hover:bg-[#E5AD25] text-black font-bold text-fs14 transition active:scale-95 shadow-md"
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default Step2RightsCommercials;
