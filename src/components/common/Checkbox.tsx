import { type ReactNode } from "react";
import Image from "./Image";
import Button from "./Button";
import checkIcon from "../../assets/images/login/checkIcon.png";

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  error?: string;
  className?: string;
}

const Checkbox = ({
  checked,
  onChange,
  label,
  disabled = false,
  error,
  className = "",
}: CheckboxProps) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className={`space-y-1 select-none ${className}`}>
      <div className="flex items-start gap-2.5">
        <Button
          variant="unstyled"
          type="button"
          role="checkbox"
          aria-checked={checked}
          disabled={disabled}
          onClick={handleToggle}
          className={`w-3.5 h-3.5 rounded-[3px] border shrink-0 mt-0.5 flex items-center justify-center transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
            checked
              ? "bg-[#FABE2C] border-[#FABE2C]"
              : error
                ? "bg-black/30 border-red-500 hover:border-red-400"
                : "bg-black/30 border-white/60 hover:border-white"
          }`}
        >
          {checked && (
            <Image
              src={checkIcon}
              alt="checked"
              className="w-2 h-2 brightness-0"
            />
          )}
        </Button>

        {label && (
          <div
            onClick={handleToggle}
            className="text-fs13 max-[1024px]:text-fs12 text-white leading-tight cursor-pointer font-century"
          >
            {label}
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-fs12 font-medium font-century pl-6">
          {error}
        </p>
      )}
    </div>
  );
};

export default Checkbox;
