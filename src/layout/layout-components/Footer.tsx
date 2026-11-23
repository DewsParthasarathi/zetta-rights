import Image from "../../components/common/Image";
import footer_Logo from "../../assets/images/Home/Footer/footer_Logo.png";
import footer_Pattern from "../../assets/images/Home/Footer/footer_Pattern.png";
import fb from "../../assets/images/Home/Footer/fb.png";
import insta from "../../assets/images/Home/Footer/insta.png";
import twitter from "../../assets/images/Home/Footer/twitter.png";
import youtube from "../../assets/images/Home/Footer/youtube.png";
import googleplay_Icon from "../../assets/images/Home/Footer/googleplay_Icon.png";
import appstore_Icon from "../../assets/images/Home/Footer/appstore_Icon.png";

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#111826] text-white font-century overflow-hidden mt-auto select-none">
      <div
        className="absolute inset-0 bg-center bg-repeat opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(${footer_Pattern})`,
        }}
      />

      <div className="relative z-10 w-[93%] max-[1024px]:w-[96%] max-[768px]:w-[98%] max-[480px]:w-full mx-auto px-12 max-[1024px]:px-4 max-[768px]:px-3 max-[480px]:px-2.5 pt-10 max-[1024px]:pt-8 pb-6 max-[1024px]:pb-5">
        <div className="flex max-[1024px]:flex-col justify-between items-start gap-16 max-[1440px]:gap-12 max-[1024px]:gap-8 max-[640px]:gap-6 w-full">
          <div className="w-[32%] max-[1440px]:w-[34%] max-[1024px]:w-full max-[640px]:w-full flex flex-col items-start shrink-0">
            <Image
              src={footer_Logo}
              alt="ZettaRights"
              className="h-9 max-[1024px]:h-7 max-[640px]:h-6 w-[33%] max-[1024px]:w-[120px] max-[640px]:w-[100px] object-contain object-left"
            />

            <p className="text-[#fff] w-[100%] max-[1024px]:w-full max-[640px]:w-full text-fs15 max-[1440px]:text-[12px] max-[1024px]:text-[13px] max-[640px]:text-[12px] leading-relaxed mt-3 max-w-sm">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
              Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Sem
              Viverra Aliquet Eget Sit Amet Tellus.
            </p>
          </div>

          <div className="w-[58%] max-[1440px]:w-[58%] max-[1024px]:w-full max-[640px]:w-full flex max-[640px]:flex-col justify-between items-start gap-8 max-[640px]:gap-6">
            <div className="flex-1 min-w-[120px] max-[640px]:w-full">
              <ul className="space-y-3.5 max-[1024px]:space-y-2.5 max-[640px]:space-y-2 text-white text-fs16 max-[1440px]:text-fs15 max-[1366px]:text-[12px] max-[1024px]:text-[13px] max-[640px]:text-[12px] max-[640px]:w-full font-medium">
                <li>
                  <a
                    href="#about"
                    className="hover:text-white/80 transition block w-full"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#terms"
                    className="hover:text-white/80 transition block w-full"
                  >
                    Terms Of Use
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy"
                    className="hover:text-white/80 transition block w-full"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-white/80 transition block w-full"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex-1 min-w-[140px] max-[640px]:w-full">
              <h4 className="text-white text-fs18 max-[1440px]:text-fs17 max-[1024px]:text-[14px] max-[640px]:text-[13px] font-semibold mb-4 max-[1024px]:mb-3">
                Need Help?
              </h4>
              <ul className="space-y-3.5 max-[1024px]:space-y-2.5 max-[640px]:space-y-2 text-white text-fs16 max-[1440px]:text-fs15 max-[1366px]:text-[12px] max-[1024px]:text-[13px] max-[640px]:text-[12px] max-[640px]:w-full font-medium">
                <li>
                  <a
                    href="#help"
                    className="hover:text-white/80 transition block w-full"
                  >
                    Visit Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#feedback"
                    className="hover:text-white/80 transition block w-full"
                  >
                    Share Feedback
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex-1 min-w-[190px] max-[640px]:w-full flex flex-col items-start">
              <h4 className="text-white text-fs18 max-[1440px]:text-fs17 max-[1366px]:text-[12px] max-[1024px]:text-[14px] max-[640px]:text-[13px] font-semibold mb-4 max-[1024px]:mb-3">
                Connect With Us
              </h4>

              <div className="flex items-center gap-4 max-[1024px]:gap-3 mb-4 max-[1024px]:mb-4">
                <a
                  href="#facebook"
                  className="w-7 h-7 max-[1024px]:w-6 max-[1024px]:h-6 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                  title="Facebook"
                >
                  <Image
                    src={fb}
                    alt="Facebook"
                    className="w-full h-full object-contain"
                  />
                </a>
                <a
                  href="#instagram"
                  className="w-7 h-7 max-[1024px]:w-6 max-[1024px]:h-6 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                  title="Instagram"
                >
                  <Image
                    src={insta}
                    alt="Instagram"
                    className="w-full h-full object-contain"
                  />
                </a>
                <a
                  href="#twitter"
                  className="w-7 h-7 max-[1024px]:w-6 max-[1024px]:h-6 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                  title="Twitter"
                >
                  <Image
                    src={twitter}
                    alt="Twitter"
                    className="w-full h-full object-contain"
                  />
                </a>
                <a
                  href="#youtube"
                  className="w-7 h-7 max-[1024px]:w-6 max-[1024px]:h-6 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                  title="YouTube"
                >
                  <Image
                    src={youtube}
                    alt="YouTube"
                    className="w-full h-full object-contain"
                  />
                </a>
              </div>

              <div className="flex items-center gap-3 max-[1024px]:gap-2.5 pt-1 w-full max-w-[240px] max-[1024px]:max-w-[200px]">
                <Image
                  src={googleplay_Icon}
                  alt="Google Play"
                  className="w-[48%] h-auto cursor-pointer hover:opacity-90 transition object-contain"
                />
                <Image
                  src={appstore_Icon}
                  alt="App Store"
                  className="w-[48%] h-auto cursor-pointer hover:opacity-90 transition object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 mt-10 max-[1024px]:mt-8 pt-5 max-[1024px]:pt-4 text-center text-[#8E8E8E] text-[14px] max-[1024px]:text-[12px] max-[640px]:text-[11px] font-normal">
          Copyrights © ZettaRights 2024. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
