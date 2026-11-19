import {
  useState,
  useRef,
  useEffect,
  type FormEvent,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  checkAccountByEmail,
  setRegistrationDraft,
} from "../../store/authSlice";
import type { AppDispatch, RootState } from "../../store/store";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Image from "../../components/common/Image";

import ReusableForm from "./components/ReusableForm";
import CountryCodeSelector from "./components/CountryCodeSelector";
import OtpInputGroup from "./components/OtpInputGroup";

import {
  validateEmail,
  validateFullName,
  validateMobileNumber,
  validateOtp,
} from "../../utils/validation";

import BackGround_Img from "../../assets/images/login/BackGround_Img.png";
import loginLogo from "../../assets/images/login/loginLogo.png";
import Pattern from "../../assets/images/login/Pattern.png";

type Step = "LOGIN" | "OTP_VERIFY" | "CREATE_ACCOUNT";

const Login = () => {
  const [step, setStep] = useState<Step>("LOGIN");

  const [countryCode, setCountryCode] = useState("+91");
  const [email, setEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [termsError, setTermsError] = useState("");

  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timer, setTimer] = useState(65);
  const [otpError, setOtpError] = useState("");
  const [isCheckingAccount, setIsCheckingAccount] = useState(false);

  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [role, setRole] = useState<"Buyer" | "Seller">("Buyer");
  const [fullNameError, setFullNameError] = useState("");
  const [mobileError, setMobileError] = useState("");

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs} Mins`;
  };

  const createAndSendOtp = (targetEmail: string) => {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setOtpDigits(["", "", "", ""]);
    setTimer(65);
    setOtpError("");

    toast.info(`🔑 Verification code for ${targetEmail}: ${newOtp}`, {
      autoClose: 14000,
    });
  };

  const handleRequestOtp = (e: FormEvent) => {
    e.preventDefault();

    let hasAnyError = false;

    const emailResult = validateEmail(email);
    if (!emailResult.isValid) {
      setEmailError(emailResult.error || "Please enter a valid email address");
      hasAnyError = true;
    } else {
      setEmailError("");
    }

    if (!agreedToTerms) {
      setTermsError(
        "Please agree to the Terms and Conditions and Privacy Notice",
      );
      hasAnyError = true;
    } else {
      setTermsError("");
    }

    if (hasAnyError) {
      return;
    }

    createAndSendOtp(email.trim());
    setStep("OTP_VERIFY");
  };

  const handleOtpDigitChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    if (otpError) setOtpError("");
    const val = e.target.value.replace(/\D/g, "");
    const updated = [...otpDigits];

    if (val.length > 1) {
      const chars = val.slice(0, 4).split("");
      chars.forEach((c, i) => {
        if (index + i < 4) updated[index + i] = c;
      });
      setOtpDigits(updated);
      const nextIndex = Math.min(index + chars.length, 3);
      otpInputRefs.current[nextIndex]?.focus();
      return;
    }

    updated[index] = val ? val[val.length - 1] : "";
    setOtpDigits(updated);

    if (val && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (otpError) setOtpError("");
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    if (!pastedData) return;

    const updated = [...otpDigits];
    pastedData.split("").forEach((char, idx) => {
      if (idx < 4) updated[idx] = char;
    });
    setOtpDigits(updated);

    const focusIdx = Math.min(pastedData.length, 3);
    otpInputRefs.current[focusIdx]?.focus();
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    const entered = otpDigits.join("");

    const otpResult = validateOtp(entered);
    if (!otpResult.isValid) {
      setOtpError(otpResult.error || "Please enter all 4 digits of the OTP");
      return;
    }

    if (entered !== generatedOtp) {
      setOtpError("Invalid OTP code. Please check and try again.");
      return;
    }

    setOtpError("");
    setIsCheckingAccount(true);

    try {
      const actionResult = await dispatch(checkAccountByEmail(email.trim()));
      setIsCheckingAccount(false);

      if (checkAccountByEmail.fulfilled.match(actionResult)) {
        const { exists, role: userRole, account } = actionResult.payload;

        if (exists && account) {
          const displayName =
            account.companyName || account.fullName || "User";
          toast.success(
            `Welcome back, ${displayName} (${userRole})!`,
          );
          navigate("/");
        } else {
          toast.info(
            "Email verified! Please enter your details to create an account.",
          );
          setStep("CREATE_ACCOUNT");
        }
      } else {
        const errorMsg =
          (actionResult.payload as string) ||
          "Could not verify account. Please make sure JSON server is running (npm run db).";
        setOtpError(errorMsg);
      }
    } catch {
      setIsCheckingAccount(false);
      setOtpError(
        "Could not connect to JSON Server at http://localhost:3001. Please run `npm run db`.",
      );
    }
  };

  const handleResendOtp = () => {
    createAndSendOtp(email.trim());
    toast.info("A new OTP has been sent via toast!");
  };

  const handleCreateAccountSubmit = (e: FormEvent) => {
    e.preventDefault();

    let hasAnyError = false;

    const nameResult = validateFullName(fullName);
    if (!nameResult.isValid) {
      setFullNameError(nameResult.error || "Please enter a valid full name");
      hasAnyError = true;
    } else {
      setFullNameError("");
    }

    const mobileResult = validateMobileNumber(mobileNumber);
    if (!mobileResult.isValid) {
      setMobileError(
        mobileResult.error || "Please enter a valid mobile number",
      );
      hasAnyError = true;
    } else {
      setMobileError("");
    }

    if (hasAnyError) {
      return;
    }

    if (!email.trim() || !generatedOtp || otpDigits.join("") !== generatedOtp) {
      if (!email.trim()) {
        toast.info("Please enter your email to verify with OTP first.");
        setStep("LOGIN");
      } else {
        createAndSendOtp(email.trim());
        setStep("OTP_VERIFY");
      }
      return;
    }

    dispatch(
      setRegistrationDraft({
        email: email.trim(),
        fullName: fullName.trim(),
        mobileNumber: mobileNumber.trim(),
        role,
      }),
    );

    if (role === "Buyer") {
      navigate("/buyer-profile");
    } else {
      navigate("/seller-profile");
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat font-century select-none"
      style={{ backgroundImage: `url(${BackGround_Img})` }}
    >
      <div className="relative z-10 w-[24%] max-[1600px]:w-[28%] max-[1440px]:w-[32%] max-[1280px]:w-[38%] max-[1024px]:w-[52%] max-[768px]:w-[75%] max-[480px]:w-[92%] max-w-[96%] bg-black/65 border border-white/10 rounded-[16px] px-7 py-7 max-[1024px]:px-6 max-[1024px]:py-6 overflow-hidden shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-90"
          style={{ backgroundImage: `url(${Pattern})` }}
        />

        <div className="relative z-10">
          <div className="flex justify-center mb-5">
            <Image
              src={loginLogo}
              alt="ZettaRights"
              className="h-12 max-[1024px]:h-11 w-auto cursor-pointer"
              onClick={() => setStep("LOGIN")}
            />
          </div>

          {step === "LOGIN" && (
            <ReusableForm
              title="Login"
              subtitle="Join Us Now!"
              submitButtonText="Request OTP"
              onSubmit={handleRequestOtp}
              fields={[
                {
                  name: "countryAndEmail",
                  type: "custom",
                  render: () => (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 relative">
                        <CountryCodeSelector
                          selectedCode={countryCode}
                          onSelectCode={setCountryCode}
                        />
                        <Input
                          type="text"
                          value={email}
                          hasError={Boolean(emailError)}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError("");
                          }}
                          placeholder="Enter Your Email"
                          className="flex-1"
                        />
                      </div>
                      {emailError && (
                        <p className="text-red-400 text-fs13 max-[1024px]:text-fs12 font-medium font-century">
                          {emailError}
                        </p>
                      )}
                    </div>
                  ),
                },
                {
                  name: "terms",
                  type: "checkbox",
                  checked: agreedToTerms,
                  error: termsError,
                  onCheckboxChange: (checked) => {
                    setAgreedToTerms(checked);
                    if (termsError) setTermsError("");
                  },
                  label: (
                    <span className="text-white text-fs13 max-[1024px]:text-fs12 leading-tight">
                      By creating an account, you agree to ZettaRights{" "}
                      <span className="text-[#FABE2C] hover:underline cursor-pointer">
                        Terms and Conditions
                      </span>{" "}
                      and{" "}
                      <span className="text-[#FABE2C] hover:underline cursor-pointer">
                        Privacy Notice
                      </span>
                    </span>
                  ),
                },
              ]}
              footer={
                <div className="pt-3 text-center">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setStep("CREATE_ACCOUNT")}
                    className="text-fs15 max-[1024px]:text-fs14 text-white hover:underline font-medium"
                  >
                    Create a new account?
                  </Button>
                </div>
              }
            />
          )}

          {step === "OTP_VERIFY" && (
            <ReusableForm
              title="OTP Verify"
              subtitle={
                <span className="text-white text-fs15 max-[1024px]:text-fs14 font-normal">
                  Enter the OTP sent to{" "}
                  <span className="text-white font-semibold break-all">
                    {email || "your email"}
                  </span>
                </span>
              }
              submitButtonText={isCheckingAccount ? "Verifying..." : "Verify"}
              isSubmitting={isCheckingAccount}
              submitButtonClassName="mt-3"
              className="space-y-4"
              onSubmit={handleVerifyOtp}
              fields={[
                {
                  name: "otp",
                  type: "custom",
                  render: () => (
                    <div className="space-y-1.5">
                      <OtpInputGroup
                        digits={otpDigits}
                        refs={otpInputRefs}
                        hasError={Boolean(otpError)}
                        onChange={handleOtpDigitChange}
                        onKeyDown={handleOtpKeyDown}
                        onPaste={handleOtpPaste}
                      />
                      {otpError && (
                        <p className="text-red-400 text-fs13 max-[1024px]:text-fs12 font-medium font-century">
                          {otpError}
                        </p>
                      )}
                    </div>
                  ),
                },
              ]}
              footer={
                <div className="text-center space-y-2 pt-2">
                  <p className="text-fs14 max-[1024px]:text-fs13 text-white">
                    Didn&apos;t receive the OTP?{" "}
                    <Button
                      type="button"
                      variant="link"
                      onClick={handleResendOtp}
                      disabled={timer > 0}
                      className="text-[#FABE2C] font-semibold text-fs14 max-[1024px]:text-fs13 hover:underline inline-block"
                    >
                      Resend
                    </Button>
                  </p>
                  <p className="text-fs14 max-[1024px]:text-fs13 text-white font-medium tracking-wide">
                    {formatTimer(timer)}
                  </p>
                  <div className="pt-1">
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setStep("LOGIN")}
                      className="text-fs14 max-[1024px]:text-fs13 text-white hover:underline inline-block"
                    >
                      Change Email
                    </Button>
                  </div>
                </div>
              }
            />
          )}

          {step === "CREATE_ACCOUNT" && (
            <ReusableForm
              title="Create New Account"
              submitButtonText="Next"
              onSubmit={handleCreateAccountSubmit}
              fields={[
                {
                  name: "fullName",
                  label: "Full Name",
                  type: "text",
                  placeholder: "Yazh Athithan",
                  required: true,
                  maxLength: 50,
                  value: fullName,
                  error: fullNameError,
                  onChange: (e) => {
                    const lettersOnly = e.target.value
                      .replace(/[^a-zA-Z\s'.-]/g, "")
                      .slice(0, 50);
                    setFullName(lettersOnly);
                    if (fullNameError) setFullNameError("");
                  },
                },
                {
                  name: "mobileNumber",
                  label: "Mobile Number",
                  type: "tel",
                  placeholder: "Enter Your Mobile NO",
                  required: true,
                  maxLength: 10,
                  value: mobileNumber,
                  error: mobileError,
                  onChange: (e) => {
                    const digitsOnly = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                    setMobileNumber(digitsOnly);
                    if (mobileError) setMobileError("");
                  },
                },
                {
                  name: "role",
                  type: "radio-group",
                  value: role,
                  options: [
                    { label: "Buyer", value: "Buyer" },
                    { label: "Seller", value: "Seller" },
                  ],
                  onRadioChange: (value) =>
                    setRole(value as "Buyer" | "Seller"),
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
