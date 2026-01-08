import { fetchAssociatedData } from "@/utils/api";
import { Suspense } from "react";
import AlbinaCommArchive from "../components/AlbinaCommArchive";

export default async function ArchivePage({}) {
  const associatedData = await fetchAssociatedData();

  return(
    <>
      <Suspense>
        <AlbinaCommArchive
          associatedData={associatedData}
        />
      </Suspense>
    </>
  )
}