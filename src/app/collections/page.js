import { fetchAssociatedData } from "@/utils/api";
import Collections from "../components/Collections";

export default async function CollectionsPage({}) {
  const data = await fetchAssociatedData();

  return(
    <div className="collections-layout">
      <Collections
        collections={data.collections}
      />
    </div>
  );
};