import { useState } from "react";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";
import closeIcon from "../../../assets/images/Explore/close_Icon.png";
import {
  type FilterState,
  CONTENT_TYPE_OPTIONS,
  GENRE_OPTIONS,
  LANGUAGE_OPTIONS,
  FORMAT_OPTIONS,
  GENRE_NAME_TO_TMDB_ID,
} from "../filterConstants";

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
}

const FilterModal = ({
  isOpen,
  onClose,
  activeFilters,
  onApplyFilters,
}: FilterModalProps) => {
  const [draftFilters, setDraftFilters] = useState<FilterState>(activeFilters);

  if (!isOpen) return null;

  // Toggle item in a category
  const toggleItem = (category: keyof FilterState, item: string) => {
    setDraftFilters((prev) => {
      const current = prev[category];
      if (category === "genres") {
        const targetId = GENRE_NAME_TO_TMDB_ID[item];
        const isCurrentlySelected =
          current.includes(item) ||
          (targetId !== undefined &&
            current.some((g) => GENRE_NAME_TO_TMDB_ID[g] === targetId));

        return {
          ...prev,
          genres: isCurrentlySelected
            ? current.filter(
                (g) =>
                  g !== item &&
                  (targetId === undefined ||
                    GENRE_NAME_TO_TMDB_ID[g] !== targetId),
              )
            : [...current, item],
        };
      }

      const exists = current.includes(item);
      return {
        ...prev,
        [category]: exists
          ? current.filter((x) => x !== item)
          : [...current, item],
      };
    });
  };

  const handleClearAll = () => {
    setDraftFilters({
      contentTypes: [],
      genres: [],
      languages: [],
      formats: [],
    });
  };

  const handleApply = () => {
    onApplyFilters(draftFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none font-century animate-fadeIn">
      {/* Click outside to close */}
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-[#131A26] border border-white/15 rounded-[16px] shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/10 shrink-0">
          <h2 className="text-fs22 font-bold text-white tracking-tight">
            Filter
          </h2>
          <Button
            variant="ghost"
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition cursor-pointer"
            title="Close filter modal"
          >
            <Image
              src={closeIcon}
              alt="Close"
              className="w-3.5 h-3.5 object-contain"
            />
          </Button>
        </div>

        {/* Scrollable Filter Categories */}
        <div className="custom-scrollbar overflow-y-auto px-7 py-6 flex flex-col gap-6">
          {/* 1. ContentTypes */}
          <div className="flex flex-col gap-3">
            <h3 className="text-fs16 font-semibold text-white tracking-wide">
              ContentTypes
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {CONTENT_TYPE_OPTIONS.map((type) => {
                const isSelected = draftFilters.contentTypes.includes(type);
                return (
                  <Button
                    variant="ghost"
                    key={type}
                    type="button"
                    onClick={() => toggleItem("contentTypes", type)}
                    className={`px-4 py-1.5 rounded-[8px] text-fs14 font-medium transition cursor-pointer border ${
                      isSelected
                        ? "border-[#FABE2C] bg-[#FABE2C]/15 text-[#FABE2C] font-semibold shadow-[0_0_12px_rgba(250,190,44,0.2)]"
                        : "border-white/20 bg-transparent text-white/90 hover:border-white/40 hover:bg-white/5"
                    }`}
                  >
                    {type}
                  </Button>
                );
              })}
            </div>
            <div className="w-full border-b border-white/10 mt-1" />
          </div>

          {/* 2. Genres */}
          <div className="flex flex-col gap-3">
            <h3 className="text-fs16 font-semibold text-white tracking-wide">
              Genres
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {GENRE_OPTIONS.map((genre) => {
                const targetId = GENRE_NAME_TO_TMDB_ID[genre];
                const isSelected =
                  draftFilters.genres.includes(genre) ||
                  (targetId !== undefined &&
                    draftFilters.genres.some(
                      (g) => GENRE_NAME_TO_TMDB_ID[g] === targetId,
                    ));
                return (
                  <Button
                    variant="ghost"
                    key={genre}
                    type="button"
                    onClick={() => toggleItem("genres", genre)}
                    className={`px-4 py-1.5 rounded-[8px] text-fs14 font-medium transition cursor-pointer border ${
                      isSelected
                        ? "border-[#FABE2C] bg-[#FABE2C]/15 text-[#FABE2C] font-semibold shadow-[0_0_12px_rgba(250,190,44,0.2)]"
                        : "border-white/20 bg-transparent text-white/90 hover:border-white/40 hover:bg-white/5"
                    }`}
                  >
                    {genre}
                  </Button>
                );
              })}
            </div>
            <div className="w-full border-b border-white/10 mt-1" />
          </div>

          {/* 3. Languages */}
          <div className="flex flex-col gap-3">
            <h3 className="text-fs16 font-semibold text-white tracking-wide">
              Languages
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {LANGUAGE_OPTIONS.map((lang) => {
                const isSelected = draftFilters.languages.includes(lang);
                return (
                  <Button
                    variant="ghost"
                    key={lang}
                    type="button"
                    onClick={() => toggleItem("languages", lang)}
                    className={`px-4 py-1.5 rounded-[8px] text-fs14 font-medium transition cursor-pointer border ${
                      isSelected
                        ? "border-[#FABE2C] bg-[#FABE2C]/15 text-[#FABE2C] font-semibold shadow-[0_0_12px_rgba(250,190,44,0.2)]"
                        : "border-white/20 bg-transparent text-white/90 hover:border-white/40 hover:bg-white/5"
                    }`}
                  >
                    {lang}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* 4. Formats */}
          <div className="flex flex-col gap-3">
            <h3 className="text-fs16 font-semibold text-white tracking-wide">
              Formats
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {FORMAT_OPTIONS.map((format) => {
                const isSelected = draftFilters.formats.includes(format);
                return (
                  <Button
                    variant="ghost"
                    key={format}
                    type="button"
                    onClick={() => toggleItem("formats", format)}
                    className={`px-4 py-1.5 rounded-[8px] text-fs14 font-medium transition cursor-pointer border ${
                      isSelected
                        ? "border-[#FABE2C] bg-[#FABE2C]/15 text-[#FABE2C] font-semibold shadow-[0_0_12px_rgba(250,190,44,0.2)]"
                        : "border-white/20 bg-transparent text-white/90 hover:border-white/40 hover:bg-white/5"
                    }`}
                  >
                    {format}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-7 py-4 border-t border-white/10 bg-[#131A26] shrink-0">
          <Button
            variant="ghost"
            type="button"
            onClick={handleClearAll}
            className="px-5 py-2.5 rounded-[8px] border border-[#FF3B30] text-[#FF3B30] hover:bg-[#FF3B30]/10 font-bold text-fs14 transition cursor-pointer"
          >
            Clear All
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleApply}
            className="px-6 py-2.5 rounded-[8px] !bg-[#FABE2C] hover:!bg-[#e0a824] active:scale-95 text-black font-bold text-fs14 shadow-lg transition cursor-pointer h-auto"
          >
            Apply Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
