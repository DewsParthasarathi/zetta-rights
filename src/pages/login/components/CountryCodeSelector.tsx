import { useState, useRef, useEffect } from "react";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";
import Down_Arrow from "../../../assets/images/login/Down_Arrow.png";

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
  { code: "+65", label: "SG", flag: flagIndia, name: "Singapore" },
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
      <Button
        variant="ghost"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-[42px] max-[640px]:h-[40px] max-[340px]:h-[38px] px-3 max-[360px]:px-2 max-[340px]:px-1.5 bg-black/30 border border-white/70 rounded-[6px] flex items-center gap-2 max-[360px]:gap-1.5 max-[340px]:gap-1 text-white text-fs14 max-[1024px]:text-[14px] max-[340px]:text-[12px] focus:border-[#FABE2C] focus:outline-none cursor-pointer transition select-none shrink-0"
      >
        <Image
          src={selectedCountry.flag}
          alt={selectedCountry.label}
          className="w-4 h-4 max-[340px]:w-3.5 max-[340px]:h-3.5 object-contain rounded-xs"
        />
        <span className="font-medium text-white text-fs14 max-[1024px]:text-[14px] max-[340px]:text-[12px]">
          {selectedCountry.code}
        </span>
        <Image
          src={Down_Arrow}
          alt="dropdown"
          className={`w-2 max-[340px]:w-1.5 h-auto opacity-80 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 z-20 w-44 max-h-40 overflow-y-auto custom-scrollbar bg-[#1F1F1F] border border-[#383838] rounded-[6px] shadow-xl py-1">
          {countries.map((item) => (
            <Button
              variant="ghost"
              key={item.code}
              type="button"
              onClick={() => {
                onSelectCode(item.code);
                setIsOpen(false);
              }}
              className="w-full px-3 py-1.5 text-left text-fs14 max-[1024px]:text-[14px] text-white hover:bg-[#2A2A2A] flex items-center gap-2 cursor-pointer transition justify-start"
            >
              <Image
                src={item.flag}
                alt={item.label}
                className="w-3.5 h-3.5 object-contain rounded-xs shrink-0"
              />
              <span className="font-medium">{item.code}</span>
              <span className="text-fs12 max-[1024px]:text-[12px] text-gray-400">({item.label})</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryCodeSelector;
