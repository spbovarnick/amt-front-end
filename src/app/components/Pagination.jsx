'use client'

import { useSearchParams } from "next/navigation"
import chevronLeft from "public/images/chevron-left.svg"
import chevronRight from "public/images/chevron-right.svg"
import Image from "next/image"

export default function Pagination ({  }) {

  const pages = 50

  const pageNumbers = (pages) => {
    let numEls = []
    for (let i = 0; i < pages; i++ ) {
      numEls.push(
        <div className="numEl">
          {i+1}
        </div>
      )
    }
    return numEls
  }

  return (
    <div className="pagination_controls">
      <Image
        src={chevronLeft.src}
        width={100}
        height={100}
        alt="Left-pointing chevron"
        className="page-btn page-back-btn"
      />
      <div className="page_nums">
        {pageNumbers(pages)}
      </div>
      <Image
        src={chevronRight.src}
        width={100}
        height={100}
        alt="Left-pointing chevron"
        className="page-btn page-next-btn"
      />
    </div>
  )
}