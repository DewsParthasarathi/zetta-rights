import { useState, useRef, useEffect } from "react";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import closeIcon from "../../../assets/images/MakeAnOffer/close_Icon.png";
import calenderIcon from "../../../assets/images/MakeAnOffer/calender_Icon.png";
import {
  formatDateDisplay,
  toInputDateFormat,
  parseInputDate,
  calculateEndDate,
  calculateDuration,
} from "../utils/offerDateUtils";

export interface Step1Data {
  includedCountries: string[];
  excludedCountries: string[];
  startDate: string;
  endDate: string;
  years: number;
  months: number;
}

export interface Step1LicenseRegionProps {
  data: Step1Data;
  onChange: (updated: Partial<Step1Data>) => void;
  onNext: () => void;
  className?: string;
}

const AVAILABLE_COUNTRIES = [
  "Global",
  "India",
  "United States",
  "United Kingdom",
  "Sri Lanka",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Singapore",
  "United Arab Emirates",
  "Malaysia",
];

const Step1LicenseRegion = ({
  data,
  onChange,
  onNext,
  className = "",
}: Step1LicenseRegionProps) => {
  const [includeSearch, setIncludeSearch] = useState("");
  const [isIncludeDropdownOpen, setIsIncludeDropdownOpen] = useState(false);
  const [excludeSearch, setExcludeSearch] = useState("");
  const [isExcludeDropdownOpen, setIsExcludeDropdownOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const includeRef = useRef<HTMLDivElement>(null);
  const excludeRef = useRef<HTMLDivElement>(null);
  const startDateInputRef = useRef<HTMLInputElement>(null);
  const endDateInputRef = useRef<HTMLInputElement>(null);

  const startDateObj = parseInputDate(data.startDate);
  const endDateObj = parseInputDate(data.endDate);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (includeRef.current && !includeRef.current.contains(target)) {
        setIsIncludeDropdownOpen(false);
      }
      if (excludeRef.current && !excludeRef.current.contains(target)) {
        setIsExcludeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const availableIncludedCountries = AVAILABLE_COUNTRIES.filter(
    (country) =>
      !data.excludedCountries.includes(country) &&
      country.toLowerCase().includes(includeSearch.toLowerCase()),
  );

  const availableExcludedCountries = AVAILABLE_COUNTRIES.filter(
    (country) =>
      country !== "Global" &&
      country.toLowerCase().includes(excludeSearch.toLowerCase()),
  );

  const handleSelectIncludedCountry = (country: string) => {
    if (!data.includedCountries.includes(country)) {
      onChange({ includedCountries: [...data.includedCountries, country] });
      setErrorMsg("");
    }
    setIncludeSearch("");
    setIsIncludeDropdownOpen(false);
  };

  const handleRemoveIncludedCountry = (country: string) => {
    onChange({
      includedCountries: data.includedCountries.filter((c) => c !== country),
    });
  };

  const handleClearAllIncluded = () => {
    onChange({ includedCountries: [] });
  };

  const handleSelectExcludedCountry = (country: string) => {
    if (!data.excludedCountries.includes(country)) {
      onChange({
        excludedCountries: [...data.excludedCountries, country],
        includedCountries: data.includedCountries.filter((c) => c !== country),
      });
    }
    setExcludeSearch("");
    setIsExcludeDropdownOpen(false);
  };

  const handleRemoveExcludedCountry = (country: string) => {
    onChange({
      excludedCountries: data.excludedCountries.filter((c) => c !== country),
    });
  };

  const handleClearAllExcluded = () => {
    onChange({ excludedCountries: [] });
  };

  const handleStartDateChange = (newDateStr: string) => {
    if (!newDateStr) return;
    const newStart = parseInputDate(newDateStr);
    const newEnd = calculateEndDate(newStart, data.years, data.months);
    onChange({
      startDate: newDateStr,
      endDate: toInputDateFormat(newEnd),
    });
  };

  const handleEndDateChange = (newDateStr: string) => {
    if (!newDateStr) return;
    const newEnd = parseInputDate(newDateStr);
    const start = parseInputDate(data.startDate);
    const duration = calculateDuration(start, newEnd);
    onChange({
      endDate: newDateStr,
      years: duration.years,
      months: duration.months,
    });
  };

  const handleYearsChange = (yearsVal: number) => {
    const validYears = Math.max(0, yearsVal);
    const newEnd = calculateEndDate(startDateObj, validYears, data.months);
    onChange({
      years: validYears,
      endDate: toInputDateFormat(newEnd),
    });
  };

  const handleMonthsChange = (monthsVal: number) => {
    const validMonths = Math.max(0, monthsVal);
    const newEnd = calculateEndDate(startDateObj, data.years, validMonths);
    onChange({
      months: validMonths,
      endDate: toInputDateFormat(newEnd),
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.includedCountries.length === 0) {
      setErrorMsg("Please select at least one licensing country or Global.");
      return;
    }

    if (endDateObj <= startDateObj) {
      setErrorMsg("End Date must be after Start Date.");
      return;
    }

    setErrorMsg("");
    onNext();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={`w-full flex flex-col font-century select-none text-white ${className}`}
    >
      <div className="mb-6">
        <div className="grid grid-cols-2 max-[1024px]:grid-cols-1 gap-8 items-end mb-2.5">
          <div>
            <h3 className="text-fs24 font-bold text-white mb-1.5 tracking-tight">
              License Region
            </h3>
            <p className="text-fs16 text-[#8E8E8E] leading-relaxed">
              Specify the countries you wish to license this content in. If you
              want Global rights, please select &quot;Global&quot;
            </p>
          </div>

          <div>
            <p className="text-fs16 text-[#8E8E8E] leading-relaxed">
              If you&apos;d like to exclude certain countries/regions, select
              them here. This is optional. Leave it blank if you simply.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 max-[1024px]:grid-cols-1 gap-8 mt-2">
          <div className="flex flex-col" ref={includeRef}>
            <div className="relative">
              <div
                onClick={() => {
                  setIsIncludeDropdownOpen((prev) => !prev);
                  setIsExcludeDropdownOpen(false);
                }}
                className="w-full bg-[#151D2A] border border-white/10 rounded-[8px] px-4 h-12 flex items-center justify-between cursor-pointer hover:border-white/20 transition"
              >
                <span className="text-[#64748B] text-fs14 font-normal">
                  Select Countries
                </span>
                <Button
                  variant="unstyled"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearAllIncluded();
                  }}
                  className="text-fs12 text-white hover:text-[#FABE2C] font-semibold cursor-pointer transition"
                >
                  Clear All
                </Button>
              </div>

              {isIncludeDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 z-30 bg-[#151D2A] border border-white/20 rounded-[8px] max-h-52 overflow-y-auto custom-scrollbar shadow-2xl py-1">
                  <div className="p-2 border-b border-white/10">
                    <Input
                      variant="bare"
                      type="text"
                      placeholder="Search country..."
                      value={includeSearch}
                      onChange={(e) => setIncludeSearch(e.target.value)}
                      className="w-full px-2 py-1 text-fs13 text-white placeholder:text-gray-500 bg-transparent border-0"
                    />
                  </div>
                  {availableIncludedCountries.length > 0 ? (
                    availableIncludedCountries.map((country) => (
                      <Button
                        key={country}
                        variant="unstyled"
                        type="button"
                        onClick={() => handleSelectIncludedCountry(country)}
                        className="w-full text-left px-4 py-2 text-fs13 text-white hover:bg-white/10 cursor-pointer flex items-center justify-between"
                      >
                        <span>{country}</span>
                        {data.includedCountries.includes(country) && (
                          <span className="text-[#FABE2C] font-bold">✓</span>
                        )}
                      </Button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-fs13 text-[#8E8E8E] text-center">
                      No available countries
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5 mt-3 min-h-[36px]">
              {data.includedCountries.map((country) => (
                <span
                  key={country}
                  className="inline-flex items-center gap-1 border border-[#FABE2C] bg-transparent text-[#FABE2C] text-fs16 font-bold px-1.5 py-1.5 rounded-[6px]"
                >
                  <span>{country}</span>
                  <Button
                    variant="unstyled"
                    type="button"
                    onClick={() => handleRemoveIncludedCountry(country)}
                    className="w-3.5 h-3.5 flex items-center justify-center hover:opacity-75 cursor-pointer"
                  >
                    <Image
                      src={closeIcon}
                      alt="Remove"
                      className="w-2.5 h-2.5 object-contain"
                    />
                  </Button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col" ref={excludeRef}>
            <div className="relative">
              <div
                onClick={() => {
                  setIsExcludeDropdownOpen((prev) => !prev);
                  setIsIncludeDropdownOpen(false);
                }}
                className="w-full bg-[#151D2A] border border-white/10 rounded-[8px] px-4 h-12 flex items-center justify-between cursor-pointer hover:border-white/20 transition"
              >
                <span className="text-[#64748B] text-fs14 font-normal">
                  Select Countries
                </span>
                <Button
                  variant="unstyled"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearAllExcluded();
                  }}
                  className="text-fs12 text-white hover:text-[#FABE2C] font-semibold cursor-pointer transition"
                >
                  Clear All
                </Button>
              </div>

              {isExcludeDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 z-30 bg-[#151D2A] border border-white/20 rounded-[8px] max-h-52 overflow-y-auto custom-scrollbar shadow-2xl py-1">
                  <div className="p-2 border-b border-white/10">
                    <Input
                      variant="bare"
                      type="text"
                      placeholder="Search country..."
                      value={excludeSearch}
                      onChange={(e) => setExcludeSearch(e.target.value)}
                      className="w-full px-2 py-1 text-fs13 text-white placeholder:text-gray-500 bg-transparent border-0"
                    />
                  </div>
                  {availableExcludedCountries.length > 0 ? (
                    availableExcludedCountries.map((country) => (
                      <Button
                        key={country}
                        variant="unstyled"
                        type="button"
                        onClick={() => handleSelectExcludedCountry(country)}
                        className="w-full text-left px-4 py-2 text-fs13 text-white hover:bg-white/10 cursor-pointer flex items-center justify-between"
                      >
                        <span>{country}</span>
                        {data.excludedCountries.includes(country) && (
                          <span className="text-[#FABE2C] font-bold">✓</span>
                        )}
                      </Button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-fs13 text-[#8E8E8E] text-center">
                      No countries found
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5 mt-3 min-h-[36px]">
              {data.excludedCountries.map((country) => (
                <span
                  key={country}
                  className="inline-flex items-center gap-1 border border-[#FABE2C] bg-transparent text-[#FABE2C] text-fs16 font-bold px-1.5 py-1.5 rounded-[6px]"
                >
                  <span>{country}</span>
                  <Button
                    variant="unstyled"
                    type="button"
                    onClick={() => handleRemoveExcludedCountry(country)}
                    className="w-3.5 h-3.5 flex items-center justify-center hover:opacity-75 cursor-pointer"
                  >
                    <Image
                      src={closeIcon}
                      alt="Remove"
                      className="w-2.5 h-2.5 object-contain"
                    />
                  </Button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pb-6 border-b border-white/5">
        <h3 className="text-fs24 font-bold text-white mb-5 tracking-tight">
          License Period
        </h3>

        <div className="grid grid-cols-2 max-[1024px]:grid-cols-1 gap-8 mb-4">
          <div className="flex flex-col">
            <label className="text-fs16 text-[#8E8E8E] mb-2 font-normal">
              Start Date
            </label>
            <div
              onClick={() => startDateInputRef.current?.showPicker?.()}
              className="relative w-full bg-[#151D2A] border border-white/10 rounded-[8px] px-4 h-12 flex items-center justify-between cursor-pointer hover:border-white/20 transition"
            >
              <span className="text-fs14 text-white font-medium">
                {formatDateDisplay(startDateObj)}
              </span>
              <Image
                src={calenderIcon}
                alt="Calendar"
                className="w-4 h-4 object-contain pointer-events-none opacity-80"
              />
              <Input
                ref={startDateInputRef}
                type="date"
                value={data.startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
                className="absolute inset-0 opacity-0 pointer-events-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-fs16 text-[#8E8E8E] mb-2 font-normal text-center">
                Years
              </label>
              <div className="w-full bg-[#151D2A] border border-white/10 rounded-[8px] h-12 flex items-center justify-center">
                <Input
                  variant="bare"
                  type="number"
                  min="0"
                  max="100"
                  value={data.years}
                  onChange={(e) =>
                    handleYearsChange(parseInt(e.target.value, 10) || 0)
                  }
                  className="w-full text-center text-fs14 font-medium text-white bg-transparent border-0"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-fs16 text-[#8E8E8E] mb-2 font-normal text-center">
                Months
              </label>
              <div className="w-full bg-[#151D2A] border border-white/10 rounded-[8px] h-12 flex items-center justify-center">
                <Input
                  variant="bare"
                  type="number"
                  min="0"
                  max="11"
                  value={data.months}
                  onChange={(e) =>
                    handleMonthsChange(parseInt(e.target.value, 10) || 0)
                  }
                  className="w-full text-center text-fs14 font-medium text-white bg-transparent border-0"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 max-[1024px]:grid-cols-1 gap-8">
          <div className="flex flex-col">
            <label className="text-fs16 text-[#8E8E8E] mb-2 font-normal">
              End Date
            </label>
            <div
              onClick={() => endDateInputRef.current?.showPicker?.()}
              className="relative w-full bg-[#151D2A] border border-white/10 rounded-[8px] px-4 h-12 flex items-center justify-between cursor-pointer hover:border-white/20 transition"
            >
              <span className="text-fs14 text-white font-medium">
                {formatDateDisplay(endDateObj)}
              </span>
              <Image
                src={calenderIcon}
                alt="Calendar"
                className="w-4 h-4 object-contain pointer-events-none opacity-80"
              />
              <Input
                ref={endDateInputRef}
                type="date"
                value={data.endDate}
                onChange={(e) => handleEndDateChange(e.target.value)}
                className="absolute inset-0 opacity-0 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-4 text-fs13 text-red-400 font-medium">
          {errorMsg}
        </div>
      )}

      <div className="flex items-center justify-end pt-8 mt-4">
        <Button
          variant="primary"
          type="submit"
          className="px-7 py-0.5 rounded-[8px] bg-[#FABE2C] hover:bg-[#E5AD25] text-black font-extrabold text-fs22 transition active:scale-95 shadow-md"
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default Step1LicenseRegion;
