import Button from "../../../components/common/Button";

export interface OfferStepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

const STEPS = [
  { step: 1, title: "Step 1" },
  { step: 2, title: "Step 2" },
  { step: 3, title: "Step 3" },
];

const OfferStepper = ({
  currentStep,
  onStepClick,
  className = "",
}: OfferStepperProps) => {
  return (
    <div
      className={`w-full bg-[#182232] max-[1024px]:bg-transparent border border-white/5 max-[1024px]:border-0 p-6 max-[1024px]:p-0 select-none font-century  ${className}`}
    >
      <div className="flex flex-col max-[1024px]:hidden">
        {STEPS.map((item, index) => {
          const isCompleted = item.step < currentStep;
          const isActive = item.step === currentStep;
          const isLast = index === STEPS.length - 1;

          return (
            <div key={item.step} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <Button
                  variant="unstyled"
                  type="button"
                  onClick={() => isCompleted && onStepClick?.(item.step)}
                  disabled={!isCompleted}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 opacity-100! transition-colors ${
                    isCompleted
                      ? "bg-[#00E875] text-white cursor-pointer"
                      : isActive
                        ? "bg-[#05D5FB] text-white"
                        : "border border-white/20 text-[#8D9199] bg-transparent"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    item.step
                  )}
                </Button>

                {!isLast && (
                  <div
                    className={`w-[2px] h-12 my-1.5 transition-colors ${
                      item.step < currentStep ? "bg-[#05D5FB]" : "bg-[#3A4151]"
                    }`}
                  />
                )}
              </div>

              <div className="flex flex-col pt-1">
                <span
                  className={`text-[15px] font-bold leading-tight transition-colors ${
                    isActive
                      ? "text-[#05D5FB]"
                      : isCompleted
                        ? "text-white"
                        : "text-[#8D9199]"
                  }`}
                >
                  {item.title}
                </span>
                {isCompleted && (
                  <span className="text-[11px] text-[#00E875] font-medium leading-tight mt-1">
                    Completed
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden max-[1024px]:flex items-center justify-between w-full">
        {STEPS.map((item, index) => {
          const isCompleted = item.step < currentStep;
          const isActive = item.step === currentStep;
          const isLast = index === STEPS.length - 1;
          const isLineActive = item.step < currentStep;

          return (
            <div
              key={item.step}
              className={`flex items-center ${isLast ? "flex-grow-0" : "flex-1"}`}
            >
              <div className="flex items-center gap-2.5 max-[640px]:gap-1.5 shrink-0">
                <Button
                  variant="unstyled"
                  type="button"
                  onClick={() => isCompleted && onStepClick?.(item.step)}
                  disabled={!isCompleted}
                  className={`w-7 h-7 max-[640px]:w-6 max-[640px]:h-6 rounded-full flex items-center justify-center text-[13px] max-[640px]:text-[11px] font-bold transition-all shrink-0 ${
                    isCompleted
                      ? "bg-[#00E875] text-white cursor-pointer"
                      : isActive
                        ? "bg-[#05D5FB] text-white"
                        : "border border-white/20 text-[#8D9199] bg-transparent"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-3.5 h-3.5 max-[640px]:w-3 max-[640px]:h-3 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    item.step
                  )}
                </Button>

                <div className="flex flex-col">
                  <span
                    className={`text-[14px] max-[640px]:text-[12px] font-bold transition-colors whitespace-nowrap leading-tight ${
                      isActive
                        ? "text-[#05D5FB]"
                        : isCompleted
                          ? "text-white"
                          : "text-[#8D9199]"
                    }`}
                  >
                    {item.title}
                  </span>
                  {isCompleted && (
                    <span className="text-[10px] text-[#00E875] font-medium leading-tight">
                      Completed
                    </span>
                  )}
                </div>
              </div>

              {!isLast && (
                <div
                  className={`flex-1 h-[2px] mx-4 max-[640px]:mx-2 transition-colors ${
                    isLineActive ? "bg-[#05D5FB]" : "bg-[#3A4151]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OfferStepper;
