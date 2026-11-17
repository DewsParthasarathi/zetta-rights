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
    <footer
      className="relative w-full bg-[#07090D] border-t border-white/10 text-white font-century overflow-hidden mt-auto"
      style={{
        backgroundImage: `url(${footer_Pattern})`,
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for clean contrast */}
      <div className="absolute inset-0 bg-black/75 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand & Description */}
          <div className="space-y-4">
            <Image
              src={footer_Logo}
              alt="ZettaRights"
              className="h-9 w-auto"
            />
            <p className="text-[#8E8E8E] text-fs12 leading-relaxed">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
              Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Sem
              Viverra Aliquet Eget Sit Amet Tellus.
            </p>
          </div>

          {/* Col 2: About Us */}
          <div>
            <h4 className="text-white text-fs15 font-semibold mb-4">
              About Us
            </h4>
            <ul className="space-y-2.5 text-[#8E8E8E] text-fs13">
              <li>
                <a href="#about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition">
                  Terms Of Use
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Need Help? */}
          <div>
            <h4 className="text-white text-fs15 font-semibold mb-4">
              Need Help?
            </h4>
            <ul className="space-y-2.5 text-[#8E8E8E] text-fs13">
              <li>
                <a href="#help" className="hover:text-white transition">
                  Visit Help Center
                </a>
              </li>
              <li>
                <a href="#feedback" className="hover:text-white transition">
                  Share Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect With Us */}
          <div>
            <h4 className="text-white text-fs15 font-semibold mb-4">
              Connect With Us
            </h4>
            <div className="flex items-center gap-3 mb-5">
              <a
                href="#facebook"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FABE2C] flex items-center justify-center transition p-1.5"
              >
                <Image src={fb} alt="Facebook" className="w-full h-full object-contain" />
              </a>
              <a
                href="#instagram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FABE2C] flex items-center justify-center transition p-1.5"
              >
                <Image src={insta} alt="Instagram" className="w-full h-full object-contain" />
              </a>
              <a
                href="#twitter"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FABE2C] flex items-center justify-center transition p-1.5"
              >
                <Image src={twitter} alt="Twitter" className="w-full h-full object-contain" />
              </a>
              <a
                href="#youtube"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FABE2C] flex items-center justify-center transition p-1.5"
              >
                <Image src={youtube} alt="YouTube" className="w-full h-full object-contain" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
              <Image
                src={googleplay_Icon}
                alt="Google Play"
                className="h-9 w-auto cursor-pointer hover:opacity-90 transition"
              />
              <Image
                src={appstore_Icon}
                alt="App Store"
                className="h-9 w-auto cursor-pointer hover:opacity-90 transition"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-[#777777] text-fs12 font-medium">
          Copyrights © ZettaRights 2024. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
