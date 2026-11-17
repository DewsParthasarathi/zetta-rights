import { type ReactNode } from "react";

export interface RadioProps {
  name?: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: ReactNode;
  disabled?: boolean;
  className?: string;
}

const Radio = ({
  value,
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}: RadioProps) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  return (
    <label
      onClick={handleClick}
      className={`flex items-center gap-3 cursor-pointer select-none font-century ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <span
        className={`w-4 h-4 rounded-full border flex items-center justify-center transition ${
          checked ? "border-[#FABE2C]" : "border-[#666666]"
        }`}
      >
        {checked && <span className="w-2 h-2 rounded-full bg-[#FABE2C]" />}
      </span>
      <span className="text-white text-fs16 font-medium">{label}</span>
    </label>
  );
};

export default Radio;
