import {
  forwardRef,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";

export type InputVariant = "default" | "solid" | "otp" | "ghost" | "bare";

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
    const isSolid = variant === "solid";

    const baseClasses =
      "text-white focus:outline-none transition font-century select-none";

    const bgClass = isBareOrGhost
      ? "bg-transparent"
      : isSolid
        ? "bg-[#182232]"
        : "bg-black/30";

    const borderClass = hasError
      ? "border border-red-500 focus:border-red-400"
      : isBareOrGhost || isSolid
        ? "border-0"
        : "border border-white/70 focus:border-[#FABE2C]";

    const variantClasses: Record<InputVariant, string> = {
      default:
        "h-[42px] max-[640px]:h-[40px] max-[340px]:h-[38px] rounded-[6px] px-3.5 max-[340px]:px-2.5 text-fs15 max-[1024px]:text-[15px] max-[640px]:text-[14px] max-[340px]:text-[12px] placeholder:text-white/40 max-[340px]:placeholder:text-[12px]",
      solid:
        "h-[46px] max-[640px]:h-[42px] max-[340px]:h-[38px] py-2 rounded-lg px-5 max-[340px]:px-3 text-fs16 max-[1024px]:text-[15px] max-[640px]:text-[14px] max-[340px]:text-[13px] placeholder:text-[#8E8E8E] placeholder:font-normal max-[340px]:placeholder:text-[12px]",
      otp: "w-[15%] max-[340px]:w-[18%] aspect-square  rounded-[6px] text-center text-fs32 max-[1024px]:text-[24px] max-[640px]:text-[20px] max-[340px]:text-[18px] font-bold select-all",
      ghost:
        "bg-transparent border-0 p-0 text-fs14 max-[1024px]:text-[14px] max-[640px]:text-[13px] max-[340px]:text-[12px] placeholder:text-gray-400 focus:outline-none",
      bare: "bg-transparent border-0 p-0 focus:outline-none",
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
