'use client'

import { useSearchParams, usePathname } from "next/navigation"
import chevronLeft from "public/images/chevron-left.svg"
import chevronRight from "public/images/chevron-right.svg"
import Image from "next/image"

export default function Pagination ({ totalPages  }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const params = new URLSearchParams(searchParams)

  // const totalPages = 50
  const pages = Array.from({ length: totalPages}, (_, i) => i + 1);

  const handleNextOrPrev = (e) => {
    const id = e.target.id
    if (id === "next_page") {
      const newPage = currentPage + 1
      params.set('page', newPage.toString() )
    } else {
      const newPage = currentPage - 1
      params.set('page', newPage.toString() )
    }
  }

  const handleNumSelect = () => {

  }

  return (
    <div className="pagination_controls">
      <Image
        src={chevronLeft.src}
        width={100}
        height={100}
        alt="Left-pointing chevron"
        id="prev_page"
        className="page-btn page-back-btn"
        onClick={handleNextOrPrev}
      />
      <div className="page_nums">
        {pages.map(page => (
          <div
            key={page}
            className="numEl"
            id={page}
            onClick={handleNumSelect}
          >
            {page}
          </div>
        ))}
      </div>
      <Image
        src={chevronRight.src}
        width={100}
        height={100}
        alt="Left-pointing chevron"
        className="page-btn page-next-btn"
        id="next_page"
        onClick={handleNextOrPrev}
      />
    </div>
  )
}