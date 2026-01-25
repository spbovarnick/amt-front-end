import { fetchAssociatedData } from "@/utils/api";
import Collections from "../components/Collections";
import DesktopSidebar from "../components/DesktopSidebar";

export default async function CollectionsPage({}) {
  const data = await fetchAssociatedData();

  return(
    <div className="collections-layout">
      <DesktopSidebar />
      <Collections
        collections={data.collections}
      />
    </div>
  );
};