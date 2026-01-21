import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";
import { Poppins, Newsreader, Roboto_Mono, } from 'next/font/google';
import IndexPage from './components/IndexPage';
import MobileNav from "./components/MobileNav";
import './styles/application.scss';
import DesktopNav from "./components/DesktopNav";
import Footer from "./components/Footer";
import DesktopSidebar from "./components/DesktopSidebar";
import localFont from "next/font/local"

const sfPro = localFont({
  src: [
    { path: "../../public/fonts/SF-Pro-Italic.ttf" },
    { path: "../../public/fonts/SF-Pro.ttf" },
  ],
  variable: "--font-sfPro",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` ${sfPro.variable}`}>
      <IndexPage />
      <body>
        <MobileNav />
        <DesktopNav />
        <Toaster />
        <div className="main-content-wrap">
          <DesktopSidebar />
          {children}
        </div>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
