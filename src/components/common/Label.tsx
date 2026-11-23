import { type LabelHTMLAttributes, type ReactNode } from "react";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  required?: boolean;
}

const Label = ({
  children,
  required = false,
  className = "",
  ...props
}: LabelProps) => {
  return (
    <label
      className={`text-[#8A94A6] text-fs14 max-[1024px]:text-[14px] max-[640px]:text-[13px] font-medium mb-2.5 block font-century ${className}`}
      {...props}
    >
      {children}
      {required}
    </label>
  );
};

export default Label;
