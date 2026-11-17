import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/home/Home";
import Explore from "../pages/explore/Explore";
import Blog from "../pages/blog/Blog";
import Login from "../pages/login/Login";
import ProfileCompletion from "../pages/profile/ProfileCompletion";
import ProtectedRoute from "../utils/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/buyer-profile",
    element: <ProfileCompletion role="Buyer" />,
  },
  {
    path: "/seller-profile",
    element: <ProfileCompletion role="Seller" />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedRoute />,
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
            path: "blog",
            element: <Blog />,
          },
        ],
      },
    ],
  },
]);

export default router;
