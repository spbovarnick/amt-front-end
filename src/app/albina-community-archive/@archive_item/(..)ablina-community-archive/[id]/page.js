'use client';

import ArchiveItemModal from "@/app/components/ArchiveItemModal"
import { useParams } from "next/navigation"

const ArchiveItemModalPage = () => {
  const params = useParams();
  const { id } = params;
  console.log('ping')
  return (
    <>
      <ArchiveItemModal />
    </>
  )
}

export default ArchiveItemModalPage