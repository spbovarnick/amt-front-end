import { notFound } from "next/navigation";
import { getAllLocations, getItem } from "@/utils/api";
import ShowItem from "@/app/components/ShowItem";

export default async function ItemIdPage({ params }){
  const { itemId } = await params;

  let item, allLocs;
  try {
    [item, allLocs] = await Promise.all([getItem(itemId), getAllLocations()]);
  } catch {
    notFound();
  }


  return (
    <div className="page-wrapper">
      { item &&
        <ShowItem
          itemData={item}
          allLocs={allLocs}
        />
      }
    </div>
  )
}