import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../store/authSlice";
import type { AppDispatch, RootState } from "../../store/store";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

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
        {isAuthenticated ? (
          <>
            <span className="text-fs14 text-gray-700">
              Hi, {user?.name || user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-600 text-white rounded text-fs14 hover:bg-red-700 transition cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className="px-3 py-1 bg-blue-600 text-white rounded text-fs14 hover:bg-blue-700 transition"
          >
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Navbar;
