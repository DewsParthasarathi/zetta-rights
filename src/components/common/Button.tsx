import { type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "outline"
  | "link"
  | "ghost"
  | "unstyled";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "lg",
  fullWidth = false,
  isLoading = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  const baseClasses =
    variant === "unstyled"
      ? "select-none cursor-pointer"
      : "font-semibold font-century transition select-none flex items-center justify-center cursor-pointer";

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "h-[34px] px-3 text-fs13 max-[1024px]:text-[12px] max-[640px]:text-[11px] rounded-[6px]",
    md: "h-[40px] px-4 text-fs14 max-[1024px]:text-[13px] max-[640px]:text-[12px] rounded-[6px]",
    lg: "h-[42px] max-[640px]:h-[40px] px-5 text-fs16 max-[1024px]:text-[15px] max-[640px]:text-[14px] rounded-[6px]",
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-[#FABE2C] hover:bg-[#E5AD25] text-black shadow-sm disabled:bg-[#FABE2C]/50 disabled:cursor-not-allowed",
    secondary:
      "bg-black/30 hover:bg-black/40 text-white border border-white/60 disabled:opacity-50 disabled:cursor-not-allowed",
    danger:
      "bg-red-600 hover:bg-red-700 text-white shadow-xs disabled:bg-red-600/50 disabled:cursor-not-allowed",
    outline:
      "bg-transparent border border-[#FABE2C] text-[#FABE2C] hover:bg-[#FABE2C]/10 disabled:opacity-50 disabled:cursor-not-allowed",
    link:
      "bg-transparent hover:underline text-white font-normal disabled:text-gray-500 disabled:no-underline disabled:cursor-not-allowed",
    ghost:
      "bg-transparent hover:bg-white/5 text-white disabled:opacity-50 disabled:cursor-not-allowed",
    unstyled:
      "disabled:opacity-40 disabled:cursor-not-allowed",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const isNoSize =
    variant === "link" || variant === "ghost" || variant === "unstyled";
  const appliedSizeClass = isNoSize ? "" : sizeClasses[size];

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${appliedSizeClass} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
