import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../../store/store";
import {
  registerAccount,
  updateUserProfile,
} from "../../store/slices/authSlice";
import { toggleFavorite } from "../../store/slices/movieSlice";
import api from "../../utils/api";

import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import Image from "../../components/common/Image";
import FormField from "../../components/common/FormField";
import Footer from "../../layout/layout-components/Footer";

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

import loginLogo from "../../assets/images/Home/Header/logo.png";
import logo_light from "../../assets/images/Home/Footer/footer_Logo_light.png";
import Companylogo from "../../assets/images/Login/Companylogo.png";
import Camera_Icon from "../../assets/images/Login/Camera_Icon.png";
import Breadcrumb_Arrow from "../../assets/images/Login/Breadcrumb_Arrow.png";
import lightMode_Icon from "../../assets/images/Home/Header/lightMode_Icon.png";
import moon_Icon from "../../assets/images/Home/Header/moon.png";

export interface ProfileCompletionProps {
  role?: "Buyer" | "Seller";
}

const ProfileCompletion = ({ role: initialRole }: ProfileCompletionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const [isThemeLight, setIsThemeLight] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  const toggleTheme = () => {
    const nextTheme = isThemeLight ? "dark" : "light";
    setIsThemeLight(!isThemeLight);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.classList.toggle("light", nextTheme === "light");
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.dispatchEvent(new Event("themechange"));
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const registrationDraft = useSelector(
    (state: RootState) => state.auth.registrationDraft,
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const fallbackRole: "Buyer" | "Seller" = location.pathname.includes("seller")
    ? "Seller"
    : "Buyer";
  const activeRole: "Buyer" | "Seller" =
    initialRole || registrationDraft?.role || currentUser?.role || fallbackRole;

  const [companyName, setCompanyName] = useState(
    currentUser?.companyName || "",
  );
  const [address, setAddress] = useState(currentUser?.address || "");
  const [city, setCity] = useState(currentUser?.city || "");
  const [country, setCountry] = useState(currentUser?.country || "India");
  const [state, setState] = useState(currentUser?.state || "Tamilnadu");
  const [taxId, setTaxId] = useState(currentUser?.taxId || "");
  const [category, setCategory] = useState(currentUser?.category || "");
  const [previewImage, setPreviewImage] = useState<string | null>(
    currentUser?.profileImage || null,
  );

  const [companyNameError, setCompanyNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [stateError, setStateError] = useState("");
  const [taxIdError, setTaxIdError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStateOptions = STATES_BY_COUNTRY[country] || [];

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setCountry(newCountry);
    setState("");
    if (countryError) setCountryError("");
    if (stateError) setStateError("");
  };

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

  const handleSuccessfulNavigation = () => {
    if (
      location.state?.intendedAction === "like_movie" &&
      location.state?.movieId
    ) {
      dispatch(toggleFavorite(location.state.movieId));
      toast.success("Added movie to your favorites!");
    }

    const redirectTarget = location.state?.from;
    if (redirectTarget) {
      if (typeof redirectTarget === "string") {
        navigate(redirectTarget, { replace: true });
      } else if (redirectTarget.pathname) {
        navigate(redirectTarget.pathname, {
          state: redirectTarget.state,
          replace: true,
        });
      } else {
        navigate("/", { replace: true });
      }
    } else {
      navigate("/", { replace: true });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    let hasAnyError = false;

    const companyRes = validateCompanyName(companyName);
    if (!companyRes.isValid) {
      setCompanyNameError(companyRes.error || "Company Name is required");
      hasAnyError = true;
    } else {
      setCompanyNameError("");
    }

    const addressRes = validateAddress(address);
    if (!addressRes.isValid) {
      setAddressError(addressRes.error || "Address is required");
      hasAnyError = true;
    } else {
      setAddressError("");
    }

    const cityRes = validateCity(city);
    if (!cityRes.isValid) {
      setCityError(cityRes.error || "City is required");
      hasAnyError = true;
    } else {
      setCityError("");
    }

    if (!country.trim()) {
      setCountryError("Please select a country");
      hasAnyError = true;
    } else {
      setCountryError("");
    }

    if (!state.trim()) {
      setStateError("Please select a state");
      hasAnyError = true;
    } else {
      setStateError("");
    }

    const taxRes = validateTaxId(taxId);
    if (!taxRes.isValid) {
      setTaxIdError(taxRes.error || "TAX Identification Number is required");
      hasAnyError = true;
    } else {
      setTaxIdError("");
    }

    if (!category.trim()) {
      setCategoryError("Please select a category");
      hasAnyError = true;
    } else {
      setCategoryError("");
    }

    if (hasAnyError) {
      return;
    }

    const finalProfileImage = previewImage || Companylogo;
    const enteredName =
      registrationDraft?.fullName?.trim() ||
      registrationDraft?.name?.trim() ||
      currentUser?.fullName?.trim() ||
      currentUser?.name?.trim() ||
      companyName.trim();

    if (isAuthenticated && currentUser) {
      setIsSubmitting(true);
      try {
        const endpoint =
          (activeRole === "Buyer" ? "/buyers" : "/sellers") +
          `/${currentUser.id}`;
        await api.patch(endpoint, {
          fullName: enteredName,
          name: enteredName,
          companyName: companyName.trim(),
          address: address.trim(),
          city: city.trim(),
          country: country.trim(),
          state: state.trim(),
          taxId: taxId.trim(),
          category: category.trim(),
          profileImage: finalProfileImage,
        });
        dispatch(
          updateUserProfile({
            fullName: enteredName,
            name: enteredName,
            companyName: companyName.trim(),
            address: address.trim(),
            city: city.trim(),
            country: country.trim(),
            state: state.trim(),
            taxId: taxId.trim(),
            category: category.trim(),
            profileImage: finalProfileImage,
          }),
        );
        setIsSubmitting(false);
        toast.success("Profile updated successfully!");
        handleSuccessfulNavigation();
        return;
      } catch {
        dispatch(
          updateUserProfile({
            fullName: enteredName,
            name: enteredName,
            companyName: companyName.trim(),
            address: address.trim(),
            city: city.trim(),
            country: country.trim(),
            state: state.trim(),
            taxId: taxId.trim(),
            category: category.trim(),
            profileImage: finalProfileImage,
          }),
        );
        setIsSubmitting(false);
        toast.success("Profile updated successfully!");
        handleSuccessfulNavigation();
        return;
      }
    }

    const verifiedEmail =
      registrationDraft?.email?.trim() ||
      currentUser?.email?.trim() ||
      `user${Math.floor(10000 + Math.random() * 90000)}@zetarights.com`;

    setIsSubmitting(true);

    try {
      const actionResult = await dispatch(
        registerAccount({
          email: verifiedEmail,
          fullName: enteredName,
          name: enteredName,
          mobileNumber:
            registrationDraft?.mobileNumber || currentUser?.mobileNumber || "",
          role: activeRole,
          companyName: companyName.trim(),
          address: address.trim(),
          city: city.trim(),
          country: country.trim(),
          state: state.trim(),
          taxId: taxId.trim(),
          category: category.trim(),
          profileImage: finalProfileImage,
        }),
      );

      setIsSubmitting(false);

      if (registerAccount.fulfilled.match(actionResult)) {
        toast.success(
          `Account successfully created! Welcome to ZettaRights, ${companyName.trim()}!`,
        );
        handleSuccessfulNavigation();
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
      <header className="w-full px-12 max-[1024px]:px-4 max-[768px]:px-3 max-[480px]:px-2.5 py-5 bg-[#111826]">
        <div className="w-[93%] max-[1024px]:w-[96%] max-[768px]:w-[98%] max-[480px]:w-full mx-auto flex items-center justify-between">
          <Link to="/" className="shrink-0 flex items-center">
            <Image
              src={loginLogo}
              alt="ZettaRights"
              className="h-9 max-[640px]:h-8 w-auto object-contain cursor-pointer navbar-logo-dark"
            />
            <Image
              src={logo_light}
              alt="ZettaRights"
              className="h-9 max-[640px]:h-8 w-auto object-contain cursor-pointer navbar-logo-light"
            />
          </Link>

          <Button
            variant="unstyled"
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition cursor-pointer"
          >
            <Image
              src={isThemeLight ? moon_Icon : lightMode_Icon}
              alt="Toggle Theme"
              className="w-4 h-4 object-contain opacity-90 hover:opacity-100 theme-icon"
            />
          </Button>
        </div>
      </header>

      <main className="w-[93%] max-[1024px]:w-[96%] max-[768px]:w-[98%] max-[480px]:w-full mx-auto px-12 max-[1024px]:px-4 max-[768px]:px-3 max-[480px]:px-2.5 py-6 max-[640px]:py-8 flex-1">
        <div className="flex items-center justify-between max-[640px]:flex-col max-[640px]:items-start gap-4 pb-6 border-b border-white/10">
          <h1 className="text-fs32 max-[1440px]:text-fs28 max-[640px]:text-[20px] font-bold text-white tracking-tight">
            {activeRole}
          </h1>

          <div className="flex items-center gap-2 text-[14px] text-[#8E8E8E] max-[640px]:text-[12px]">
            <Link
              to="/auth"
              className="text-[#8E8E8E] hover:text-white transition"
            >
              Create new Account
            </Link>
            <Image
              src={Breadcrumb_Arrow}
              alt=">"
              className="w-1.5 h-auto opacity-70 theme-icon"
            />
            <span className="text-white font-bold">{activeRole}</span>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-5">
          <div
            role="button"
            tabIndex={0}
            onClick={handleTriggerFileInput}
            className="relative group cursor-pointer"
            title="Click to upload logo"
          >
            <div className="w-23 h-23 max-[640px]:w-24 max-[640px]:h-24 rounded-[10px] bg-[#F7D564] flex items-center justify-center overflow-hidden shadow-lg transition group-hover:opacity-95">
              <Image
                src={previewImage || Companylogo}
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute bottom-2 right-2 w-7 h-7 rounded-md bg-[#182232] border border-white/20 flex items-center justify-center shadow">
              <Image
                src={Camera_Icon}
                alt="Camera"
                className="w-3.5 h-3.5 object-contain theme-icon"
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

          <div className="text-white font-medium text-[17px] max-[1024px]:text-[15px] max-[640px]:text-[14px] max-[340px]:text-[13px] leading-snug">
            <p>Upload Your</p>
            <p>Company Logo</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-12" noValidate>
          <div className="grid grid-cols-2 max-[768px]:grid-cols-1 gap-x-12 gap-y-8 max-[1024px]:gap-x-8 max-[1024px]:gap-y-6 max-[340px]:gap-y-4">
            <FormField
              label="Company Name"
              htmlFor="companyName"
              error={companyNameError}
            >
              <Input
                id="companyName"
                name="companyName"
                variant="solid"
                maxLength={100}
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  if (companyNameError) setCompanyNameError("");
                }}
                placeholder="Yazh Production Pvt Ltd"
                hasError={Boolean(companyNameError)}
                fullWidth
              />
            </FormField>

            <FormField label="Address" htmlFor="address" error={addressError}>
              <Input
                id="address"
                name="address"
                variant="solid"
                maxLength={150}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (addressError) setAddressError("");
                }}
                placeholder="30, New Street"
                hasError={Boolean(addressError)}
                fullWidth
              />
            </FormField>

            <FormField label="City" htmlFor="city" error={cityError}>
              <Input
                id="city"
                name="city"
                variant="solid"
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
              />
            </FormField>

            <FormField label="State" htmlFor="state" error={stateError}>
              <Select
                id="state"
                name="state"
                variant="solid"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  if (stateError) setStateError("");
                }}
                placeholder="Select State"
                options={currentStateOptions}
                hasError={Boolean(stateError)}
                fullWidth
              />
            </FormField>

            <FormField label="Country" htmlFor="country" error={countryError}>
              <Select
                id="country"
                name="country"
                variant="solid"
                value={country}
                onChange={handleCountryChange}
                placeholder="Select Country"
                options={COUNTRIES}
                hasError={Boolean(countryError)}
                fullWidth
              />
            </FormField>

            <FormField
              label="TAX Identification Number"
              htmlFor="taxId"
              error={taxIdError}
            >
              <Input
                id="taxId"
                name="taxId"
                variant="solid"
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
                placeholder="WH82022831"
                hasError={Boolean(taxIdError)}
                fullWidth
              />
            </FormField>

            <FormField
              label="Category"
              htmlFor="category"
              error={categoryError}
            >
              <Select
                id="category"
                name="category"
                variant="solid"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (categoryError) setCategoryError("");
                }}
                placeholder="Category Name"
                options={MOVIE_CATEGORIES}
                hasError={Boolean(categoryError)}
                fullWidth
              />
            </FormField>
          </div>

          {generalError && (
            <p className="text-red-400 text-fs14 max-[1024px]:text-[13px] max-[640px]:text-[12px] font-medium font-century mt-6">
              {generalError}
            </p>
          )}

          <div className="flex justify-end mt-8 mb-4">
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              className="px-8 py-[10px]! text-fs25! max-[1024px]:text-[18px]! max-[640px]:text-[16px]! font-extrabold! bg-[#FABE2C] text-black hover:bg-[#e0ab26] rounded-lg shadow-md"
            >
              Save
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default ProfileCompletion;
