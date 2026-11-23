import { forwardRef, type SelectHTMLAttributes } from "react";

export type SelectVariant = "default" | "solid" | "ghost" | "bare";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  hasError?: boolean;
  fullWidth?: boolean;
  hideArrow?: boolean;
  variant?: SelectVariant;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder,
      hasError = false,
      fullWidth = false,
      hideArrow = false,
      variant = "default",
      className = "",
      value,
      onChange,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const isBareOrGhost = variant === "ghost" || variant === "bare";
    const isSolid = variant === "solid";

    const baseClasses = isBareOrGhost
      ? "appearance-none bg-transparent focus:outline-none cursor-pointer transition font-century text-white disabled:opacity-50 disabled:cursor-not-allowed"
      : isSolid
        ? "h-[46px] max-[640px]:h-[42px] py-2 rounded-lg px-5 pr-12 text-fs16 max-[1024px]:text-[15px] max-[640px]:text-[14px] font-century text-white bg-[#182232] appearance-none transition focus:outline-none cursor-pointer border-0 disabled:opacity-50 disabled:cursor-not-allowed"
        : "h-[42px] max-[640px]:h-[40px] rounded-[6px] px-3.5 pr-10 text-fs15 max-[1024px]:text-[15px] max-[640px]:text-[14px] font-century text-white bg-black/30 appearance-none transition focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const borderClass = hasError
      ? "border border-red-500 focus:border-red-400"
      : isBareOrGhost || isSolid
        ? ""
        : "border border-white/70 focus:border-[#FABE2C]";

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <div className={`relative ${widthClass}`}>
        <select
          ref={ref}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`${baseClasses} ${borderClass} ${widthClass} ${className} ${
            !value ? "text-[#8E8E8E]" : "text-white"
          }`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-[#182232] text-[#8E8E8E]">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-[#182232] text-white py-2"
            >
              {opt.label}
            </option>
          ))}
        </select>
        {!hideArrow && !isBareOrGhost && (
          <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
