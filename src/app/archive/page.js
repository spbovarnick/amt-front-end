import { fetchAssociatedData } from "@/utils/api";
import { Suspense, useMemo } from "react";
import AlbinaCommArchive from "../components/AlbinaCommArchive";

export default function ArchivePage({}) {

  return(
    <>
      <Suspense>
        <AlbinaCommArchive />
      </Suspense>
    </>
  )
}