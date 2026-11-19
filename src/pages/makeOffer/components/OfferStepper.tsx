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
      className={`w-[80%] max-[1024px]:w-full h-[280px] max-[1024px]:h-auto bg-[#1C2434] border border-white/5 pt-8 pb-5 px-6 max-[1024px]:py-6 flex flex-col justify-between select-none font-century ${className}`}
    >
      <div className="flex flex-col h-full max-[1024px]:flex-row max-[1024px]:items-center max-[1024px]:justify-between">
        {STEPS.map((item, index) => {
          const isCompleted = item.step < currentStep;
          const isActive = item.step === currentStep;
          const isLast = index === STEPS.length - 1;

          return (
            <div
              key={item.step}
              className="flex flex-col flex-1 max-[1024px]:flex-row max-[1024px]:items-center"
            >
              <div className="flex items-center gap-3.5">
                <Button
                  variant="unstyled"
                  type="button"
                  onClick={() => isCompleted && onStepClick?.(item.step)}
                  disabled={!isCompleted}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-fs24 font-bold transition-all duration-200 shrink-0 ${
                    isCompleted
                      ? "bg-[#2EA753] text-white shadow-[0_0_12px_rgba(46,167,83,0.4)] cursor-pointer"
                      : isActive
                        ? "bg-[#05D5FB] text-white "
                        : "border border-white/20 text-[#8E8E8E] bg-transparent"
                  }`}
                >
                  {isCompleted ? (
                    <span className="text-fs16  leading-none">✓</span>
                  ) : (
                    item.step
                  )}
                </Button>

                <div className="flex flex-col">
                  <span
                    className={`text-fs25 font-bold transition-colors ${
                      isActive || isCompleted ? "text-white" : "text-[#8E8E8E]"
                    }`}
                  >
                    {item.title}
                  </span>
                  {isCompleted && (
                    <span className="text-fs12 text-[#2EA753] font-medium leading-tight">
                      Completed
                    </span>
                  )}
                </div>
              </div>

              {!isLast && (
                <div className="ml-[17px] w-[2px] flex-1 my-2 bg-white/15 max-[1024px]:hidden" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OfferStepper;
