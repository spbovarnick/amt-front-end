import { Poppins, Newsreader, Roboto_Mono, } from 'next/font/google';
import IndexPage from './components/IndexPage';
import './styles/application.scss';
import ogImg from 'public/images/open-graph-img.jpg'

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

export const metadata = {
  title: "Albina Community Archive",
  description: "Welcome to the Albina Community Archive, a digital repository documenting Albina's arts and culture legacy. Our mission is to engage community members and mission-aligned organizations to preserve digital versions of the Albina community's historical materials. We encourage you to revisit the archive as new items are added on a regular basis. These items include photography, film, audio, articles, and printed materials.",
  metadataBase: 'https://albinacommunityarchive.org/',
  openGraph: {
    images: [ ogImg ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto_mono.variable} ${newsreader.variable}`}>
      <IndexPage />
      <body>
        {children}
      </body>
    </html>
  );
}
