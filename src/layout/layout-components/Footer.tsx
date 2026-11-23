import Image from "../../components/common/Image";
import footer_Logo from "../../assets/images/Home/Footer/footer_Logo.png";
import footer_Logo_light from "../../assets/images/Home/Footer/footer_Logo_light.png";
import footer_Pattern from "../../assets/images/Home/Footer/footer_Pattern.png";
import fb from "../../assets/images/Home/Footer/fb.png";
import insta from "../../assets/images/Home/Footer/insta.png";
import twitter from "../../assets/images/Home/Footer/twitter.png";
import youtube from "../../assets/images/Home/Footer/youtube.png";
import googleplay_Icon from "../../assets/images/Home/Footer/googleplay_Icon.png";
import appstore_Icon from "../../assets/images/Home/Footer/appstore_Icon.png";

const Footer = () => {
  return (
    <footer className="app-footer relative w-full font-century overflow-hidden mt-auto select-none transition-colors">
      <div
        className="footer-bg-pattern absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${footer_Pattern})`,
        }}
      />

      <div className="relative z-10 w-[93%] max-[1024px]:w-[96%] max-[768px]:w-[98%] max-[480px]:w-full mx-auto px-12 max-[1024px]:px-4 max-[768px]:px-3 max-[480px]:px-2.5 pt-12 max-[1024px]:pt-9 pb-7 max-[1024px]:pb-6">
        <div className="flex max-[1024px]:flex-col justify-between items-start gap-16 max-[1440px]:gap-12 max-[1024px]:gap-8 max-[640px]:gap-6 w-full">
          <div className="w-[32%] max-[1440px]:w-[34%] max-[1024px]:w-full max-[640px]:w-full flex flex-col items-start shrink-0">
            <Image
              src={footer_Logo}
              alt="ZettaRights"
              className="h-9 max-[640px]:h-8 w-[33%] max-[1024px]:w-[28%] max-[640px]:w-auto object-contain footer-logo-dark"
            />
            <Image
              src={footer_Logo_light}
              alt="ZettaRights"
              className="h-9 max-[640px]:h-8 w-[33%] max-[1024px]:w-[28%] max-[640px]:w-auto object-contain footer-logo-light"
            />

            <p className="footer-text text-fs14 max-[1440px]:text-[13px] max-[1024px]:text-[13px] max-[640px]:text-[12px] leading-relaxed mt-4 max-w-sm">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
              Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Sem
              Viverra Aliquet Eget Sit Amet Tellus.
            </p>
          </div>

          <div className="w-[58%] max-[1440px]:w-[58%] max-[1024px]:w-full max-[640px]:w-full flex max-[640px]:flex-col justify-between items-start gap-8 max-[640px]:gap-6">
            <div className="flex-1 min-w-[120px] max-[640px]:w-full">
              <h4 className="footer-heading text-fs16 max-[1440px]:text-fs15 max-[1366px]:text-[14px] max-[1280px]:text-[13px] max-[1024px]:text-[15px] font-bold tracking-tight mb-4 max-[1024px]:mb-3">
                Quick Links
              </h4>
              <ul className="space-y-3 max-[1024px]:space-y-2.5 max-[640px]:space-y-2 text-fs15 max-[1440px]:text-[13px] max-[1024px]:text-[13px] max-[640px]:text-[12px] font-medium">
                <li>
                  <a
                    href="#about"
                    className="footer-link transition-colors duration-200 block w-fit"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#terms"
                    className="footer-link transition-colors duration-200 block w-fit"
                  >
                    Terms Of Use
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy"
                    className="footer-link transition-colors duration-200 block w-fit"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="footer-link transition-colors duration-200 block w-fit"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex-1 min-w-[140px] max-[640px]:w-full">
              <h4 className="footer-heading text-fs16 max-[1440px]:text-fs15  max-[1366px]:text-[14px] max-[1280px]:text-[13px] max-[1024px]:text-[15px] font-bold tracking-tight mb-4 max-[1024px]:mb-3">
                Need Help?
              </h4>
              <ul className="space-y-3 max-[1024px]:space-y-2.5 max-[640px]:space-y-2 text-fs15 max-[1440px]:text-[13px] max-[1024px]:text-[13px] max-[640px]:text-[12px] font-medium">
                <li>
                  <a
                    href="#help"
                    className="footer-link transition-colors duration-200 block w-fit"
                  >
                    Visit Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#feedback"
                    className="footer-link transition-colors duration-200 block w-fit"
                  >
                    Share Feedback
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex-1 min-w-[200px] max-[640px]:w-full flex flex-col items-start">
              <h4 className="footer-heading text-fs16 max-[1440px]:text-fs15  max-[1366px]:text-[14px] max-[1280px]:text-[13px] max-[1024px]:text-[15px] font-bold tracking-tight mb-4 max-[1024px]:mb-3">
                Connect With Us
              </h4>

              <div className="flex items-center gap-3 mb-4.5">
                <a
                  href="#facebook"
                  className="footer-social-btn w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
                  title="Facebook"
                >
                  <Image
                    src={fb}
                    alt="Facebook"
                    className="w-4 h-4 object-contain"
                  />
                </a>
                <a
                  href="#instagram"
                  className="footer-social-btn w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
                  title="Instagram"
                >
                  <Image
                    src={insta}
                    alt="Instagram"
                    className="w-4 h-4 object-contain"
                  />
                </a>
                <a
                  href="#twitter"
                  className="footer-social-btn w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
                  title="Twitter"
                >
                  <Image
                    src={twitter}
                    alt="Twitter"
                    className="w-4 h-4 object-contain"
                  />
                </a>
                <a
                  href="#youtube"
                  className="footer-social-btn w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
                  title="YouTube"
                >
                  <Image
                    src={youtube}
                    alt="YouTube"
                    className="w-4 h-4 object-contain"
                  />
                </a>
              </div>

              <div className="flex items-center gap-3 pt-1 w-full max-w-[240px] max-[1024px]:max-w-[200px]">
                <div className="footer-store-badge flex-1 h-9 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-95">
                  <Image
                    src={googleplay_Icon}
                    alt="Google Play"
                    className="w-full h-full object-contain pointer-events-none select-none"
                  />
                </div>
                <div className="footer-store-badge flex-1 h-9 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-95">
                  <Image
                    src={appstore_Icon}
                    alt="App Store"
                    className="w-full h-full object-contain pointer-events-none select-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar border-t mt-10 max-[1024px]:mt-8 pt-5 max-[1024px]:pt-4 flex max-[640px]:flex-col items-center justify-center gap-2.5 text-[13px] max-[1024px]:text-[12px] max-[640px]:text-[11px] font-normal">
          <p className="footer-copyright text-center">
            Copyrights © ZettaRights {new Date().getFullYear()}. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
