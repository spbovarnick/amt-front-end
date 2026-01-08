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
  variable: "--font-sans",
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  adjustFontFallback: false,
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
  weight: "variable",
  adjustFontFallback: false,
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  weight: "variable",
  adjustFontFallback: false,
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto_mono.variable} ${newsreader.variable} ${sfPro.variable}`}>
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
