import {
  forwardRef,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";

export type InputVariant = "default" | "otp" | "ghost" | "bare";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  hasError?: boolean;
  fullWidth?: boolean;
  digitsOnly?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      hasError = false,
      fullWidth = false,
      digitsOnly = false,
      className = "",
      type = "text",
      onChange,
      onKeyDown,
      inputMode,
      pattern,
      ...props
    },
    ref,
  ) => {
    const isTelOrDigits = type === "tel" || digitsOnly;
    const isBareOrGhost = variant === "ghost" || variant === "bare";

    const baseClasses =
      "text-white focus:outline-none transition font-century select-none";

    const bgClass = isBareOrGhost ? "bg-transparent" : "bg-black/30";

    const borderClass = hasError
      ? "border border-red-500 focus:border-red-400"
      : isBareOrGhost
        ? ""
        : "border border-white/70 focus:border-[#FABE2C]";

    const variantClasses: Record<InputVariant, string> = {
      default:
        "h-[42px] max-[640px]:h-[40px] rounded-[6px] px-3.5 text-fs15 max-[1024px]:text-fs14 placeholder:text-white/40",
      otp:
        "w-[22%] aspect-square rounded-[6px] text-center text-fs22 max-[640px]:text-fs20 font-bold select-all",
      ghost:
        "bg-transparent border-0 p-0 text-fs14 placeholder:text-gray-400 focus:outline-none",
      bare:
        "bg-transparent border-0 p-0 focus:outline-none",
    };

    const widthClass = fullWidth && variant !== "otp" ? "w-full" : "";

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (isTelOrDigits) {
        const allowedKeys = [
          "Backspace",
          "Delete",
          "Tab",
          "Escape",
          "Enter",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "Home",
          "End",
        ];
        if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
          onKeyDown?.(e);
          return;
        }
        // Block non-digit keys
        if (!/^\d$/.test(e.key)) {
          e.preventDefault();
          return;
        }
      }
      onKeyDown?.(e);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (isTelOrDigits) {
        const clean = e.target.value.replace(/\D/g, "");
        if (clean !== e.target.value) {
          e.target.value = clean;
        }
      }
      onChange?.(e);
    };

    return (
      <input
        ref={ref}
        type={type}
        inputMode={inputMode || (isTelOrDigits ? "numeric" : undefined)}
        pattern={pattern || (isTelOrDigits ? "[0-9]*" : undefined)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={`${baseClasses} ${bgClass} ${borderClass} ${variantClasses[variant]} ${widthClass} ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
