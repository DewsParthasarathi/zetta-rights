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
      className={`text-[#8E8E8E] text-fs15 font-medium mb-2 block font-century ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default Label;
