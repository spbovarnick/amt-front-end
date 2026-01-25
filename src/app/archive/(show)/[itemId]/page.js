import { getItem } from "@/utils/api";
import ShowItem from "@/app/components/ShowItem";

export default async function ItemIdPage({ params }){
  const { itemId } = await params
  const item = await getItem(itemId)


  return (
    <div className="page-wrapper">
      <ShowItem
        itemData={item}
      />
    </div>
  )
}