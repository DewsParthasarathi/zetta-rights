import { type ReactNode } from "react";
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
    <div className={`space-y-1.5 select-none ${className}`}>
      <div className="flex items-start gap-3">
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          disabled={disabled}
          onClick={handleToggle}
          className={`w-4 h-4 rounded-[4px] border shrink-0 mt-0.5 flex items-center justify-center transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
            checked
              ? "bg-[#FABE2C] border-[#FABE2C]"
              : error
                ? "bg-black/30 border-red-500 hover:border-red-400"
                : "bg-black/30 border-white/20 hover:border-white/40"
          }`}
        >
          {checked && (
            <img
              src={checkIcon}
              alt="checked"
              className="w-2.5 h-2.5 brightness-0"
            />
          )}
        </button>

        {label && (
          <div
            onClick={handleToggle}
            className="text-fs14 text-[#8E8E8E] leading-relaxed cursor-pointer font-century"
          >
            {label}
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-fs13 font-medium font-century">
          {error}
        </p>
      )}
    </div>
  );
};

export default Checkbox;
