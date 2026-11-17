export const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const FULL_NAME_REGEX = /^[a-zA-Z]+(?:[ '.-][a-zA-Z]+)*$/;

export const MOBILE_REGEX = /^\d{7,15}$/;

export const OTP_REGEX = /^\d{4}$/;

export const TAX_ID_REGEX = /^[A-Za-z0-9\-/\s]{4,25}$/;

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  const trimmed = email.trim();
  if (!trimmed) {
    return { isValid: false, error: "Email address is required" };
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return {
      isValid: false,
      error: "Please enter a valid email address (e.g. name@example.com)",
    };
  }
  return { isValid: true };
};

export const validateFullName = (name: string): ValidationResult => {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, error: "Full name is required" };
  }
  if (trimmed.length < 2) {
    return {
      isValid: false,
      error: "Full name must be at least 2 characters long",
    };
  }
  if (!FULL_NAME_REGEX.test(trimmed)) {
    return {
      isValid: false,
      error: "Full name can only contain letters, spaces, hyphens, and dots",
    };
  }
  return { isValid: true };
};

export const validateMobileNumber = (mobile: string): ValidationResult => {
  const trimmed = mobile.trim();
  if (!trimmed) {
    return { isValid: false, error: "Mobile number is required" };
  }
  if (!MOBILE_REGEX.test(trimmed)) {
    return {
      isValid: false,
      error: "Please enter a valid mobile number (7 to 15 digits)",
    };
  }
  return { isValid: true };
};

export const validateOtp = (otp: string): ValidationResult => {
  if (!otp) {
    return { isValid: false, error: "OTP is required" };
  }
  if (!OTP_REGEX.test(otp)) {
    return { isValid: false, error: "Please enter all 4 digits of the OTP" };
  }
  return { isValid: true };
};

export const validateTaxId = (taxId: string): ValidationResult => {
  const trimmed = taxId.trim();
  if (!trimmed) {
    return { isValid: false, error: "TAX Identification Number is required" };
  }
  if (!TAX_ID_REGEX.test(trimmed)) {
    return {
      isValid: false,
      error: "Please enter a valid TAX ID (min 4 characters, letters/digits)",
    };
  }
  return { isValid: true };
};

export const validateCompanyName = (name: string): ValidationResult => {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, error: "Company name is required" };
  }
  if (trimmed.length < 2) {
    return {
      isValid: false,
      error: "Company name must be at least 2 characters long",
    };
  }
  return { isValid: true };
};

export const validateAddress = (address: string): ValidationResult => {
  const trimmed = address.trim();
  if (!trimmed) {
    return { isValid: false, error: "Address is required" };
  }
  if (trimmed.length < 3) {
    return {
      isValid: false,
      error: "Address must be at least 3 characters long",
    };
  }
  return { isValid: true };
};

export const validateCity = (city: string): ValidationResult => {
  const trimmed = city.trim();
  if (!trimmed) {
    return { isValid: false, error: "City is required" };
  }
  if (trimmed.length < 2) {
    return {
      isValid: false,
      error: "City must be at least 2 characters long",
    };
  }
  return { isValid: true };
};

const validation = {
  EMAIL_REGEX,
  FULL_NAME_REGEX,
  MOBILE_REGEX,
  OTP_REGEX,
  TAX_ID_REGEX,
  validateEmail,
  validateFullName,
  validateMobileNumber,
  validateOtp,
  validateTaxId,
  validateCompanyName,
  validateAddress,
  validateCity,
};

export default validation;
