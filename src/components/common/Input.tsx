import { forwardRef, type InputHTMLAttributes } from "react";

export type InputVariant = "default" | "otp";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  hasError?: boolean;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      hasError = false,
      fullWidth = false,
      className = "",
      type = "text",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "bg-black/30 text-white focus:outline-none transition font-century select-none";

    const borderClass = hasError
      ? "border border-red-500 focus:border-red-400"
      : "border border-white/15 focus:border-[#FABE2C]";

    const variantClasses: Record<InputVariant, string> = {
      default:
        "h-[46px] sm:h-[48px] rounded-[10px] px-4 text-fs15 placeholder:text-[#888888]",
      otp:
        "w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-[10px] text-center text-fs26 font-bold select-all",
    };

    const widthClass = fullWidth && variant !== "otp" ? "w-full" : "";

    return (
      <input
        ref={ref}
        type={type}
        className={`${baseClasses} ${borderClass} ${variantClasses[variant]} ${widthClass} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
