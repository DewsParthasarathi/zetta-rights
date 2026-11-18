import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../store/authSlice";
import type { AppDispatch, RootState } from "../../store/store";
import Image from "../../components/common/Image";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

// Header Assets
import logo from "../../assets/images/Home/Header/logo.png";
import search_Icon from "../../assets/images/Home/Header/search_Icon.png";
import addcontent_Icon from "../../assets/images/Home/Header/addcontent_Icon.png";
import lightMode_Icon from "../../assets/images/Home/Header/lightMode_Icon.png";
import moon_Icon from "../../assets/images/Home/Header/moon.png";
import profile_Img from "../../assets/images/Home/Header/profile_Img.png";
import profileIcon from "../../assets/images/Home/Header/profileIcon.png";
import logoutIcon from "../../assets/images/Home/Header/logoutIcon.png";
import hamburger from "../../assets/images/Home/Header/hamburger.png";
import close_Icon from "../../assets/images/Home/Header/close_Icon.png";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  const [isThemeLight, setIsThemeLight] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    toast.info("Logged out successfully");
    navigate("/login");
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
    setIsThemeLight((prev) => !prev);
    toast.info(isThemeLight ? "Dark theme active" : "Light mode coming soon");
  };

  const displayName =
    user?.fullName ||
    user?.name ||
    user?.companyName ||
    user?.email?.split("@")[0] ||
    "User";

  return (
    <header className="sticky top-0 z-50 w-full bg-[#111826]/95 backdrop-blur-md  font-century select-none transition-colors">
      <div className="mx-auto px-12 max-[1024px]:px-6 max-[640px]:px-4 h-[72px] max-[640px]:h-[64px] flex items-center justify-between">
        {/* Left: ZettaRights Logo */}
        <div className="flex items-center gap-12 max-[1024px]:gap-6">
          <Link to="/" className="flex items-center shrink-0">
            <Image
              src={logo}
              alt="ZettaRights"
              className="h-9 max-[640px]:h-8 w-auto object-contain cursor-pointer"
            />
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="flex items-center gap-8 max-[1024px]:gap-5 max-[768px]:hidden">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-fs15 max-[1024px]:text-fs14 font-medium transition relative py-1 ${
                  isActive
                    ? "text-[#FABE2C] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#FABE2C]"
                    : "text-[#8E8E8E] hover:text-white"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `text-fs15 max-[1024px]:text-fs14 font-medium transition relative py-1 ${
                  isActive
                    ? "text-[#FABE2C] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#FABE2C]"
                    : "text-[#8E8E8E] hover:text-white"
                }`
              }
            >
              Explore
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `text-fs15 max-[1024px]:text-fs14 font-medium transition relative py-1 ${
                  isActive
                    ? "text-[#FABE2C] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#FABE2C]"
                    : "text-[#8E8E8E] hover:text-white"
                }`
              }
            >
              Blog
            </NavLink>
          </nav>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-5 max-[640px]:gap-3">
          {/* Search Icon & Popover with Tooltip */}
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
                className="w-4 h-4 object-contain opacity-90 hover:opacity-100"
              />
            </Button>

            {/* Hover Tooltip (hidden when search form is open) */}
            {!isSearchOpen && (
              <div className="absolute top-full mt-2 z-40 pointer-events-none transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible -translate-y-1 group-hover:translate-y-0">
                <div className="relative bg-[#1A2230] text-white text-fs12 font-medium px-2.5 py-1 rounded-[4px] border border-white/15 shadow-xl whitespace-nowrap">
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
                  className="px-3 py-1.5 font-semibold text-fs13 rounded-[6px] cursor-pointer h-auto"
                >
                  Go
                </Button>
              </form>
            )}
          </div>

          {/* Add Content Icon with Tooltip */}
          <div className="relative group flex flex-col items-center">
            <Button
              variant="unstyled"
              type="button"
              onClick={() => {
                if (user?.role === "Seller") {
                  navigate("/seller-profile");
                } else if (user?.role === "Buyer") {
                  navigate("/buyer-profile");
                } else {
                  navigate("/seller-profile");
                }
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition cursor-pointer"
            >
              <Image
                src={addcontent_Icon}
                alt="Add Content"
                className="w-4 h-4 object-contain opacity-90 group-hover:opacity-100"
              />
            </Button>

            {/* Hover Tooltip */}
            <div className="absolute top-full mt-2 z-40 pointer-events-none transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible -translate-y-1 group-hover:translate-y-0">
              <div className="relative bg-[#1A2230] text-white text-fs12 font-medium px-2.5 py-1 rounded-[4px] border border-white/15 shadow-xl whitespace-nowrap">
                {/* Upward Tooltip Arrow */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1A2230] border-l border-t border-white/15 rotate-45" />
                Add Content
              </div>
            </div>
          </div>

          {/* Theme Toggle Icon with Tooltip */}
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
                className="w-4 h-4 object-contain opacity-90 hover:opacity-100"
              />
            </Button>

            {/* Hover Tooltip */}
            <div className="absolute top-full mt-2 z-40 pointer-events-none transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible -translate-y-1 group-hover:translate-y-0">
              <div className="relative bg-[#1A2230] text-white text-fs12 font-medium px-2.5 py-1 rounded-[4px] border border-white/15 shadow-xl whitespace-nowrap">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1A2230] border-l border-t border-white/15 rotate-45" />
                Theme
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-white/20 mx-1 max-[640px]:hidden" />

          {/* User Profile Avatar & Dropdown */}
          {isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <Button
                variant="unstyled"
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border border-white/30 hover:border-[#FABE2C] transition">
                  <Image
                    src={profile_Img}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Button>

              {isProfileOpen && (
                <div className="absolute right-0 top-12 z-50 w-56 bg-[#161D2A] border border-white/20 rounded-[8px] py-2 shadow-2xl">
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="text-fs14 font-semibold text-white truncate">
                      {displayName}
                    </p>
                    <p className="text-fs12 text-[#FABE2C] font-medium">
                      {user?.role || "Member"}
                    </p>
                    <p className="text-fs12 text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      to={
                        user?.role === "Seller"
                          ? "/seller-profile"
                          : "/buyer-profile"
                      }
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full px-4 py-2 text-left text-fs14 text-white hover:bg-white/10 flex items-center gap-2.5 transition"
                    >
                      <Image
                        src={profileIcon}
                        alt="Profile"
                        className="w-4 h-4 object-contain"
                      />
                      <span>Profile Settings</span>
                    </Link>

                    <Button
                      variant="ghost"
                      type="button"
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-fs14 text-red-400 hover:bg-white/10 flex items-center gap-2.5 transition cursor-pointer justify-start"
                    >
                      <Image
                        src={logoutIcon}
                        alt="Logout"
                        className="w-4 h-4 object-contain brightness-0 invert sepia saturate-[500%] hue-rotate-[320deg]"
                      />
                      <span>Logout</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1.5 bg-[#FABE2C] hover:bg-[#E5AD25] text-black font-semibold text-fs14 rounded-[6px] transition"
            >
              Login
            </Link>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <Button
            variant="ghost"
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="hidden max-[768px]:flex w-9 h-9 rounded-full items-center justify-center hover:bg-white/10 transition cursor-pointer"
          >
            <Image
              src={isMobileMenuOpen ? close_Icon : hamburger}
              alt="Menu"
              className="w-5 h-5 object-contain"
            />
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Nav Menu */}
      {isMobileMenuOpen && (
        <div className="hidden max-[768px]:block w-full bg-[#111826] border-t border-white/10 px-6 py-4 space-y-3">
          <NavLink
            to="/"
            end
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block text-fs15 py-1 ${
                isActive ? "text-[#FABE2C] font-semibold" : "text-[#8E8E8E]"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block text-fs15 py-1 ${
                isActive ? "text-[#FABE2C] font-semibold" : "text-[#8E8E8E]"
              }`
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block text-fs15 py-1 ${
                isActive ? "text-[#FABE2C] font-semibold" : "text-[#8E8E8E]"
              }`
            }
          >
            Blog
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
