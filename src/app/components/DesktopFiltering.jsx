'use client';

import { useAssociatedData } from "../context/AssociatedDataContext";
import { yearOptions, mediumOptions } from "@/utils/actions";
import Drawer from "./Drawer";
import { useSearchParams, usePathname } from "next/navigation";

const DesktopFiltering = ({ }) => {
  const {
    collections,
    comm_groups,
    locations,
    people,
    tags
  } = useAssociatedData();

  const pathname = usePathname();
  const sP = useSearchParams();
  const searchParams = new URLSearchParams(sP);

  console.log(pathname)

  return (
    <div className={`desktop-drawer-set ${pathname === "/archive" ? "on-route" : ""}`}>
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
      <Drawer
        label="Community Groups"
        data={comm_groups}
        filterCateogry="comm_groups"
        filterSearchParams={searchParams.getAll("comm_groups")}
      />
      <Drawer
        label="People"
        data={people}
        filterCateogry="people"
        filterSearchParams={searchParams.getAll("people")}
      />
      <Drawer
        label="Location"
        data={locations}
        filterCateogry="locations"
        filterSearchParams={searchParams.getAll("locations")}
      />
      <Drawer
        label="Tagged with"
        data={tags}
        filterCateogry="tags"
        filterSearchParams={searchParams.getAll("tags")}
      />
      <Drawer
        label="Collections"
        data={collections}
        filterCateogry="collections"
        filterSearchParams={searchParams.getAll("collections")}
      />
    </div>
  );
};

export default DesktopFiltering;