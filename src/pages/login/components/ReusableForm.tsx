import type { ChangeEvent, FormEvent, ReactNode } from "react";
import Button, { type ButtonVariant } from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import FormField from "../../../components/common/FormField";
import Checkbox from "../../../components/common/Checkbox";
import Radio from "../../../components/common/Radio";
import Select from "../../../components/common/Select";

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormFieldConfig {
  id?: string;
  name: string;
  label?: ReactNode;
  type?:
    | "text"
    | "email"
    | "tel"
    | "password"
    | "number"
    | "checkbox"
    | "radio-group"
    | "select"
    | "custom";
  placeholder?: string;
  required?: boolean;
  value?: string | number;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onCheckboxChange?: (checked: boolean) => void;
  options?: FormFieldOption[];
  onRadioChange?: (value: string) => void;
  render?: () => ReactNode;
  className?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
  pattern?: string;
  digitsOnly?: boolean;
}

export interface ReusableFormProps {
  title: string;
  subtitle?: ReactNode;
  fields?: FormFieldConfig[];
  onSubmit: (e: FormEvent) => void;
  submitButtonText: string;
  submitButtonVariant?: ButtonVariant;
  isSubmitting?: boolean;
  isSubmitDisabled?: boolean;
  submitButtonClassName?: string;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const ReusableForm = ({
  title,
  subtitle,
  fields = [],
  onSubmit,
  submitButtonText,
  submitButtonVariant = "primary",
  isSubmitting = false,
  isSubmitDisabled = false,
  submitButtonClassName = "mt-4",
  children,
  footer,
  className = "space-y-4",
}: ReusableFormProps) => {
  return (
    <form onSubmit={onSubmit} className={className} noValidate>
      {/* Title & Subtitle Header */}
      <div className="space-y-0.5">
        <h1 className="text-fs34 max-[1440px]:text-fs32 max-[1024px]:text-fs28 max-[640px]:text-fs24 font-bold text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <div className="text-white text-fs16 max-[1024px]:text-fs14 font-normal mt-0.5">
            {subtitle}
          </div>
        )}
      </div>

      {/* Dynamic Form Content */}
      <div className="space-y-4">
        {fields.map((field) => {
          if (field.type === "custom" || field.render) {
            return (
              <div key={field.name}>
                {field.render ? field.render() : null}
              </div>
            );
          }

          if (field.type === "checkbox") {
            return (
              <Checkbox
                key={field.name}
                checked={field.checked || false}
                onChange={field.onCheckboxChange || (() => {})}
                label={field.label}
                error={field.error}
              />
            );
          }

          if (field.type === "select") {
            const selectElement = (
              <Select
                id={field.id || field.name}
                hasError={Boolean(field.error)}
                fullWidth
                value={field.value ?? ""}
                onChange={field.onSelectChange}
                placeholder={field.placeholder}
                options={field.options || []}
                className={field.className}
              />
            );

            if (field.label) {
              return (
                <FormField
                  key={field.name}
                  label={field.label}
                  htmlFor={field.id || field.name}
                  required={field.required}
                  error={field.error}
                  helperText={field.helperText}
                >
                  {selectElement}
                </FormField>
              );
            }

            return (
              <div key={field.name} className="w-full">
                {selectElement}
              </div>
            );
          }

          if (field.type === "radio-group") {
            return (
              <div key={field.name} className="flex items-center gap-6 py-1">
                {field.options?.map((opt) => (
                  <Radio
                    key={opt.value}
                    name={field.name}
                    value={opt.value}
                    checked={field.value === opt.value}
                    onChange={() => field.onRadioChange?.(opt.value)}
                    label={opt.label}
                  />
                ))}
              </div>
            );
          }

          const inputElement = (
            <Input
              id={field.id || field.name}
              type={field.type || "text"}
              hasError={Boolean(field.error)}
              fullWidth
              value={field.value ?? ""}
              onChange={field.onChange}
              placeholder={field.placeholder}
              className={field.className}
              maxLength={field.maxLength}
              digitsOnly={field.digitsOnly || field.type === "tel"}
              inputMode={field.inputMode}
              pattern={field.pattern}
            />
          );

          if (field.label) {
            return (
              <FormField
                key={field.name}
                label={field.label}
                htmlFor={field.id || field.name}
                required={field.required}
                error={field.error}
                helperText={field.helperText}
              >
                {inputElement}
              </FormField>
            );
          }

          return (
            <div key={field.name} className="w-full">
              {inputElement}
            </div>
          );
        })}

        {/* Optional Children slot */}
        {children}
      </div>

      {/* Action / Submit Button */}
      <Button
        type="submit"
        variant={submitButtonVariant}
        fullWidth
        isLoading={isSubmitting}
        disabled={isSubmitDisabled}
        className={submitButtonClassName}
      >
        {submitButtonText}
      </Button>

      {/* Footer Content */}
      {footer && <div className="text-center">{footer}</div>}
    </form>
  );
};

export default ReusableForm;
