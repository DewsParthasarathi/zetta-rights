import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../store/authSlice";
import type { AppDispatch, RootState } from "../store/store";
import Button from "./common/Button";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  if (location.pathname === "/login" || !isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="border-b px-6 py-4 flex items-center justify-between">
      <nav className="flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold text-blue-600" : "text-gray-600"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            isActive ? "font-bold text-blue-600" : "text-gray-600"
          }
        >
          Explore
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive ? "font-bold text-blue-600" : "text-gray-600"
          }
        >
          Blog
        </NavLink>
      </nav>

      <div className="flex items-center gap-4">
        <span className="text-fs14 text-gray-700">
          Hi, {user?.name || user?.email}
        </span>
        <Button
          variant="danger"
          size="sm"
          onClick={handleLogout}
          className="text-fs14"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
