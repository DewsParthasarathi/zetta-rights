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
    <footer className="relative w-full bg-[#111826]  text-white font-century overflow-hidden mt-auto select-none">
      {/* Background Pattern with clear, subtle contrast matching reference UI */}
      <div
        className="absolute inset-0 bg-center bg-repeat opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(${footer_Pattern})`,
        }}
      />

      {/* Main Container - aligned straight with body content padding (px-12 / px-6) on left and right */}
      <div className="relative z-10 w-full mx-auto px-12 max-[1024px]:px-6 max-[640px]:px-4 pt-10 pb-6">
        {/* 2 Separate Main Containers: Logo-Description & Links Container */}
        <div className="flex max-[1024px]:flex-col justify-between items-start gap-16 max-[1440px]:gap-12 max-[1024px]:gap-8 w-full">
          {/* Container 1: Logo & Description (with extra width and increased gap) */}
          <div className="w-[32%] max-[1440px]:w-[34%] max-[1024px]:w-full flex flex-col items-start shrink-0">
            <Image
              src={footer_Logo}
              alt="ZettaRights"
              className="h-9 max-[640px]:h-8 w-auto object-contain"
            />
            {/* Tightly adjusted gap below logo, comfortably wrapped description */}
            <p className="text-[#8E8E8E] text-fs15 max-[1440px]:text-fs14 max-[1024px]:text-fs13 leading-relaxed mt-3 max-w-sm">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
              Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Sem
              Viverra Aliquet Eget Sit Amet Tellus.
            </p>
          </div>

          {/* Container 2: Links Container (holding the 3 link columns on the right) */}
          <div className="w-[58%] max-[1440px]:w-[58%] max-[1024px]:w-full flex justify-between items-start gap-8 max-[640px]:flex-wrap">
            {/* Link Col 1: About Us Links */}
            <div className="flex-1 min-w-[120px]">
              <ul className="space-y-3.5 text-white text-fs16 max-[1440px]:text-fs15 max-[1024px]:text-fs14 font-medium">
                <li>
                  <a href="#about" className="hover:text-white/80 transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-white/80 transition">
                    Terms Of Use
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-white/80 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white/80 transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Link Col 2: Need Help? */}
            <div className="flex-1 min-w-[140px]">
              <h4 className="text-white text-fs18 max-[1440px]:text-fs17 max-[1024px]:text-fs16 font-semibold mb-4">
                Need Help?
              </h4>
              <ul className="space-y-3.5 text-white text-fs16 max-[1440px]:text-fs15 max-[1024px]:text-fs14 font-medium">
                <li>
                  <a href="#help" className="hover:text-white/80 transition">
                    Visit Help Center
                  </a>
                </li>
                <li>
                  <a href="#feedback" className="hover:text-white/80 transition">
                    Share Feedback
                  </a>
                </li>
              </ul>
            </div>

            {/* Link Col 3: Connect With Us */}
            <div className="flex-1 min-w-[190px] flex flex-col items-start">
              <h4 className="text-white text-fs18 max-[1440px]:text-fs17 max-[1024px]:text-fs16 font-semibold mb-4">
                Connect With Us
              </h4>
              {/* Social icons row */}
              <div className="flex items-center gap-4 mb-4">
                <a
                  href="#facebook"
                  className="w-7 h-7 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
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
                  className="w-7 h-7 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
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
                  className="w-7 h-7 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
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
                  className="w-7 h-7 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                  title="YouTube"
                >
                  <Image
                    src={youtube}
                    alt="YouTube"
                    className="w-full h-full object-contain"
                  />
                </a>
              </div>

              {/* Store buttons */}
              <div className="flex items-center gap-3 pt-1 w-full max-w-[240px]">
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

        {/* Bottom divider & copyright */}
        <div className="border-t border-white/15 mt-10 pt-5 text-center text-[#8E8E8E] text-fs14 max-[1440px]:text-fs13 font-normal">
          Copyrights © ZettaRights 2024. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
