import DesktopFiltering from "./DesktopFiltering";
import DesktopSearch from "./DesktopSearch";
import { Suspense } from "react";

const DesktopSidebar = ({}) => {


  return (
    <div className="desktop-sidebar">
      <Suspense fallback={null}>
        <DesktopSearch />
        <DesktopFiltering />
      </Suspense>
    </div>
  )
}

export default DesktopSidebar