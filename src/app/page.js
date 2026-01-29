import { Suspense } from "react";
import DesktopSidebar from "./components/DesktopSidebar";
import AlbinaCommArchive from "./components/AlbinaCommArchive";
import MainContent from "./components/MainContent";

export default async function Page(){

  return(
    <div className="archive-layout">
      <MainContent />
    </div>
  )
}