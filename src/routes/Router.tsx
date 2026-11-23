import { createBrowserRouter, Navigate } from "react-router-dom";
import ScrollToTopOnNavigate from "../components/common/ScrollToTopOnNavigate";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/home/Home";
import Explore from "../pages/explore/Explore";
import MovieDetail from "../pages/detail/MovieDetail";
import MakeOffer from "../pages/makeOffer/MakeOffer";
import Login from "../pages/login/Login";
import ProfileCompletion from "../pages/profile/ProfileCompletion";
import ProtectedRoute from "../utils/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <ScrollToTopOnNavigate />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Navigate to="/auth" replace />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/buyer-profile",
            element: <ProfileCompletion role="Buyer" />,
          },
          {
            path: "/seller-profile",
            element: <ProfileCompletion role="Seller" />,
          },
        ],
      },
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "explore",
            element: <Explore />,
          },
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: "movie/:id",
                element: <MovieDetail />,
              },
              {
                path: "detail/:id",
                element: <MovieDetail />,
              },
              {
                path: "make-offer/:id",
                element: <MakeOffer />,
              },
              {
                path: "make-an-offer/:id",
                element: <MakeOffer />,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;
