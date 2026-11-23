import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export interface RequireAuthOptions {
  redirectUrl?: string;
  redirectState?: unknown;
  intendedAction?: string;
  meta?: Record<string, unknown>;
}

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const requireAuth = (
    onAuthenticated: () => void,
    options?: RequireAuthOptions,
  ): boolean => {
    if (isAuthenticated) {
      onAuthenticated();
      return true;
    }

    const fromTarget = options?.redirectUrl
      ? { pathname: options.redirectUrl, state: options.redirectState }
      : location;

    navigate("/auth", {
      state: {
        from: fromTarget,
        intendedAction: options?.intendedAction,
        ...options?.meta,
      },
    });
    return false;
  };

  return { isAuthenticated, requireAuth };
};
