import { Poppins, Newsreader, Roboto_Mono, } from 'next/font/google';
import IndexPage from './components/IndexPage';
import './styles/application.scss';

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
    <html lang="en" className={`${poppins.variable} ${roboto_mono.variable} ${newsreader.variable}`}>
      <IndexPage />
      <body>
        {children}
      </body>
    </html>
  );
}
