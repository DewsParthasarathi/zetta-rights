import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";
import backarrowIcon from "../../../assets/images/Explore/backarrow_Icon.png";
import nextarrowIcon from "../../../assets/images/Explore/nextarrow_Icon.png";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav
      className={`flex items-center justify-start gap-2 select-none font-century ${className}`}
      aria-label="Pagination"
    >
      <Button
        variant="unstyled"
        type="button"
        onClick={handlePrev}
        disabled={currentPage <= 1}
        className={`w-9 h-9 rounded-[8px] flex items-center justify-center transition border ${
          currentPage <= 1
            ? "border-white/5 opacity-30 cursor-not-allowed bg-black/20"
            : "border-white/10 hover:border-[#FABE2C] hover:bg-white/10 cursor-pointer bg-[#18202F]"
        }`}
        title="Previous page"
      >
        <Image
          src={backarrowIcon}
          alt="Previous"
          className="w-3.5 h-3.5 object-contain"
        />
      </Button>

      {getPageNumbers().map((page, index) => {
        if (typeof page === "string") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="w-9 h-9 flex items-center justify-center text-gray-400 text-[14px] max-[1440px]:text-[13px] max-[1024px]:text-[12px]  font-semibold"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <Button
            variant="unstyled"
            key={`page-${page}`}
            type="button"
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 rounded-[8px] text-fs23 max-[1440px]:text-[13px] max-[1024px]:text-[12px]  font-bold transition cursor-pointer flex items-center justify-center ${
              isActive
                ? "bg-[#FABE2C] text-black shadow-[0_4px_12px_rgba(250,190,44,0.35)]"
                : "bg-[#18202F] border border-white/10 text-white/85 hover:border-white/30 hover:text-white"
            }`}
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="unstyled"
        type="button"
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className={`w-9 h-9 rounded-[8px] flex items-center justify-center transition border ${
          currentPage >= totalPages
            ? "border-white/5 opacity-30 cursor-not-allowed bg-black/20"
            : "border-white/10 hover:border-[#FABE2C] hover:bg-white/10 cursor-pointer bg-[#18202F]"
        }`}
        title="Next page"
      >
        <Image
          src={nextarrowIcon}
          alt="Next"
          className="w-3.5 h-3.5 object-contain"
        />
      </Button>
    </nav>
  );
};

export default Pagination;
