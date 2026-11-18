import {
  useState,
  useRef,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../../store/store";
import { registerAccount } from "../../store/authSlice";

// UI Components
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import Image from "../../components/common/Image";
import FormField from "../../components/common/FormField";
import Footer from "../../layout/layout-components/Footer";

// Constants & Validation
import {
  COUNTRIES,
  STATES_BY_COUNTRY,
  MOVIE_CATEGORIES,
} from "../../utils/constants";
import {
  validateCompanyName,
  validateAddress,
  validateCity,
  validateTaxId,
} from "../../utils/validation";

// Assets
import loginLogo from "../../assets/images/Login/loginLogo.png";
import Companylogo from "../../assets/images/Login/Companylogo.png";
import Camera_Icon from "../../assets/images/Login/Camera_Icon.png";
import Breadcrumb_Arrow from "../../assets/images/Login/Breadcrumb_Arrow.png";

export interface ProfileCompletionProps {
  role?: "Buyer" | "Seller";
}

const ProfileCompletion = ({ role: initialRole }: ProfileCompletionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Determine role: prop > draft > path
  const registrationDraft = useSelector(
    (state: RootState) => state.auth.registrationDraft,
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const fallbackRole: "Buyer" | "Seller" = location.pathname.includes("seller")
    ? "Seller"
    : "Buyer";
  const activeRole: "Buyer" | "Seller" =
    initialRole || registrationDraft?.role || fallbackRole;

  // Form field states
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [taxId, setTaxId] = useState("");
  const [category, setCategory] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Field error states (inline under respective form elements)
  const [companyNameError, setCompanyNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [stateError, setStateError] = useState("");
  const [taxIdError, setTaxIdError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Dynamic state options based on selected country
  const currentStateOptions = STATES_BY_COUNTRY[country] || [];

  // Handle country change: update country and reset state
  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setCountry(newCountry);
    setState("");
    if (countryError) setCountryError("");
    if (stateError) setStateError("");
  };

  // Image upload handler
  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setGeneralError("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    let hasAnyError = false;

    // Validate Company Name
    const companyRes = validateCompanyName(companyName);
    if (!companyRes.isValid) {
      setCompanyNameError(companyRes.error || "Company Name is required");
      hasAnyError = true;
    } else {
      setCompanyNameError("");
    }

    // Validate Address
    const addressRes = validateAddress(address);
    if (!addressRes.isValid) {
      setAddressError(addressRes.error || "Address is required");
      hasAnyError = true;
    } else {
      setAddressError("");
    }

    // Validate City
    const cityRes = validateCity(city);
    if (!cityRes.isValid) {
      setCityError(cityRes.error || "City is required");
      hasAnyError = true;
    } else {
      setCityError("");
    }

    // Validate Country
    if (!country.trim()) {
      setCountryError("Please select a country");
      hasAnyError = true;
    } else {
      setCountryError("");
    }

    // Validate State
    if (!state.trim()) {
      setStateError("Please select a state");
      hasAnyError = true;
    } else {
      setStateError("");
    }

    // Validate Tax ID
    const taxRes = validateTaxId(taxId);
    if (!taxRes.isValid) {
      setTaxIdError(taxRes.error || "TAX Identification Number is required");
      hasAnyError = true;
    } else {
      setTaxIdError("");
    }

    // Validate Category
    if (!category.trim()) {
      setCategoryError("Please select a category");
      hasAnyError = true;
    } else {
      setCategoryError("");
    }

    if (hasAnyError) {
      return;
    }

    // Ensure email is available from draft or prompt
    const verifiedEmail = registrationDraft?.email?.trim();
    if (!verifiedEmail) {
      setGeneralError(
        "Email verification required. Please restart from the login screen.",
      );
      toast.info("Please enter your email and complete verification first.");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      const actionResult = await dispatch(
        registerAccount({
          email: verifiedEmail,
          fullName: registrationDraft?.fullName || companyName.trim(),
          mobileNumber: registrationDraft?.mobileNumber || "",
          role: activeRole,
          companyName: companyName.trim(),
          address: address.trim(),
          city: city.trim(),
          country: country.trim(),
          state: state.trim(),
          taxId: taxId.trim(),
          category: category.trim(),
          profileImage: previewImage || "",
        }),
      );

      setIsSubmitting(false);

      if (registerAccount.fulfilled.match(actionResult)) {
        toast.success(
          `Account successfully created! Welcome to ZettaRights, ${companyName.trim()}!`,
        );
        navigate("/");
      } else {
        const errorMsg =
          (actionResult.payload as string) ||
          "Registration failed. Please make sure JSON server is running (npm run db).";
        setGeneralError(errorMsg);
      }
    } catch {
      setIsSubmitting(false);
      setGeneralError(
        "Could not connect to JSON Server at http://localhost:3001. Please run `npm run db`.",
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#111826] text-white font-century">
      {/* Header with ZettaRights Logo */}
      <header className="w-full px-12 max-[640px]:px-6 py-5 border-b border-white/10 bg-[#111826]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="inline-block">
            <Image
              src={loginLogo}
              alt="ZettaRights"
              className="h-10 max-[640px]:h-9 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="w-full max-w-7xl mx-auto px-12 max-[640px]:px-6 py-12 max-[640px]:py-8 flex-1">
        {/* Title and Breadcrumb Row */}
        <div className="flex items-center justify-between max-[640px]:flex-col max-[640px]:items-start gap-4 pb-6 border-b border-white/10">
          <h1 className="text-fs36 max-[640px]:text-fs32 font-bold text-white tracking-tight">
            {activeRole}
          </h1>

          <div className="flex items-center gap-2 text-fs14 font-medium">
            <Link
              to="/login"
              className="text-[#8E8E8E] hover:text-white transition"
            >
              Create new Account
            </Link>
            <Image
              src={Breadcrumb_Arrow}
              alt=">"
              className="w-2.5 h-auto opacity-70"
            />
            <span className="text-white font-semibold">{activeRole}</span>
          </div>
        </div>

        {/* Company Logo Upload Section */}
        <div className="mt-8 flex items-center gap-5">
          <div
            role="button"
            tabIndex={0}
            onClick={handleTriggerFileInput}
            className="relative group cursor-pointer"
            title="Click to upload logo"
          >
            <div className="w-28 h-28 max-[640px]:w-24 max-[640px]:h-24 rounded-2xl bg-[#F7D564] flex items-center justify-center overflow-hidden shadow-lg transition group-hover:opacity-95">
              <Image
                src={previewImage || Companylogo}
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Camera badge overlay */}
            <div className="absolute -bottom-1 -right-1 w-8 h-8 max-[640px]:w-7 max-[640px]:h-7 rounded-full bg-[#181F2C] border border-white/20 flex items-center justify-center shadow-md">
              <Image
                src={Camera_Icon}
                alt="Camera"
                className="w-4 h-4 max-[640px]:w-3.5 max-[640px]:h-3.5 object-contain"
              />
            </div>

            <Input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="text-white font-medium text-fs15 max-[640px]:text-fs14 leading-snug">
            <p>Upload Your</p>
            <p>Company Logo</p>
          </div>
        </div>

        {/* Profile Completion Form (2 Columns) */}
        <form onSubmit={handleSubmit} className="mt-10" noValidate>
          <div className="grid grid-cols-2 max-[768px]:grid-cols-1 gap-x-10 gap-y-7">
            {/* Col 1, Row 1: Company Name */}
            <FormField
              label="Company Name"
              htmlFor="companyName"
              error={companyNameError}
            >
              <Input
                id="companyName"
                name="companyName"
                maxLength={100}
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  if (companyNameError) setCompanyNameError("");
                }}
                placeholder={
                  activeRole === "Buyer"
                    ? "Moon Cinema"
                    : "Yazh Production Pvt Ltd"
                }
                hasError={Boolean(companyNameError)}
                fullWidth
                className="bg-[#181F2C] border-white/10"
              />
            </FormField>

            {/* Col 2, Row 1: Address */}
            <FormField label="Address" htmlFor="address" error={addressError}>
              <Input
                id="address"
                name="address"
                maxLength={150}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (addressError) setAddressError("");
                }}
                placeholder={
                  activeRole === "Buyer" ? "26, West Lane" : "30, New Street"
                }
                hasError={Boolean(addressError)}
                fullWidth
                className="bg-[#181F2C] border-white/10"
              />
            </FormField>

            {/* Col 1, Row 2: City */}
            <FormField label="City" htmlFor="city" error={cityError}>
              <Input
                id="city"
                name="city"
                maxLength={50}
                value={city}
                onChange={(e) => {
                  const lettersOnly = e.target.value
                    .replace(/[^a-zA-Z\s.-]/g, "")
                    .slice(0, 50);
                  setCity(lettersOnly);
                  if (cityError) setCityError("");
                }}
                placeholder="Chennai"
                hasError={Boolean(cityError)}
                fullWidth
                className="bg-[#181F2C] border-white/10"
              />
            </FormField>

            {/* Col 2, Row 2: State (Dynamic based on selected country) */}
            <FormField label="State" htmlFor="state" error={stateError}>
              <Select
                id="state"
                name="state"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  if (stateError) setStateError("");
                }}
                placeholder="Select State"
                options={currentStateOptions}
                hasError={Boolean(stateError)}
                fullWidth
                className="bg-[#181F2C] border-white/10"
              />
            </FormField>

            {/* Col 1, Row 3: Country */}
            <FormField label="Country" htmlFor="country" error={countryError}>
              <Select
                id="country"
                name="country"
                value={country}
                onChange={handleCountryChange}
                placeholder="Select Country"
                options={COUNTRIES}
                hasError={Boolean(countryError)}
                fullWidth
                className="bg-[#181F2C] border-white/10"
              />
            </FormField>

            {/* Col 2, Row 3: TAX Identification Number */}
            <FormField
              label="TAX Identification Number"
              htmlFor="taxId"
              error={taxIdError}
            >
              <Input
                id="taxId"
                name="taxId"
                maxLength={25}
                value={taxId}
                onChange={(e) => {
                  const alphanumeric = e.target.value
                    .replace(/[^a-zA-Z0-9\-/]/g, "")
                    .toUpperCase()
                    .slice(0, 25);
                  setTaxId(alphanumeric);
                  if (taxIdError) setTaxIdError("");
                }}
                placeholder={
                  activeRole === "Buyer" ? "YR4839843" : "WH82022831"
                }
                hasError={Boolean(taxIdError)}
                fullWidth
                className="bg-[#181F2C] border-white/10"
              />
            </FormField>

            {/* Col 1, Row 4: Category */}
            <FormField
              label="Category"
              htmlFor="category"
              error={categoryError}
            >
              <Select
                id="category"
                name="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (categoryError) setCategoryError("");
                }}
                placeholder="Category Name"
                options={MOVIE_CATEGORIES}
                hasError={Boolean(categoryError)}
                fullWidth
                className="bg-[#181F2C] border-white/10"
              />
            </FormField>
          </div>

          {/* Form-level Error Message */}
          {generalError && (
            <p className="text-red-400 text-fs14 font-medium font-century mt-6">
              {generalError}
            </p>
          )}

          {/* Bottom Right Save Button */}
          <div className="flex justify-end mt-12 mb-16">
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              className="px-10 py-3 text-fs15 font-semibold bg-[#FABE2C] text-black hover:bg-[#e0ab26] rounded-lg shadow-md"
            >
              Save
            </Button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfileCompletion;
