import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Select, { type SelectOption } from "../../../components/common/Select";

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
  return (
    <div
      className={`flex flex-wrap items-center gap-3 w-full select-none ${className}`}
    >
      <div className="flex-1 min-w-[320px] max-[640px]:min-w-full flex items-center bg-[#141D2B] border border-white/10 hover:border-white/20 rounded-[8px] transition overflow-hidden">
        <div className="relative shrink-0 flex items-center">
          <Select
            variant="ghost"
            hideArrow
            options={CONTENT_TYPE_OPTIONS}
            value={contentType}
            onChange={(e) => onContentTypeChange(e.target.value)}
            className="pl-4 pr-7 py-2.5 text-fs14 max-[1440px]:text-fs13 text-white font-medium cursor-pointer"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-70">
            <Image
              src={downarrowIcon}
              alt=""
              className="w-2.5 h-2.5 object-contain"
            />
          </div>
        </div>

        <div className="w-px h-5 bg-white/15 shrink-0" />

        <div className="relative flex-1 flex items-center min-w-0">
          <Input
            variant="ghost"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Your Favorites Movies, Short Films...."
            className="w-full pl-4 pr-10 py-2.5 text-fs14 max-[1440px]:text-fs13 text-white placeholder:text-gray-400"
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
                className="w-3 h-3 object-contain"
              />
            </Button>
          ) : (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
              <Image
                src={searchIcon}
                alt="Search"
                className="w-4 h-4 object-contain"
              />
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 flex items-center bg-[#141D2B] border border-white/10 hover:border-white/20 rounded-[8px] transition overflow-hidden">
        <Button
          variant="ghost"
          type="button"
          onClick={onOpenFilterModal}
          className={`flex items-center gap-2 pl-4 pr-3.5 py-2.5 text-fs14 max-[1440px]:text-fs13 font-medium transition cursor-pointer hover:bg-white/5 ${
            activeFilterCount > 0
              ? "text-[#FABE2C]"
              : "text-white/90 hover:text-white"
          }`}
          title="Open Filter Dialog"
        >
          <Image
            src={filterIcon}
            alt="Filter"
            className="w-3.5 h-3.5 object-contain"
          />
          <span className="whitespace-nowrap">Filters By</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#FABE2C] text-black text-fs10 font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>

        <div className="w-px h-5 bg-white/15 shrink-0" />

        <div className="relative shrink-0 flex items-center">
          <Select
            variant="ghost"
            hideArrow
            options={YEAR_OPTIONS}
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="pl-3.5 pr-7 py-2.5 text-fs14 max-[1440px]:text-fs13 text-white font-medium cursor-pointer"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-70">
            <Image
              src={downarrowIcon}
              alt=""
              className="w-2.5 h-2.5 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreFiltersBar;
