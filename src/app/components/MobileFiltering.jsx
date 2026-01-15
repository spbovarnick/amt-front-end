// "use client";

import { AnimatePresence, motion } from "motion/react";
import Drawer from "./Drawer";
import xIcon from "@/../public/images/x-white.svg"
import Image from "next/image";
// import { useEffect, useRef, useState } from "react";

const MobileFiltering = ({
  advancedSearchOpen,
  setAdvancedSearchOpen,
  mobileDrawerRef,
  commGroups,
  people,
  locations,
  tags,
  collections,
  commGroupsSearchParams,
  peopleSearchParams,
  locationsSearchParams,
  tagsSearchParams,
  collectionsSearchParams,
  advancedSearchOpenRef,
  exitAdvancedSearchOpenRef
}) => {
  // const [bodyHeight, setBodyHeight] = useState(0)
  // const bodyHeightRef = useRef(0)

  // useEffect(() => {
  //   const nav = document?.querySelector(".mobile-nav");
  //   if (!nav) return;

  //   setBodyHeight(document?.body.scrollHeight - nav.scrollHeight)
  // },[])


  // get body height, less nav for underlay
  // const bodyHeight = (document !== 'undefined' && document) && document?.body.scrollHeight - document?.querySelector(".mobile-nav").scrollHeight;

  return (
    <div className="mobile-filter-wrapper">
      <AnimatePresence initial={false} >
        { advancedSearchOpen &&
        <motion.div
          ref={advancedSearchOpenRef}
          className="mobile-filter"
          initial={{ x: "-100%" }}
          exit={{ x: "-150%" }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            bounce: 0
          }}
        >
          <Image
            src={xIcon}
            width={48}
            height={48}
            alt={"X icon"}
            className="mobile-filter__x-icon"
            onClick={() => setAdvancedSearchOpen(false)}
            ref={exitAdvancedSearchOpenRef}
          />
          <Drawer
            label="Community Groups"
            data={commGroups}
            filterCateogry="comm_groups"
            filterSearchParams={commGroupsSearchParams}
          />
          <Drawer
            label="People"
            data={people}
            filterCateogry="people"
            filterSearchParams={peopleSearchParams}
          />
          <Drawer
            label="Location"
            data={locations}
            filterCateogry="locations"
            filterSearchParams={locationsSearchParams}
          />
          <Drawer
            label="Tagged with"
            data={tags}
            filterCateogry="tags"
            filterSearchParams={tagsSearchParams}
          />
          <Drawer
            label="Collections"
            data={collections}
            filterCateogry="collections"
            filterSearchParams={collectionsSearchParams}
          />
        </motion.div>}
      </AnimatePresence>
      <div className="advanced-filter-underlay"
        style={{
          display: advancedSearchOpen ? "block" : "none",
          // height: `${bodyHeight}px`
        }}
      ></div>
    </div>
  )
}

export default MobileFiltering