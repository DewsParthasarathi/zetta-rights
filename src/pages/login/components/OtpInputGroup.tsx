import type {
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  RefObject,
} from "react";
import Input from "../../../components/common/Input";

export interface OtpInputGroupProps {
  digits: string[];
  refs: RefObject<(HTMLInputElement | null)[]>;
  onChange: (index: number, e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: ClipboardEvent<HTMLInputElement>) => void;
  length?: number;
  hasError?: boolean;
  className?: string;
}

const OtpInputGroup = ({
  digits,
  refs,
  onChange,
  onKeyDown,
  onPaste,
  length = 4,
  hasError = false,
  className = "flex justify-start gap-5 max-[640px]:gap-3.5 py-3",
}: OtpInputGroupProps) => {
  return (
    <div className={className} onPaste={onPaste}>
      {Array.from({ length }).map((_, idx) => (
        <Input
          key={idx}
          ref={(el) => {
            if (refs.current) {
              refs.current[idx] = el;
            }
          }}
          variant="otp"
          hasError={hasError}
          inputMode="numeric"
          maxLength={1}
          value={digits[idx] || ""}
          onChange={(e) => onChange(idx, e)}
          onKeyDown={(e) => onKeyDown(idx, e)}
        />
      ))}
    </div>
  );
};

export default OtpInputGroup;
