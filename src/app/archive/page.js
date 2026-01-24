import { Suspense } from "react";
import AlbinaCommArchive from "../components/AlbinaCommArchive";

export default function ArchivePage({}) {

  return(
    <>
      <Suspense fallback={null}>
        <AlbinaCommArchive />
      </Suspense>
    </>
  )
}