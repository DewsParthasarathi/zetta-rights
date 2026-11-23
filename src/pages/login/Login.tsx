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
  login,
  setRegistrationDraft,
  type UserAccount,
} from "../../store/slices/authSlice";
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
  const [matchedAccount, setMatchedAccount] = useState<UserAccount | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleRequestOtp = async (e: FormEvent) => {
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

    setIsProcessing(true);

    try {
      const actionResult = await dispatch(checkAccountByEmail(email.trim()));
      setIsProcessing(false);

      if (checkAccountByEmail.fulfilled.match(actionResult)) {
        const { exists, account } = actionResult.payload;

        if (exists && account) {
          setMatchedAccount(account);
          createAndSendOtp(email.trim());
          setStep("OTP_VERIFY");
        } else {
          setMatchedAccount(null);
          toast.info(
            "Account not found with this email. Please enter your details to create an account.",
          );
          setStep("CREATE_ACCOUNT");
        }
      } else {
        const errorMsg =
          (actionResult.payload as string) ||
          "Could not verify account. Please make sure JSON server is running (npm run db).";
        setEmailError(errorMsg);
      }
    } catch {
      setIsProcessing(false);
      setEmailError(
        "Could not connect to JSON Server at http://localhost:3001. Please run `npm run db`.",
      );
    }
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

    let accountToLogin = matchedAccount;

    if (!accountToLogin) {
      setIsProcessing(true);
      try {
        const actionResult = await dispatch(checkAccountByEmail(email.trim()));
        setIsProcessing(false);
        if (
          checkAccountByEmail.fulfilled.match(actionResult) &&
          actionResult.payload.exists &&
          actionResult.payload.account
        ) {
          accountToLogin = actionResult.payload.account;
        }
      } catch {
        setIsProcessing(false);
      }
    }

    if (accountToLogin) {
      dispatch(login(accountToLogin));
      const displayName =
        accountToLogin.companyName || accountToLogin.fullName || "User";
      toast.success(`Welcome back, ${displayName}!`);
      navigate("/");
    } else {
      toast.info(
        "Email verified! Please enter your details to create an account.",
      );
      setStep("CREATE_ACCOUNT");
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

    const randomEmail = `user${Math.floor(10000 + Math.random() * 90000)}@zetarights.com`;
    const accountEmail =
      email.trim() && validateEmail(email).isValid
        ? email.trim()
        : randomEmail;

    const trimmedName = fullName.trim();

    dispatch(
      setRegistrationDraft({
        email: accountEmail,
        fullName: trimmedName,
        name: trimmedName,
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
    <div className="bg-white">
      <div
        className="relative min-h-screen w-full flex items-center justify-center p-4 max-[1024px]:p-3.5 max-[768px]:p-3 max-[480px]:p-2 max-[340px]:p-1.5 bg-cover bg-center bg-no-repeat font-century select-none"
        style={{ backgroundImage: `url(${BackGround_Img})` }}
      >
        <div className="relative z-10 w-[34%] max-[1600px]:w-[32%] max-[1440px]:w-[32%] max-[1280px]:w-[38%] max-[1024px]:w-[58%] max-[768px]:w-[78%] max-[480px]:w-[94%] max-[360px]:w-[96%] max-[340px]:w-full max-w-[96%] max-[340px]:max-w-full bg-black/50 border border-white/10 rounded-[20px] max-[340px]:rounded-[14px] py-[3%] px-[3.5%] max-[1024px]:px-5 max-[768px]:px-4 max-[340px]:px-2.5 max-[1024px]:py-5 max-[340px]:py-4 overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-90"
            style={{ backgroundImage: `url(${Pattern})` }}
          />

          <div className="relative z-10">
            <div className="flex w-[49%] mx-auto justify-center mb-5">
              <Image
                src={loginLogo}
                alt="ZettaRights"
                className="h-auto max-[1024px]:h-11 w-full cursor-pointer"
                onClick={() => {
                  setEmailError("");
                  setTermsError("");
                  setOtpError("");
                  setStep("LOGIN");
                }}
              />
            </div>

            {step === "LOGIN" && (
              <ReusableForm
                title="Login"
                subtitle="Join Us Now!"
                submitButtonText={isProcessing ? "Checking..." : "Request OTP"}
                isSubmitting={isProcessing}
                onSubmit={handleRequestOtp}
                fields={[
                  {
                    name: "countryAndEmail",
                    type: "custom",
                    render: () => (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5 max-[360px]:gap-2 max-[340px]:gap-1.5 relative">
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
                            className="flex-1 min-w-0 text-fs20! max-[1024px]:text-[16px]! max-[640px]:text-[14px]! max-[340px]:text-[12px]!"
                          />
                        </div>
                        {emailError && (
                          <p className="text-red-400 text-fs13 max-[1024px]:text-[12px] max-[640px]:text-[11px] font-medium font-century">
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
                      <span className="text-white py-[6%] text-fs15 max-[1024px]:text-[14px] max-[640px]:text-[13px] max-[340px]:text-[11px] leading-tight">
                        By creating an account, you agree to ZettaRights{" "}
                        <span className="text-[#FABE2C] font-bold hover:underline cursor-pointer">
                          Terms and Conditions
                        </span>{" "}
                        and{" "}
                        <span className="text-[#FABE2C] font-bold hover:underline cursor-pointer">
                          Privacy Notice
                        </span>
                      </span>
                    ),
                  },
                ]}
                footer={
                  <div className="pt-3 text-center ">
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => {
                        setEmail("");
                        setEmailError("");
                        setTermsError("");
                        setStep("CREATE_ACCOUNT");
                      }}
                      className="text-fs20 mx-auto max-[1024px]:text-[15px] max-[640px]:text-[14px] max-[340px]:text-[13px] text-white hover:underline font-medium"
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
                  <span className="text-white text-fs18 max-[1024px]:text-[15px] max-[640px]:text-[14px] font-normal">
                    Enter the OTP sent to{" "}
                    <span className="text-white font-semibold break-all">
                      {email || "your email"}
                    </span>
                  </span>
                }
                submitButtonText={isProcessing ? "Verifying..." : "Verify"}
                isSubmitting={isProcessing}
                submitButtonClassName="mt-3 text-fs23 max-[1024px]:text-[18px] max-[640px]:text-[16px] max-[340px]:text-[15px] font-extrabold! text-[#0f3051]! tracking-tight"
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
                          <p className="text-red-400 text-fs13 max-[1024px]:text-[12px] max-[640px]:text-[11px] font-medium font-century">
                            {otpError}
                          </p>
                        )}
                      </div>
                    ),
                  },
                ]}
                footer={
                  <div className="text-center space-y-2 pt-2">
                    <p className="text-fs18 max-[1024px]:text-[15px] max-[640px]:text-[14px] text-white">
                      Didn&apos;t receive the OTP?{" "}
                      <Button
                        type="button"
                        variant="link"
                        onClick={handleResendOtp}
                        disabled={timer > 0}
                        className="text-[#FABE2C] font-semibold text-fs14 max-[1024px]:text-[14px] max-[640px]:text-[13px] hover:underline inline-block"
                      >
                        Resend
                      </Button>
                    </p>
                    <p className="text-fs18 max-[1024px]:text-[15px] max-[640px]:text-[14px] text-white font-medium tracking-wide">
                      {formatTimer(timer)}
                    </p>
                    <div className="pt-1">
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => {
                          setStep("LOGIN");
                          setOtpError("");
                        }}
                        className="text-fs18 max-[1024px]:text-[15px] max-[640px]:text-[14px] text-white hover:underline inline-block"
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
                titleClassName="text-fs35 max-[1440px]:text-fs30 max-[1024px]:text-[24px] max-[640px]:text-[20px] max-[340px]:text-[18px]"
                submitButtonText="Next"
                onSubmit={handleCreateAccountSubmit}
                fields={[
                  {
                    name: "fullName",
                    label: "Full Name",
                    type: "text",
                    placeholder: "Enter Your Full Name",
                    required: true,
                    maxLength: 50,
                    value: fullName,
                    className: "text-fs20! max-[1024px]:text-[16px]! max-[640px]:text-[14px]! max-[340px]:text-[12px]!",
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
                    className: "text-fs20! max-[1024px]:text-[16px]! max-[640px]:text-[14px]! max-[340px]:text-[12px]!",
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
                footer={
                  <div className="pt-3 text-center">
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => {
                        setEmailError("");
                        setStep("LOGIN");
                      }}
                      className="text-fs18 max-[1024px]:text-[15px] max-[640px]:text-[14px] max-[340px]:text-[13px] text-white hover:underline font-medium"
                    >
                      Already have an account? Login
                    </Button>
                  </div>
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
