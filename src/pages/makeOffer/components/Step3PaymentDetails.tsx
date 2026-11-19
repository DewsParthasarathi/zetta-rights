import { useState } from "react";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import Checkbox from "../../../components/common/Checkbox";

export interface Step3Data {
  pricingModel: "flat_rate" | "share_revenue";
  flatRateAmount: number;
  priceListingUnit: string;
  totalAmount: number;
  transactionMinPrice: number;
  transactionMaxPrice: number;
  revenueSharePercentage: number;
  estimatedMonthlyMin: number;
  estimatedMonthlyMax: number;
  hasMinimumGuarantee: boolean;
  minimumGuaranteeAmount: number;
  minimumGuaranteePeriod: string;
  minimumGuaranteeScope: string;
}

export interface Step3PaymentDetailsProps {
  data: Step3Data;
  currency: string;
  isSubmitting: boolean;
  onChange: (updated: Partial<Step3Data>) => void;
  onSubmit: () => void;
  onPrevious: () => void;
  className?: string;
}

const PRICE_LISTING_UNITS = [
  { label: "Price Listing", value: "Price Listing" },
  { label: "Per Title", value: "Per Title" },
  { label: "Entire Bundle", value: "Entire Bundle" },
];

const GUARANTEE_PERIODS = [
  { label: "Month", value: "Month" },
  { label: "Quarter", value: "Quarter" },
  { label: "Year", value: "Year" },
];

const GUARANTEE_SCOPES = [
  { label: "Entire Bundle", value: "Entire Bundle" },
  { label: "Per Title", value: "Per Title" },
];

const Step3PaymentDetails = ({
  data,
  currency,
  isSubmitting,
  onChange,
  onSubmit,
  onPrevious,
  className = "",
}: Step3PaymentDetailsProps) => {
  const [errorMsg, setErrorMsg] = useState("");

  const currencySymbol = currency.startsWith("₹")
    ? "₹"
    : currency.startsWith("$")
      ? "$"
      : currency.startsWith("€")
        ? "€"
        : currency.startsWith("£")
          ? "£"
          : "₹";

  const currencyBadgeText = currency.includes("Indian Rupee")
    ? "₹ INR"
    : currency.includes("US Dollar")
      ? "$ USD"
      : currency.includes("Euro")
        ? "€ EUR"
        : currency.includes("British Pound")
          ? "£ GBP"
          : "₹ INR";

  const handleFlatRateAmountChange = (val: number) => {
    const amount = Math.max(0, val);
    const total = amount * 100;
    onChange({
      flatRateAmount: amount,
      totalAmount: total,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (data.pricingModel === "flat_rate") {
      if (!data.flatRateAmount || data.flatRateAmount <= 0) {
        setErrorMsg("Please specify a valid fixed offer amount.");
        return;
      }
    } else {
      if (
        data.transactionMinPrice <= 0 ||
        data.transactionMaxPrice < data.transactionMinPrice
      ) {
        setErrorMsg("Please specify a valid transaction price range.");
        return;
      }
      if (
        data.revenueSharePercentage <= 0 ||
        data.revenueSharePercentage > 100
      ) {
        setErrorMsg("Revenue share percentage must be between 1% and 100%.");
        return;
      }
    }

    setErrorMsg("");
    onSubmit();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={`w-full flex flex-col font-century select-none text-white ${className}`}
    >
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="unstyled"
          type="button"
          onClick={() => onChange({ pricingModel: "flat_rate" })}
          className={`flex items-center gap-2.5 px-6 py-2.5 rounded-[8px] transition cursor-pointer text-fs14 font-bold ${
            data.pricingModel === "flat_rate"
              ? "bg-[#162D4A] border border-[#00B4D8]/40 text-white shadow-md"
              : "border border-white/10 text-gray-400 hover:text-white"
          }`}
        >
          <span
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              data.pricingModel === "flat_rate"
                ? "border-[#FABE2C]"
                : "border-gray-500"
            }`}
          >
            {data.pricingModel === "flat_rate" && (
              <span className="w-2 h-2 rounded-full bg-[#FABE2C]" />
            )}
          </span>
          <span>By Flat Rate</span>
        </Button>

        <Button
          variant="unstyled"
          type="button"
          onClick={() => onChange({ pricingModel: "share_revenue" })}
          className={`flex items-center gap-2.5 px-6 py-2.5 rounded-[8px] transition cursor-pointer text-fs14 font-bold ${
            data.pricingModel === "share_revenue"
              ? "bg-[#162D4A] border border-[#00B4D8]/40 text-white shadow-md"
              : "border border-white/10 text-gray-400 hover:text-white"
          }`}
        >
          <span
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              data.pricingModel === "share_revenue"
                ? "border-[#FABE2C]"
                : "border-gray-500"
            }`}
          >
            {data.pricingModel === "share_revenue" && (
              <span className="w-2 h-2 rounded-full bg-[#FABE2C]" />
            )}
          </span>
          <span>By Share Revenue</span>
        </Button>
      </div>

      {data.pricingModel === "flat_rate" && (
        <div className="flex flex-col mb-6">
          <p className="text-fs14 text-white font-semibold mb-1">
            Select this if you wish to make a fixed price Offer.
          </p>
          <p className="text-fs13 text-[#A0AEC0] mb-6">
            Licence (Buyer) will pay Licensor (Seller) a fixed amount of:
          </p>

          <div className="flex items-center gap-4 max-[640px]:flex-col max-[640px]:items-stretch mb-8">
            <div className="flex items-center rounded-[8px] overflow-hidden bg-[#151D2A] border border-white/10 max-w-[280px] max-[640px]:max-w-full">
              <Input
                type="number"
                min="1"
                value={data.flatRateAmount || ""}
                onChange={(e) =>
                  handleFlatRateAmountChange(parseFloat(e.target.value) || 0)
                }
                className="w-full bg-transparent border-0 px-4 py-2.5 text-fs15 font-bold text-white focus:outline-none"
              />
              <span className="bg-[#FABE2C] text-black font-bold px-4 py-3 text-fs13 shrink-0">
                {currencyBadgeText}
              </span>
            </div>

            <span className="text-fs14 text-[#A0AEC0] font-medium shrink-0">
              for the/a
            </span>

            <div className="min-w-[200px]">
              <Select
                options={PRICE_LISTING_UNITS}
                value={data.priceListingUnit}
                onChange={(e) => onChange({ priceListingUnit: e.target.value })}
                className="bg-[#151D2A] border-white/10 rounded-[8px] h-11 text-fs14 font-medium"
              />
            </div>
          </div>

          <div className="w-full bg-[#151D2A] border border-white/10 rounded-[12px] p-8 text-center my-2 shadow-lg">
            <p className="text-fs13 text-[#A0AEC0] mb-3">
              Total Amount to be paid by Licensee (Buyer) is:
            </p>
            <h2 className="text-fs28 max-[1440px]:text-fs24 font-bold text-white tracking-tight">
              {currencySymbol}{" "}
              {(data.totalAmount || data.flatRateAmount * 100).toLocaleString(
                "en-IN",
                { minimumFractionDigits: 2, maximumFractionDigits: 2 },
              )}
            </h2>
          </div>
        </div>
      )}

      {data.pricingModel === "share_revenue" && (
        <div className="flex flex-col mb-6 gap-6">
          <div>
            <p className="text-fs14 text-white font-semibold mb-1">
              Select this if you wish to pay by sharing the transaction revenue
              earned.
            </p>
            <p className="text-fs13 text-[#A0AEC0] leading-relaxed">
              Select the Rights Types T-VOD and/or EST to enable this pricing
              model.
              <br />
              Licence (Buyer) will price the transactions according to the
              following range.
            </p>
          </div>

          <div className="flex items-center gap-3 max-[640px]:flex-wrap">
            <div className="w-32 bg-[#151D2A] border border-white/10 rounded-[8px] overflow-hidden">
              <Input
                type="number"
                min="0"
                value={data.transactionMinPrice || ""}
                onChange={(e) =>
                  onChange({
                    transactionMinPrice: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full bg-transparent border-0 px-3.5 py-2.5 text-fs14 text-white font-medium"
              />
            </div>

            <span className="text-fs14 text-gray-300">to</span>

            <div className="flex items-center rounded-[8px] overflow-hidden bg-[#151D2A] border border-white/10 w-44">
              <Input
                type="number"
                min="0"
                value={data.transactionMaxPrice || ""}
                onChange={(e) =>
                  onChange({
                    transactionMaxPrice: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full bg-transparent border-0 px-3.5 py-2.5 text-fs14 text-white font-medium"
              />
              <span className="bg-[#FABE2C] text-black font-bold px-3 py-2.5 text-fs13 shrink-0">
                {currencyBadgeText}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-fs14 text-white font-bold mb-1">
              per T-VOD transaction
            </span>
            <span className="text-fs12 text-[#A0AEC0] mb-2">
              Share of transaction revenue Licensee (Buyer) shall pay to
              Licensor (Seller):
            </span>
            <div className="flex items-center rounded-[8px] overflow-hidden bg-[#151D2A] border border-white/10 w-32">
              <Input
                type="number"
                min="1"
                max="100"
                value={data.revenueSharePercentage || ""}
                onChange={(e) =>
                  onChange({
                    revenueSharePercentage: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full bg-transparent border-0 px-3.5 py-2.5 text-fs14 text-white font-bold"
              />
              <span className="bg-[#FABE2C] text-black font-bold px-3 py-2.5 text-fs13 shrink-0">
                %
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-fs13 text-white font-semibold mb-2">
              The estimated monthly license fee by transaction revenue is
              between:
            </span>
            <div className="flex items-center gap-3 max-[640px]:flex-wrap">
              <div className="flex items-center rounded-[8px] overflow-hidden bg-[#151D2A] border border-white/10 w-48">
                <Input
                  type="number"
                  value={data.estimatedMonthlyMin || ""}
                  onChange={(e) =>
                    onChange({
                      estimatedMonthlyMin: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full bg-transparent border-0 px-3.5 py-2.5 text-fs14 text-white font-medium"
                />
                <span className="bg-[#FABE2C] text-black font-bold px-3 py-2.5 text-fs13 shrink-0">
                  {currencyBadgeText}
                </span>
              </div>

              <span className="text-fs14 text-gray-300">and</span>

              <div className="flex items-center rounded-[8px] overflow-hidden bg-[#151D2A] border border-white/10 w-48">
                <Input
                  type="number"
                  value={data.estimatedMonthlyMax || ""}
                  onChange={(e) =>
                    onChange({
                      estimatedMonthlyMax: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full bg-transparent border-0 px-3.5 py-2.5 text-fs14 text-white font-medium"
                />
                <span className="bg-[#FABE2C] text-black font-bold px-3 py-2.5 text-fs13 shrink-0">
                  {currencyBadgeText}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Checkbox
              checked={data.hasMinimumGuarantee}
              onChange={(val) => onChange({ hasMinimumGuarantee: val })}
              label="Licensee (Buyer) offers a Minimum Guarantee of"
            />

            {data.hasMinimumGuarantee && (
              <div className="flex items-center gap-3 max-[640px]:flex-wrap pl-6">
                <div className="flex items-center rounded-[8px] overflow-hidden bg-[#151D2A] border border-white/10 w-44">
                  <Input
                    type="number"
                    value={data.minimumGuaranteeAmount || ""}
                    onChange={(e) =>
                      onChange({
                        minimumGuaranteeAmount: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-transparent border-0 px-3.5 py-2.5 text-fs14 text-white font-medium"
                  />
                  <span className="bg-[#FABE2C] text-black font-bold px-3 py-2.5 text-fs13 shrink-0">
                    {currencyBadgeText}
                  </span>
                </div>

                <span className="text-fs14 text-gray-300">for the/a</span>

                <div className="w-36">
                  <Select
                    options={GUARANTEE_PERIODS}
                    value={data.minimumGuaranteePeriod}
                    onChange={(e) =>
                      onChange({ minimumGuaranteePeriod: e.target.value })
                    }
                    className="bg-[#151D2A] border-white/10 rounded-[8px] h-10 text-fs13 font-medium"
                  />
                </div>

                <span className="text-fs14 text-gray-300">for</span>

                <div className="w-44">
                  <Select
                    options={GUARANTEE_SCOPES}
                    value={data.minimumGuaranteeScope}
                    onChange={(e) =>
                      onChange({ minimumGuaranteeScope: e.target.value })
                    }
                    className="bg-[#151D2A] border-white/10 rounded-[8px] h-10 text-fs13 font-medium"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mb-4 text-fs13 text-red-400 font-medium">
          {errorMsg}
        </div>
      )}

      <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
        <Button
          variant="outline"
          type="button"
          onClick={onPrevious}
          disabled={isSubmitting}
          className="px-8 py-2.5 rounded-[8px] border border-[#FABE2C] text-[#FABE2C] hover:bg-[#FABE2C]/10 font-bold text-fs14 transition active:scale-95"
        >
          Previous
        </Button>

        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="px-8 py-2.5 rounded-[8px] bg-[#FABE2C] hover:bg-[#E5AD25] text-black font-bold text-fs14 transition active:scale-95 shadow-md"
        >
          Send an Offer
        </Button>
      </div>
    </form>
  );
};

export default Step3PaymentDetails;
