import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";
import './styles/application.scss';
import Footer from "./components/Footer";
import localFont from "next/font/local"
import { AssociatedDataProvider } from "./context/AssociatedDataContext";
import { fetchAssociatedData } from "@/utils/api";
import { Suspense } from "react";
import Nav from "./components/Nav";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-inter",
});

const martinXBold = localFont({
  src: [
    {
      path: "../../public/fonts/Martin/VTCMartinTrial-XBold.woff"
    },

  ],
  variable: "--font-martinXBold",
});

export const metadata = {
  title: "Albina Community Archive",
  description: "Welcome to the Albina Community Archive, a digital repository documenting Albina's arts and culture legacy. Our mission is to engage community members and mission-aligned organizations to preserve digital versions of the Albina community's historical materials.",
  metadataBase: new URL("https://albinacommunityarchive.org"),
};


export default async function RootLayout({ children }) {
  const associatedData = await fetchAssociatedData();

  return (
    <html lang="en" className={`${martinXBold.variable} ${inter.variable}`}>
      <body>
        <Nav />
        <Toaster />
          <Suspense fallback={null}>
            <AssociatedDataProvider value={associatedData} >
              {children}
            </AssociatedDataProvider>
          </Suspense>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
