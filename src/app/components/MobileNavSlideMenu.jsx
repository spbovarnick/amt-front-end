import Image from "next/image"
import Link from "next/link";
import Hamburger from "@/../public/images/menu-hamburger.svg";
import { AnimatePresence, motion } from "motion/react";

const MobileNavSlideMenu = ({
  menuOpen,
  setMenuOpen,
  searchOpen
}) => {

  const handleClick = (e) => {
    e.preventDefault();

    setMenuOpen(!menuOpen)
  }

  return(
    <div className="mobile-menu-wrapper">
      { !menuOpen ?
        <Image
            src={Hamburger.src}
            alt="Hamburger menu icon"
            className={`mobile-nav-hamburger-icon`}
            width={30}
            height={30}
            onClick={e => handleClick(e)}
        /> :
        <div
          className="slide-menu-exit"
          onClick={e => handleClick(e)}
        >X</div>
      }
      <AnimatePresence initial={false}>
        { menuOpen &&
          <motion.div
            className="slide-menu"
            initial={{ x: "200%" }}
            exit={{ x: "250%" }}
            animate={{ x: 0 }}
            transition={{
              type: "spring",
              bounce: 0,
            }}
          >
            <ul className="mobile-menu-list">
              <li><Link href={"/"}>HOME</Link></li>
              <li><Link href={"/about"}>ABOUT</Link></li>
              <li><Link href={"/collections"}>COLLECTIONS</Link></li>
              <li><Link href={"/contact"}>CONTACT</Link></li>
              <li><Link href={"https://www.albinamusictrust.com/"}>ALBINA MUSIC TRUST</Link></li>
            </ul>
            <div className="mobile-aux-links-div">
              <ul className="mobile-aux-links-list">
                <Link href={"/collections-dev-policy"}><li>Collections Development Policy</li></Link>
                <Link href={"/terms-and-conditions"}><li>Terms & Conditions</li></Link>
                <Link href={"/privacy-policy"}><li>Privacy Policy</li></Link>
              </ul>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default MobileNavSlideMenu