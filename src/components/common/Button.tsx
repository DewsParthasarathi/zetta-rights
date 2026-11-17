import { type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "link" | "ghost";
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
    "font-semibold font-century transition select-none flex items-center justify-center cursor-pointer";

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "h-[36px] px-3 text-fs14 rounded-[8px]",
    md: "h-[44px] px-4 text-fs16 rounded-[10px]",
    lg: "h-[48px] px-5 text-fs18 rounded-[10px]",
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-[#FABE2C] hover:bg-[#E5AD25] text-black shadow-md disabled:bg-[#FABE2C]/50 disabled:cursor-not-allowed",
    secondary:
      "bg-black/30 hover:bg-black/40 text-white border border-white/15 disabled:opacity-50 disabled:cursor-not-allowed",
    danger:
      "bg-red-600 hover:bg-red-700 text-white shadow-xs disabled:bg-red-600/50 disabled:cursor-not-allowed",
    outline:
      "bg-transparent border border-[#FABE2C] text-[#FABE2C] hover:bg-[#FABE2C]/10 disabled:opacity-50 disabled:cursor-not-allowed",
    link:
      "bg-transparent hover:underline text-[#CCCCCC] hover:text-white p-0 h-auto font-normal disabled:text-gray-500 disabled:no-underline disabled:cursor-not-allowed",
    ghost:
      "bg-transparent hover:bg-white/5 text-white p-0 h-auto disabled:opacity-50 disabled:cursor-not-allowed",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const isLinkOrGhost = variant === "link" || variant === "ghost";
  const appliedSizeClass = isLinkOrGhost ? "" : sizeClasses[size];

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
            className="animate-spin h-5 w-5 text-current"
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
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
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
