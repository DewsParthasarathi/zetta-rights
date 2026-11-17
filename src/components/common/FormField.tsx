import { type ReactNode } from "react";
import Label from "./Label";

export interface FormFieldProps {
  label?: ReactNode;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: ReactNode;
  className?: string;
}

const FormField = ({
  label,
  htmlFor,
  required = false,
  error,
  helperText,
  children,
  className = "",
}: FormFieldProps) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      {children}
      {error && (
        <p className="text-red-400 text-fs13 mt-1.5 font-century font-medium">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="text-gray-400 text-fs13 mt-1.5 font-century font-normal">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default FormField;
