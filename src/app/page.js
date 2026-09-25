import MainContent from "./components/MainContent";
import { getHeroCounts } from "@/utils/api";

export default async function Page(){
  const heroCounts = await getHeroCounts()

  return(
    <>
      <MainContent
        heroCounts={heroCounts}
      />
    </>
  )
}