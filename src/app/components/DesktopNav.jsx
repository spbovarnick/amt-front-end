import logo from "@/../public/images/AMT-Logo.png";
import Image from "next/image";
import Link from "next/link";
// import DesktopSearch from "./DesktopSearch";

const DesktopNav = ({}) => {

  return (
    <nav className="desktop-nav">
      <div className="nav-banner" >
        <Link href={'/'}>
          <Image
            src={logo}
            alt="AMT Logo"
            className="desktop-nav-logo"
          />
        </Link>
        <Link href={'/'}>
          ALBINA MUSIC TRUST
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link href={"/"}>HOME</Link></li>
        <li><Link href={"/about"}>ABOUT</Link></li>
        <li><Link href={"/archive"}>ARCHIVE</Link></li>
        <li><Link href={"/collections"}>COLLECTIONS</Link></li>
        <li><Link href={"/contact"}>CONTACT</Link></li>
        <li><Link href={"https://www.albinamusictrust.com/"}>ALBINA MUSIC TRUST</Link></li>
        {/* <li><DesktopSearch /></li> */}
      </ul>
      <div>
      </div>
    </nav>
  )
}

export default DesktopNav;