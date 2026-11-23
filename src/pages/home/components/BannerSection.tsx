import { Link } from "react-router-dom";
import Image from "../../../components/common/Image";
import Jailerbanner_Image from "../../../assets/images/Home/Header/Jailerbanner_Image.jpg";
import Maveeran_Banner from "../../../assets/images/Home/Header/Maveeran_Banner.webp";
import SubmittedContent_Icon from "../../../assets/images/Home/Header/SubmittedContent_Icon.png";
import availablecontent_Icon from "../../../assets/images/Home/Header/availablecontent_Icon.png";
import SoldContent_Icon from "../../../assets/images/Home/Header/SoldContent_Icon.png";

const BannerSection = () => {
  return (
    <section className="relative w-full min-h-[85vh] max-[1024px]:min-h-screen flex items-center justify-center overflow-hidden bg-[#111826] text-white font-century select-none">
      <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[38vw] aspect-square bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="w-[83%] max-[1024px]:w-[96%] max-[768px]:w-[98%] max-[480px]:w-full min-h-[75vh] max-[1440px]:min-h-[70vh] max-[1024px]:min-h-0 max-[1024px]:h-auto flex items-center justify-center mx-auto px-6 max-[1024px]:px-4 max-[768px]:px-3 max-[480px]:px-2.5 py-8 max-[1024px]:py-6">
        <div className="flex max-[1024px]:flex-col items-center justify-between gap-12 max-[1600px]:gap-8 max-[1440px]:gap-6 max-[1024px]:gap-10 w-full">
          <div className="w-[44%] max-[1440px]:w-[42%] max-[1280px]:w-[40%] max-[1024px]:w-full flex flex-col items-start z-10 max-[1024px]:items-center max-[1024px]:text-center shrink-0">
            <h1 className="text-fs58 max-[1024px]:text-[34px] max-[640px]:text-[28px] font-bold text-white tracking-tight leading-[1.12]">
              Buy and Sell
              <br />
              Movies,
            </h1>

            <div
              className="text-fs58 max-[1024px]:text-[34px] max-[640px]:text-[28px] font-bold leading-[1.12] text-transparent select-none mt-1"
              style={{
                WebkitTextStroke: "1.2px rgba(255, 255, 255, 0.75)",
              }}
            >
              Movie Collection
            </div>

            <p className="text-[#8E8E8E] text-fs17 max-[1600px]:text-fs16 max-[1440px]:text-[14px] max-[1366px]:text-[12px] max-[1024px]:text-[12px] max-[640px]:text-[12px] font-normal max-w-lg leading-relaxed mt-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <Link
              to="/explore"
              className="mt-8 px-10 py-3.5 bg-white hover:bg-gray-200 text-black font-semibold text-fs24 max-[1440px]:text-fs[18px]! max-[1024px]:text-fs[15px]! max-[640px]:text-fs[12px]! rounded-[15px] max-[1440px]:rounded-[10px]  max-[1440px]:px-5  max-[1440px]:py-1.5 transition shadow-xl cursor-pointer inline-flex items-center justify-center select-none"
            >
              Explore
            </Link>
          </div>

          <div className="w-[54%] max-[1440px]:w-[56%] max-[1280px]:w-[58%] max-[1024px]:w-full relative flex items-center justify-end max-[1024px]:justify-center gap-0 max-[640px]:gap-3 z-10">
            <div className="relative flex items-center justify-center select-none w-[76%] max-[1440px]:w-[78%] max-[1280px]:w-[80%] max-[1024px]:w-[68%] max-[640px]:w-[62%]">
              <div className="relative z-0 w-[60%] max-[1440px]:w-[62%] max-[1280px]:w-[64%] aspect-[415/537] -mr-[40%] transition-transform duration-300 lg:hover:scale-[1.02]">
                <Image
                  src={Maveeran_Banner}
                  alt="Maaveeran"
                  className="w-full h-full object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                />
              </div>

              <div className="relative z-10 w-[60%] max-[1440px]:w-[62%] max-[1280px]:w-[65%] transition-transform duration-300 lg:hover:scale-[1.02]">
                <div className="p-[5%] bg-white/35 rounded-[13px]  shadow-2xl">
                  <div className="w-full aspect-[2/3]  overflow-hidden bg-black/60 shadow-inner">
                    <Image
                      src={Jailerbanner_Image}
                      alt="Jailer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 max-[1600px]:gap-3.5 max-[1440px]:gap-3 max-[640px]:gap-2.5 select-none z-10 w-[100px] max-[1600px]:w-[132px] max-[1440px]:w-[98px] max-[1024px]:w-[98px] max-[640px]:w-[94px] max-[400px]:w-[84px] shrink-0">
              <div className="relative overflow-hidden  w-full aspect-[17/15] bg-white rounded-[3px]  p-2 max-[640px]:p-1.5 flex flex-col items-center justify-center text-center shadow-md shrink-0">
                <Image
                  src={SubmittedContent_Icon}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 m-auto w-[62%] h-[62%] object-contain opacity-25 pointer-events-none select-none"
                />
                <div className="relative z-10 font-['SFPro'] text-[35px] max-[1600px]:text-[30px] max-[1440px]:text-[28px] max-[1024px]:text-[24px] max-[640px]:text-[20px] max-[400px]:text-[18px] font-bold text-[#31404F] leading-none">
                  234
                </div>
                <div className="relative z-10 font-['SFPro'] text-[#31404F] text-[13px] max-[1600px]:text-[12px] max-[1440px]:text-[11px] max-[1024px]:text-[10px] max-[640px]:text-[9px] max-[400px]:text-[8px] font-bold leading-[1.15] mt-1.5 max-[1440px]:mt-1 max-[640px]:mt-0.5">
                  Submitted
                  <br />
                  Content
                </div>
              </div>

              <div className="relative overflow-hidden w-full aspect-[17/15] bg-[#2EA753] rounded-[3px]  p-2 max-[640px]:p-1.5 flex flex-col items-center justify-center text-center shadow-md shrink-0">
                <Image
                  src={availablecontent_Icon}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 m-auto w-[62%] h-[62%] object-contain opacity-25 pointer-events-none select-none"
                />
                <div className="relative z-10 font-['SFPro'] text-[38px] max-[1600px]:text-[34px] max-[1440px]:text-[30px] max-[1024px]:text-[28px] max-[640px]:text-[24px] max-[400px]:text-[21px] font-bold text-white leading-none">
                  174
                </div>
                <div className="relative z-10 font-['SFPro'] text-white text-[13px] max-[1600px]:text-[12px] max-[1440px]:text-[11px] max-[1024px]:text-[10px] max-[640px]:text-[9px] max-[400px]:text-[8px] font-bold leading-[1.15] mt-1.5 max-[1440px]:mt-1 max-[640px]:mt-0.5">
                  Available
                  <br />
                  Content
                </div>
              </div>

              <div className="relative overflow-hidden w-full aspect-[17/15] bg-[#FCC93D] rounded-[3px]  p-2 max-[640px]:p-1.5 flex flex-col items-center justify-center text-center shadow-md shrink-0">
                <Image
                  src={SoldContent_Icon}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 m-auto w-[62%] h-[62%] object-contain opacity-25 pointer-events-none select-none"
                />
                <div className="relative z-10 font-['SFPro'] text-[38px] max-[1600px]:text-[34px] max-[1440px]:text-[30px] max-[1024px]:text-[28px] max-[640px]:text-[24px] max-[400px]:text-[21px] font-bold text-[#31404F] leading-none">
                  60
                </div>
                <div className="relative z-10 font-['SFPro'] text-[#31404F] text-[13px] max-[1600px]:text-[12px] max-[1440px]:text-[11px] max-[1024px]:text-[10px] max-[640px]:text-[9px] max-[400px]:text-[8px] font-bold leading-[1.15] mt-1.5 max-[1440px]:mt-1 max-[640px]:mt-0.5">
                  Sold
                  <br />
                  Content
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
