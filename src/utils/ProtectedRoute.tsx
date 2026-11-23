import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const ProtectedRoute = () => {
  const location = useLocation();
  const { isAuthenticated, registrationDraft } = useSelector(
    (state: RootState) => state.auth,
  );

  const isProfileRoute =
    location.pathname.includes("buyer-profile") ||
    location.pathname.includes("seller-profile");

  const isAllowed =
    isAuthenticated || (isProfileRoute && Boolean(registrationDraft));

  if (!isAllowed) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
