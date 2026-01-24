import DesktopFiltering from "./DesktopFiltering";
import DesktopSearch from "./DesktopSearch";

const DesktopSidebar = ({}) => {


  return (
    <div className="desktop-sidebar">
      <DesktopSearch />
      <DesktopFiltering />
    </div>
  )
}

export default DesktopSidebar