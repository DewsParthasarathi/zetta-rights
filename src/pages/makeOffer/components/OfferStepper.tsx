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
      className={`w-full max-[1024px]:w-full h-[290px] max-[1024px]:h-auto bg-[#1C2434] border border-white/5  py-7 px-6 max-[1024px]:py-4 max-[1024px]:px-4 select-none font-century ${className}`}
    >
      <div className="flex flex-col h-full max-[1024px]:flex-row max-[1024px]:items-center max-[1024px]:justify-between">
        {STEPS.map((item, index) => {
          const isCompleted = item.step < currentStep;
          const isActive = item.step === currentStep;
          const isLast = index === STEPS.length - 1;
          return (
            <div
              key={item.step}
              className={`flex ${isLast ? "flex-grow-0" : "flex-1"} max-[1024px]:flex-row max-[1024px]:items-center ${isLast ? "max-[1024px]:flex-grow-0" : "max-[1024px]:flex-1"}`}
            >
              <div className="flex flex-col items-center self-stretch shrink-0 w-9 max-[1024px]:flex-row max-[1024px]:w-auto max-[1024px]:self-auto">
                <Button
                  variant="unstyled"
                  type="button"
                  onClick={() => isCompleted && onStepClick?.(item.step)}
                  disabled={!isCompleted}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-fs18 font-bold transition-all duration-200 shrink-0 ${
                    isCompleted
                      ? "bg-[#2EA753] text-white shadow-[0_0_12px_rgba(46,167,83,0.4)] cursor-pointer"
                      : isActive
                        ? "bg-[#0D9AB9] text-white"
                        : "border border-[#8D9199]/50 text-[#8D9199] bg-transparent"
                  }`}
                >
                  {isCompleted ? (
                    <span className="text-fs16 leading-none">✓</span>
                  ) : (
                    item.step
                  )}
                </Button>

                {!isLast && (
                  <div
                    className={`w-[2px] flex-1 transition-colors duration-200 ${
                      item.step <= currentStep ? "bg-[#05D5FB]" : "bg-[#545A66]"
                    } max-[1024px]:w-auto max-[1024px]:h-[2px] max-[1024px]:flex-1 max-[1024px]:mx-3`}
                  />
                )}
              </div>

              <div className="h-9 flex items-center ml-3.5 max-[1024px]:ml-2 max-[1024px]:mr-3">
                <span
                  className={`text-fs20 font-bold transition-colors ${
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
    </div>
  );
};

export default OfferStepper;
