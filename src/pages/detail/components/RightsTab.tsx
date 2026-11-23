import { useState } from "react";
import Button from "../../../components/common/Button";

const REGIONS = ["India", "United States of America"];
const RIGHT_TYPES = ["SVOD", "Theatrical Rights", "SATELLITE"];

export interface RightsTabProps {
  className?: string;
}

const RightsTab = ({ className = "" }: RightsTabProps) => {
  const [selectedRegion, setSelectedRegion] = useState("India");
  const [selectedRightType, setSelectedRightType] =
    useState("Theatrical Rights");

  return (
    <div className={`w-full flex flex-col gap-4 py-2 select-none ${className}`}>
      <div>
        <h4 className="text-[13px]! max-[1440px]:text-[12px]! max-[1281px]:text-[12px]! max-[1024px]:text-[12px]! text-gray-300 font-medium mb-2.5">
          Available Region
        </h4>
        <div className="flex flex-wrap items-center gap-3">
          {REGIONS.map((region) => {
            const isSelected = selectedRegion === region;
            return (
              <Button
                key={region}
                variant="unstyled"
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-1.5 rounded-[6px] text-fs13 max-[1440px]:text-[12px]! max-[1281px]:text-[12px]! max-[1024px]:text-[12px]! font-medium transition cursor-pointer ${
                  isSelected
                    ? "border border-[#2EA753] text-[#2EA753] bg-[#2EA753]/10 font-semibold"
                    : "border border-white/20 text-[#8E8E8E] hover:text-white hover:border-white/40 bg-white/5"
                }`}
              >
                {region}
              </Button>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="text-[13px]! max-[1440px]:text-[12px]! max-[1281px]:text-[12px]! max-[1024px]:text-[12px]! text-gray-300 font-medium mb-2.5">
          Right Types
        </h4>
        <div className="flex flex-wrap items-center gap-3">
          {RIGHT_TYPES.map((type) => {
            const isSelected = selectedRightType === type;
            return (
              <Button
                key={type}
                variant="unstyled"
                type="button"
                onClick={() => setSelectedRightType(type)}
                className={`px-4 py-1.5 rounded-[6px] text-fs13 max-[1440px]:text-[12px]! max-[1281px]:text-[12px]! max-[1024px]:text-[12px]! font-medium transition cursor-pointer ${
                  isSelected
                    ? "border border-[#2EA753] text-[#2EA753] bg-[#2EA753]/10 font-semibold"
                    : "border border-white/20 text-[#8E8E8E] hover:text-white hover:border-white/40 bg-white/5"
                }`}
              >
                {type}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightsTab;
