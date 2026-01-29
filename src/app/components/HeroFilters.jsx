"use client";

import { yearOptions, mediumOptions } from "@/utils/actions";
import Drawer from "./Drawer";
import { useSearchParams } from "next/navigation";

const HeroFilter = ({}) => {
  const sP = useSearchParams();
  const searchParams = new URLSearchParams(sP);

  return (
    <div className="hero-drawer-set">
      <Drawer
        label="Media"
        data={mediumOptions}
        filterCateogry="medium"
        filterSearchParams={searchParams.getAll("medium")}
        mediumOrYear={true}
      />
      <Drawer
        label="Year"
        data={yearOptions}
        filterCateogry="year"
        filterSearchParams={searchParams.getAll("year")}
        mediumOrYear={true}
      />
    </div>
  )
}

export default HeroFilter;