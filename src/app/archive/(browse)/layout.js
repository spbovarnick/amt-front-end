import DesktopSidebar from "../../components/DesktopSidebar";

export default function ArchiveLayout({ children }) {

  return(
    <div className="archive-layout">
      <DesktopSidebar />
      { children }
    </div>
  )
}