import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";

const ScrollToTopOnNavigate = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    document.body.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname, location.search]);

  return <Outlet />;
};

export default ScrollToTopOnNavigate;
