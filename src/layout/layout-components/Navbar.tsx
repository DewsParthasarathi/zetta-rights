import { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../store/slices/authSlice";
import type { AppDispatch, RootState } from "../../store/store";
import Image from "../../components/common/Image";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

import logo from "../../assets/images/Home/Header/logo.png";
import logo_light from "../../assets/images/Home/Footer/footer_Logo_light.png";
import search_Icon from "../../assets/images/Home/Header/search_Icon.png";
import addcontent_Icon from "../../assets/images/Home/Header/addcontent_Icon.png";
import lightMode_Icon from "../../assets/images/Home/Header/lightMode_Icon.png";
import moon_Icon from "../../assets/images/Home/Header/moon.png";
import profile_Img from "../../assets/images/Home/Header/profile_Img.png";
import logoutIcon from "../../assets/images/Home/Header/logoutIcon.png";
import hamburger from "../../assets/images/Home/Header/hamburger.png";
import close_Icon from "../../assets/images/Home/Header/close_Icon.png";
import Companylogo from "../../assets/images/Login/Companylogo.png";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  const [isThemeLight, setIsThemeLight] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const isCurrentHome =
    location.pathname === "/" || location.pathname === "/home";
  const isCurrentExplore = location.pathname.startsWith("/explore");
  const isNestedDetailOrOffer =
    location.pathname.startsWith("/movie") ||
    location.pathname.startsWith("/make-offer");

  useEffect(() => {
    if (isCurrentHome) {
      sessionStorage.setItem("nav_origin", "home");
    } else if (isCurrentExplore) {
      sessionStorage.setItem("nav_origin", "explore");
    }
  }, [location.pathname, isCurrentHome, isCurrentExplore]);

  const navState = location.state as { origin?: string; from?: string } | null;
  const origin =
    navState?.origin ||
    (navState?.from?.includes("explore")
      ? "explore"
      : navState?.from === "/" || navState?.from?.includes("home")
        ? "home"
        : sessionStorage.getItem("nav_origin") || "home");

  const isHomeActive =
    isCurrentHome || (isNestedDetailOrOffer && origin === "home");
  const isExploreActive =
    isCurrentExplore || (isNestedDetailOrOffer && origin === "explore");

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);
    document.documentElement.classList.toggle(
      "light",
      currentTheme === "light",
    );
    document.documentElement.classList.toggle("dark", currentTheme === "dark");

    const handleThemeChange = () => {
      setIsThemeLight(localStorage.getItem("theme") === "light");
    };
    window.addEventListener("themechange", handleThemeChange);
    return () => window.removeEventListener("themechange", handleThemeChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    toast.info("Logged out successfully");
    navigate("/auth");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const toggleTheme = () => {
    const nextTheme = isThemeLight ? "dark" : "light";
    setIsThemeLight(!isThemeLight);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.classList.toggle("light", nextTheme === "light");
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.dispatchEvent(new Event("themechange"));
    toast.info(`${nextTheme === "light" ? "Light" : "Dark"} mode active`);
  };

  const displayName =
    user?.fullName ||
    user?.name ||
    user?.companyName ||
    user?.email?.split("@")[0] ||
    "User";

  const profileAvatar = user?.profileImage || Companylogo || profile_Img;

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-[#111826]/95 backdrop-blur-md font-century select-none transition-colors"
    >
      <div className="mx-auto w-[93%] max-[1024px]:w-[96%] max-[768px]:w-[98%] max-[480px]:w-full px-12 max-[1024px]:px-4 max-[768px]:px-3 max-[480px]:px-2.5 h-[72px] max-[640px]:h-[64px] flex items-center justify-between">
        <div className="flex items-center gap-12 max-[1024px]:w-[60%] max-[1024px]:gap-6">
          <Link
            to="/"
            className="flex items-center shrink-0 w-[30%] max-[1024px]:w-[50%] max-[640px]:w-[80%]"
          >
            <Image
              src={logo}
              alt="ZettaRights"
              className="h-9 max-[640px]:h-8 w-auto object-contain cursor-pointer navbar-logo-dark"
            />
            <Image
              src={logo_light}
              alt="ZettaRights"
              className="h-9 max-[640px]:h-8 w-auto object-contain cursor-pointer navbar-logo-light"
            />
          </Link>

          <nav className="flex items-center gap-8 ml-auto max-[1024px]:gap-5 max-[768px]:hidden">
            <Link
              to="/"
              className={`text-fs20 max-[1024px]:text-[14px] font-medium transition relative py-1 ${
                isHomeActive
                  ? "text-[#FABE2C] font-semibold after:content-[''] after:absolute after:bottom-0 after:w-1/2 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-[#FABE2C]"
                  : "text-[#8E8E8E] hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className={`text-fs20 max-[1024px]:text-[14px] font-medium transition relative py-1 ${
                isExploreActive
                  ? "text-[#FABE2C] font-semibold after:content-[''] after:absolute after:bottom-0 after:w-[50%] after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-[#FABE2C]"
                  : "text-[#8E8E8E] hover:text-white"
              }`}
            >
              Explore
            </Link>
            <span
              role="link"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
              }}
              className="text-fs20 max-[1024px]:text-[14px] font-medium transition relative py-1 text-[#8E8E8E] hover:text-white cursor-pointer select-none"
            >
              Blog
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-5 max-[640px]:gap-3">
          <div
            className="relative group flex flex-col items-center"
            ref={searchRef}
          >
            <Button
              variant="unstyled"
              type="button"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition cursor-pointer"
            >
              <Image
                src={search_Icon}
                alt="Search"
                className="w-4 h-4 object-contain opacity-90 hover:opacity-100 theme-icon"
              />
            </Button>

            {!isSearchOpen && (
              <div className="absolute top-full mt-2 z-40 pointer-events-none transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible -translate-y-1 group-hover:translate-y-0">
                <div className="relative bg-[#1A2230] text-white text-[12px] font-medium px-2.5 py-1 rounded-[4px] border border-white/15 shadow-xl whitespace-nowrap">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1A2230] border-l border-t border-white/15 rotate-45" />
                  Search
                </div>
              </div>
            )}

            {isSearchOpen && (
              <form
                onSubmit={handleSearchSubmit}
                className="absolute right-0 top-12 z-50 w-72 max-[480px]:w-60 bg-[#161D2A] border border-white/20 rounded-[8px] p-2 shadow-2xl flex items-center gap-2"
              >
                <Input
                  variant="ghost"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, genres..."
                  autoFocus
                  className="w-full bg-black/40 border border-white/20 rounded-[6px] px-3 py-1.5 text-fs14 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FABE2C]"
                />
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  className="px-3 py-1.5 font-semibold text-[12px] rounded-[6px] cursor-pointer h-auto"
                >
                  Go
                </Button>
              </form>
            )}
          </div>

          <div className="relative group flex flex-col items-center">
            <Button
              variant="unstyled"
              type="button"
              onClick={() => {
                if (!isAuthenticated) {
                  navigate("/auth", { state: { from: location } });
                  return;
                }
                const targetProfile =
                  user?.role === "Seller"
                    ? "/seller-profile"
                    : "/buyer-profile";
                navigate(targetProfile);
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition cursor-pointer"
            >
              <Image
                src={addcontent_Icon}
                alt="Add Content"
                className="w-4 h-4 object-contain opacity-90 group-hover:opacity-100 theme-icon"
              />
            </Button>

            <div className="absolute top-full mt-2 z-40 pointer-events-none transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible -translate-y-1 group-hover:translate-y-0">
              <div className="relative bg-[#1A2230] text-white text-[12px] font-medium px-2.5 py-1 rounded-[4px] border border-white/15 shadow-xl whitespace-nowrap">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1A2230] border-l border-t border-white/15 rotate-45" />
                Add Content
              </div>
            </div>
          </div>

          <div className="relative group flex flex-col items-center">
            <Button
              variant="unstyled"
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition cursor-pointer"
            >
              <Image
                src={isThemeLight ? moon_Icon : lightMode_Icon}
                alt="Toggle Theme"
                className="w-4 h-4 object-contain opacity-90 hover:opacity-100 theme-icon"
              />
            </Button>

            <div className="absolute top-full mt-2 z-40 pointer-events-none transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible -translate-y-1 group-hover:translate-y-0">
              <div className="relative bg-[#1A2230] text-white text-[12px] font-medium px-2.5 py-1 rounded-[4px] border border-white/15 shadow-xl whitespace-nowrap">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1A2230] border-l border-t border-white/15 rotate-45" />
                Theme
              </div>
            </div>
          </div>

          <div className="h-6 w-px bg-white/20 mx-1 max-[640px]:hidden" />

          {isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <Button
                variant="unstyled"
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border border-white/30 hover:border-[#FABE2C] transition bg-[#F7D564]">
                  <Image
                    src={profileAvatar}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Button>

              {isProfileOpen && (
                <div className="absolute right-0 top-12 z-50 w-56 bg-[#161D2A] border border-white/20 rounded-[8px] py-2 shadow-2xl">
                  <div className="px-4 py-2 border-b border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-[#F7D564] shrink-0">
                      <Image
                        src={profileAvatar}
                        alt={displayName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[14px] max-[1366px]:text-[12px] font-semibold text-white truncate">
                        {displayName}
                      </p>
                      <p className="text-[12px] text-[#FABE2C] font-medium">
                        {user?.role || "Member"}
                      </p>
                      <p className="text-[12px] text-gray-400 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="py-1 border-b border-white/10">
                    <Link
                      to={
                        user?.role === "Seller"
                          ? "/seller-profile"
                          : "/buyer-profile"
                      }
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full px-4 py-2 text-left text-[14px] max-[1366px]:text-[12px] text-white hover:bg-white/10 flex items-center gap-2.5 transition cursor-pointer"
                    >
                      <span className="font-medium">My Profile</span>
                    </Link>
                  </div>

                  <div className="py-1">
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-[14px] max-[1366px]:text-[12px] text-red-500 hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-2.5 transition cursor-pointer justify-start"
                    >
                      <Image
                        src={logoutIcon}
                        alt="Logout"
                        className="logout-icon w-4 h-4 object-contain"
                      />
                      <span className="font-medium text-red-500">Logout</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              state={{ from: location }}
              className="px-4 py-1.5 bg-[#FABE2C] hover:bg-[#E5AD25] text-black font-extrabold text-[14px] max-[1366px]:text-[12px] rounded-[6px] transition"
            >
              Login
            </Link>
          )}

          <Button
            variant="ghost"
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="hidden max-[768px]:flex w-9 h-9 rounded-full items-center justify-center hover:bg-white/10 transition cursor-pointer"
          >
            <Image
              src={isMobileMenuOpen ? close_Icon : hamburger}
              alt="Menu"
              className="w-5 h-5 object-contain theme-icon"
            />
          </Button>
        </div>
      </div>

      <div
        className={`hidden max-[768px]:grid absolute top-full left-0 w-full transition-[grid-template-rows,opacity] duration-300 ease-in-out z-50 ${
          isMobileMenuOpen
            ? "grid-rows-[1fr] opacity-100 shadow-2xl"
            : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <div className="w-full bg-[#111826] border-t border-white/10 px-6 py-4 space-y-3 shadow-2xl">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-fs15 max-[1024px]:text-[14px] py-1 transition-colors ${
                isHomeActive
                  ? "text-[#FABE2C] font-semibold"
                  : "text-[#8E8E8E] hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/explore"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-fs15 max-[1024px]:text-[14px] py-1 transition-colors ${
                isExploreActive
                  ? "text-[#FABE2C] font-semibold"
                  : "text-[#8E8E8E] hover:text-white"
              }`}
            >
              Explore
            </Link>
            <span
              role="link"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
              }}
              className="block text-fs15 max-[1024px]:text-[14px] py-1 transition-colors text-[#8E8E8E] hover:text-white cursor-pointer select-none"
            >
              Blog
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
