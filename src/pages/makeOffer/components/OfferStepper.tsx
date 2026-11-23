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
      className={`w-full h-[290px] max-[1024px]:h-auto bg-[#1C2434] max-[1024px]:bg-transparent border border-white/5 max-[1024px]:border-0 py-7 px-6 max-[1024px]:py-0 max-[1024px]:px-0 select-none font-century ${className}`}
    >
      <div className="flex flex-col h-full max-[1024px]:hidden">
        {STEPS.map((item, index) => {
          const isCompleted = item.step < currentStep;
          const isActive = item.step === currentStep;
          const isLast = index === STEPS.length - 1;
          return (
            <div
              key={item.step}
              className={`flex ${isLast ? "flex-grow-0" : "flex-1"}`}
            >
              <div className="flex flex-col items-center self-stretch shrink-0 w-9">
                <Button
                  variant="unstyled"
                  type="button"
                  onClick={() => isCompleted && onStepClick?.(item.step)}
                  disabled={!isCompleted}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-fs15 font-bold transition-all duration-200 shrink-0 ${
                    isCompleted
                      ? "bg-[#2EA753] text-white shadow-[0_0_12px_rgba(46,167,83,0.4)] cursor-pointer"
                      : isActive
                        ? "bg-[#05D5FB] text-white shadow-[0_0_14px_rgba(5,213,251,0.5)]"
                        : "border border-[#8D9199]/50 text-[#8D9199] bg-transparent"
                  }`}
                >
                  {isCompleted ? (
                    <span className="text-[14px] leading-none">✓</span>
                  ) : (
                    item.step
                  )}
                </Button>

                {!isLast && (
                  <div
                    className={`w-[2px] flex-1 transition-colors duration-200 ${
                      item.step <= currentStep ? "bg-[#05D5FB]" : "bg-[#545A66]"
                    }`}
                  />
                )}
              </div>

              <div className="h-8 flex items-center ml-3.5">
                <span
                  className={`text-fs18 font-bold transition-colors ${
                    isActive
                      ? "text-[#05D5FB]"
                      : isCompleted
                        ? "text-white"
                        : "text-[#8D9199]"
                  }`}
                >
                  {item.title}
                </span>
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
                  className={`w-8 h-8 max-[640px]:w-7 max-[640px]:h-7 rounded-full flex items-center justify-center text-[14px] max-[640px]:text-[12px] font-bold transition-all duration-200 shrink-0 ${
                    isCompleted
                      ? "bg-[#2EA753] text-white shadow-[0_0_12px_rgba(46,167,83,0.4)] cursor-pointer"
                      : isActive
                        ? "bg-[#05D5FB] text-white shadow-[0_0_14px_rgba(5,213,251,0.5)]"
                        : "border border-[#8D9199]/50 text-[#8D9199] bg-transparent"
                  }`}
                >
                  {isCompleted ? (
                    <span className="text-[13px] max-[640px]:text-[11px] leading-none">
                      ✓
                    </span>
                  ) : (
                    item.step
                  )}
                </Button>

                <span
                  className={`text-[14px] max-[640px]:text-[13px] font-bold transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-[#05D5FB]"
                      : isCompleted
                        ? "text-white"
                        : "text-[#8D9199]"
                  }`}
                >
                  {item.title}
                </span>
              </div>

              {!isLast && (
                <div
                  className={`flex-1 h-[2px] mx-4 max-[640px]:mx-2 transition-colors duration-200 ${
                    isLineActive ? "bg-[#05D5FB]" : "bg-[#545A66]"
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
