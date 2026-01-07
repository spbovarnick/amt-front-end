import logo from "@/../public/images/AMT-Logo.png";
import Image from "next/image";
import Link from "next/link";

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
      <div className="nav-links">
        <Link href={"/"}>HOME</Link>
        <Link href={"/about"}>ABOUT</Link>
        <Link href={"/collections"}>COLLECTIONS</Link>
        <Link href={"/contact"}>CONTACT</Link>
        <Link href={"https://www.albinamusictrust.com/"}>ALBINA MUSIC TRUST</Link>
      </div>
    </nav>
  )
}

export default DesktopNav;