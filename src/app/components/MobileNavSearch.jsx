'use client';

import Image from "next/image";
import searchIcon from "@/../public/images/search-icon.svg";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import chevronLeft from "@/../public/images/chevron-left.svg"
import xIcon from "@/../public/images/x.svg";
import { useRouter } from "next/navigation";


const MobileNavSearch = ({
  searchOpen,
  setSearchOpen,
  menuOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { replace } = useRouter();

  const handleSearch = ( e ) => {
    e.preventDefault();

    if (!searchTerm || searchTerm.length < 1) return;
    const params = new URLSearchParams();
    params.set("search", searchTerm);

    replace(`/archive?${params.toString()}`);

    setSearchOpen(false);
  }

  const clearTerm = (e) => {
    e.preventDefault();
    setSearchTerm("")
  }

  return (
    <div className="search-wrapper">
      <button
        className={`mobile-nav-search-btn fader ${searchOpen ? "hidden" : menuOpen ? "hidden" : "not-hidden"}`}
          onClick={() => setSearchOpen(!searchOpen)}
      >
          <Image
              src={searchIcon.src}
              alt="Magnifying glass icon for search"
              className="mobile-nav-search-icon"
              width={30}
              height={30}
          />
      </button>
      <AnimatePresence initial={false}>
        { searchOpen &&
          <motion.div
            initial={{ x: "-100%" }}
            exit={{ x: "-150%" }}
            animate={{ x: 0 }}
            transition={{
              type: "spring",
              bounce: 0
            }}
            className="search-opened">
            <Image
              src={chevronLeft.src}
              width={30}
              height={30}
              alt="Close search chevron icon"
              className="close-search-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              />
            <form
              className="mobile-nav-search-form"
              onSubmit={e => handleSearch(e)}
            >
              <input
                placeholder="Search the archive"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              { searchTerm.length > 0 &&
                <button className="mobile-nav-clear-search">
                  <Image
                    src={xIcon.src}
                    width={20}
                    height={20}
                    alt="X icon to clear search terms"
                    onClick={e => clearTerm(e)}
                  />
                </button>}
            </form>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default MobileNavSearch