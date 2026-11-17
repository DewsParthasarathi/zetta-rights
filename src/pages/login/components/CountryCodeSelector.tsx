import { useState, useRef, useEffect } from "react";
import Image from "../../../components/common/Image";
import Down_Arrow from "../../../assets/images/login/Down_Arrow.png";

// Flag images from assets
import flagIndia from "../../../assets/images/flags/icons8-india-48.png";
import flagCanada from "../../../assets/images/flags/icons8-canada-48.png";
import flagEngland from "../../../assets/images/flags/icons8-england-48.png";
import flagAustralia from "../../../assets/images/flags/icons8-australia-48.png";
import flagArgentina from "../../../assets/images/flags/icons8-argentina-48.png";
import flagChile from "../../../assets/images/flags/icons8-chile-48.png";
import flagColombia from "../../../assets/images/flags/icons8-colombia-48.png";
import flagPakistan from "../../../assets/images/flags/icons8-pakistan-48.png";
import flagSriLanka from "../../../assets/images/flags/icons8-sri-lanka-48.png";

export interface CountryCodeItem {
  code: string;
  label: string;
  flag: string;
  name?: string;
}

const DEFAULT_COUNTRY_CODES: CountryCodeItem[] = [
  { code: "+91", label: "IN", flag: flagIndia, name: "India" },
  { code: "+1", label: "CA", flag: flagCanada, name: "Canada" },
  { code: "+44", label: "UK", flag: flagEngland, name: "United Kingdom" },
  { code: "+61", label: "AU", flag: flagAustralia, name: "Australia" },
  { code: "+54", label: "AR", flag: flagArgentina, name: "Argentina" },
  { code: "+56", label: "CL", flag: flagChile, name: "Chile" },
  { code: "+57", label: "CO", flag: flagColombia, name: "Colombia" },
  { code: "+92", label: "PK", flag: flagPakistan, name: "Pakistan" },
  { code: "+94", label: "LK", flag: flagSriLanka, name: "Sri Lanka" },
];

export interface CountryCodeSelectorProps {
  selectedCode: string;
  onSelectCode: (code: string) => void;
  countries?: CountryCodeItem[];
  className?: string;
}

const CountryCodeSelector = ({
  selectedCode,
  onSelectCode,
  countries = DEFAULT_COUNTRY_CODES,
  className = "",
}: CountryCodeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry =
    countries.find((c) => c.code === selectedCode) || countries[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-[46px] px-3.5 bg-black/30 border border-white/15 rounded-[10px] flex items-center gap-2.5 text-white text-fs15 focus:border-[#FABE2C] focus:outline-none cursor-pointer transition select-none"
      >
        <Image
          src={selectedCountry.flag}
          alt={selectedCountry.label}
          className="w-5 h-5 object-contain rounded-xs"
        />
        <span className="font-medium text-white">{selectedCountry.code}</span>
        <Image
          src={Down_Arrow}
          alt="dropdown"
          className={`w-2.5 h-auto transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[52px] z-20 w-44 max-h-40 overflow-y-auto custom-scrollbar bg-[#1F1F1F] border border-[#383838] rounded-lg shadow-xl py-1">
          {countries.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => {
                onSelectCode(item.code);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-fs15 text-white hover:bg-[#2A2A2A] flex items-center gap-2.5 cursor-pointer transition"
            >
              <Image
                src={item.flag}
                alt={item.label}
                className="w-4 h-4 object-contain rounded-xs shrink-0"
              />
              <span className="font-medium">{item.code}</span>
              <span className="text-fs13 text-gray-400">({item.label})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryCodeSelector;
