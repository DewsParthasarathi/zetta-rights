import { forwardRef, type SelectHTMLAttributes } from "react";
import Image from "./Image";
import Down_Arrow from "../../assets/images/login/Down_Arrow.png";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  hasError?: boolean;
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder,
      hasError = false,
      fullWidth = false,
      className = "",
      value,
      onChange,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "h-[46px] sm:h-[48px] rounded-[10px] px-4 pr-10 text-fs15 font-century text-white bg-black/30 appearance-none transition focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const borderClass = hasError
      ? "border border-red-500 focus:border-red-400"
      : "border border-white/15 focus:border-[#FABE2C]";

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <div className={`relative ${widthClass}`}>
        <select
          ref={ref}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`${baseClasses} ${borderClass} ${widthClass} ${className} ${
            !value ? "text-[#888888]" : "text-white"
          }`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-[#1F1F1F] text-[#888888]">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-[#1F1F1F] text-white py-2"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          <Image src={Down_Arrow} alt="select" className="w-2.5 h-auto opacity-70" />
        </div>
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
