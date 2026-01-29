import { Suspense } from "react";
import DesktopSidebar from "./components/DesktopSidebar";
import AlbinaCommArchive from "./components/AlbinaCommArchive";

export default async function Page(){

  return(
    <div className="archive-layout">
      {/* <DesktopSidebar /> */}
      <Suspense >
        <AlbinaCommArchive />
      </Suspense>
    </div>
  )
}