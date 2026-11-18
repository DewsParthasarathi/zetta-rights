import { Outlet } from "react-router-dom";
import Navbar from "./layout-components/Navbar";
import Footer from "./layout-components/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#111826] text-white font-century">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default RootLayout;
