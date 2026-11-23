import { useState, useRef, useEffect } from "react";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import type { SelectOption } from "../../../components/common/Select";

import searchIcon from "../../../assets/images/Explore/search_Icon.png";
import filterIcon from "../../../assets/images/Explore/filter_Icon.png";
import downarrowIcon from "../../../assets/images/Explore/downarrow_Icon.png";
import closeIcon from "../../../assets/images/Explore/close_Icon.png";

export interface ExploreFiltersBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  contentType: string;
  onContentTypeChange: (type: string) => void;
  selectedYear: string;
  onYearChange: (year: string) => void;
  onOpenFilterModal: () => void;
  activeFilterCount?: number;
  className?: string;
}

const CONTENT_TYPE_OPTIONS: SelectOption[] = [
  { label: "All Content", value: "All Content" },
  { label: "Movies", value: "Movies" },
  { label: "Short Films", value: "Short Films" },
  { label: "Documentary", value: "Documentary" },
  { label: "Animation", value: "Animation" },
];

const YEAR_OPTIONS: SelectOption[] = [
  { label: "Release Year", value: "Release Year" },
  { label: "2026", value: "2026" },
  { label: "2025", value: "2025" },
  { label: "2024", value: "2024" },
  { label: "2023", value: "2023" },
  { label: "2022", value: "2022" },
  { label: "2021", value: "2021" },
  { label: "2020", value: "2020" },
  { label: "2019", value: "2019" },
  { label: "2018", value: "2018" },
  { label: "2015", value: "2015" },
  { label: "2010", value: "2010" },
];

const ExploreFiltersBar = ({
  searchQuery,
  onSearchChange,
  contentType,
  onContentTypeChange,
  selectedYear,
  onYearChange,
  onOpenFilterModal,
  activeFilterCount = 0,
  className = "",
}: ExploreFiltersBarProps) => {
  const [isContentTypeOpen, setIsContentTypeOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const contentTypeRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        contentTypeRef.current &&
        !contentTypeRef.current.contains(e.target as Node)
      ) {
        setIsContentTypeOpen(false);
      }
      if (yearRef.current && !yearRef.current.contains(e.target as Node)) {
        setIsYearOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div
      className={`flex flex-wrap items-center gap-3 w-full select-none ${className}`}
    >
      <div className="flex-1 min-w-[280px] max-[640px]:w-full flex items-center bg-[#141D2B] border border-white/10 hover:border-white/20 rounded-[8px] transition relative z-20">
        <div
          className="relative shrink-0 flex items-center"
          ref={contentTypeRef}
        >
          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              setIsContentTypeOpen((prev) => !prev);
              setIsYearOpen(false);
            }}
            className="pl-4 pr-3 py-2.5 text-[14px] max-[1440px]:text-[13px] max-[1024px]:text-[12px] text-white font-medium flex items-center gap-2 cursor-pointer hover:bg-white/5 transition h-auto select-none rounded-l-[8px]"
          >
            <span className="whitespace-nowrap">{contentType}</span>
            <Image
              src={downarrowIcon}
              alt=""
              className={`w-2.5 h-2.5 object-contain transition-transform duration-200 opacity-70 theme-icon ${
                isContentTypeOpen ? "rotate-180" : ""
              }`}
            />
          </Button>

          {isContentTypeOpen && (
            <div className="absolute top-[calc(100%+6px)] left-0 z-50 min-w-[170px] bg-[#141D2B] border border-white/15 rounded-[10px] shadow-2xl py-1.5 backdrop-blur-md">
              {CONTENT_TYPE_OPTIONS.map((opt) => {
                const isSelected = opt.value === contentType;
                return (
                  <Button
                    key={opt.value}
                    variant="ghost"
                    type="button"
                    onClick={() => {
                      onContentTypeChange(opt.value);
                      setIsContentTypeOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-[14px] max-[1440px]:text-[13px] transition flex items-center justify-between cursor-pointer h-auto ${
                      isSelected
                        ? "text-[#FABE2C] font-semibold bg-[#FABE2C]/10"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FABE2C]" />
                    )}
                  </Button>
                );
              })}
            </div>
          )}
        </div>

        <div className="w-px h-5 bg-white/15 shrink-0" />

        <div className="relative flex-1 flex items-center min-w-0">
          <Input
            variant="ghost"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Your Favorites Movies, Short Films...."
            className="w-full pl-4 pr-10 py-2.5 text-[14px] max-[1440px]:text-[13px] max-[1024px]:text-[12px] text-white placeholder:text-gray-400"
          />

          {searchQuery ? (
            <Button
              variant="ghost"
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition cursor-pointer"
              title="Clear search"
            >
              <Image
                src={closeIcon}
                alt="Clear"
                className="w-3 h-3 object-contain theme-icon"
              />
            </Button>
          ) : (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
              <Image
                src={searchIcon}
                alt="Search"
                className="w-4 h-4 object-contain theme-icon"
              />
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 flex items-center bg-[#141D2B] border border-white/10 hover:border-white/20 rounded-[8px] transition relative z-10">
        <Button
          variant="ghost"
          type="button"
          onClick={onOpenFilterModal}
          className={`flex items-center gap-2 pl-4 pr-3.5 py-2.5 text-[14px] max-[1440px]:text-[13px] font-medium transition cursor-pointer hover:bg-white/5 rounded-l-[8px] ${
            activeFilterCount > 0
              ? "text-[#FABE2C]"
              : "text-white/90 hover:text-white"
          }`}
          title="Open Filter Dialog"
        >
          <Image
            src={filterIcon}
            alt="Filter"
            className="w-3.5 h-3.5 object-contain theme-icon"
          />
          <span className="whitespace-nowrap">Filters By</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#FABE2C] text-black text-fs10 font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>

        <div className="w-px h-5 bg-white/15 shrink-0" />

        <div className="relative shrink-0 flex items-center" ref={yearRef}>
          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              setIsYearOpen((prev) => !prev);
              setIsContentTypeOpen(false);
            }}
            className="pl-3.5 pr-3 py-2.5 text-[14px] max-[1440px]:text-[13px] max-[1024px]:text-[12px] text-white font-medium flex items-center gap-2 cursor-pointer hover:bg-white/5 transition h-auto select-none rounded-r-[8px]"
          >
            <span className="whitespace-nowrap">{selectedYear}</span>
            <Image
              src={downarrowIcon}
              alt=""
              className={`w-2.5 h-2.5 object-contain transition-transform duration-200 opacity-70 theme-icon ${
                isYearOpen ? "rotate-180" : ""
              }`}
            />
          </Button>

          {isYearOpen && (
            <div className="absolute top-[calc(100%+6px)] right-0 z-50 min-w-[150px] max-h-60 overflow-y-auto custom-scrollbar bg-[#141D2B] border border-white/15 rounded-[10px] shadow-2xl py-1.5 backdrop-blur-md">
              {YEAR_OPTIONS.map((opt) => {
                const isSelected = opt.value === selectedYear;
                return (
                  <Button
                    key={opt.value}
                    variant="ghost"
                    type="button"
                    onClick={() => {
                      onYearChange(opt.value);
                      setIsYearOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-[14px] max-[1440px]:text-[13px] transition flex items-center justify-between cursor-pointer h-auto ${
                      isSelected
                        ? "text-[#FABE2C] font-semibold bg-[#FABE2C]/10"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FABE2C]" />
                    )}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreFiltersBar;
