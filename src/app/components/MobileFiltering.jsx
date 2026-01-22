import { AnimatePresence, motion } from "motion/react";
import Drawer from "./Drawer";
import xIcon from "@/../public/images/x-white.svg"
import Image from "next/image";
import { yearOptions, mediumOptions } from "@/utils/actions";

const MobileFiltering = ({
  advancedSearchOpen,
  setAdvancedSearchOpen,
  comm_groups,
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
  exitAdvancedSearchOpenRef,
  mediumSearchParams,
  yearSearchParams,
}) => {

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
            label="Media"
            data={mediumOptions}
            filterCateogry="medium"
            filterSearchParams={mediumSearchParams}
            mediumOrYear={true}
            />
          <Drawer
            label="Year"
            data={yearOptions}
            filterCateogry="year"
            filterSearchParams={yearSearchParams}
            mediumOrYear={true}
          />
          <Drawer
            label="Community Groups"
            data={comm_groups}
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