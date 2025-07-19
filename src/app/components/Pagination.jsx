'use client'

import { useSearchParams, usePathname } from "next/navigation"
import PaginationArrow from "./PaginationArrow"

export default function Pagination ({ totalPages }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  // const totalPages = 50
  const pages = Array.from({ length: totalPages}, (_, i) => i + 1);


  const createPageURL = ( pageNumber ) => {
    const params = new URLSearchParams(searchParams)

    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="pagination_controls">
      <PaginationArrow
        href={createPageURL(currentPage - 1)}
        direction="left"
        isDisabled={currentPage <= 1}
      />
      <div className="page_nums">
        {pages.map(page => (
          <div
            key={page}
            className="numEl"
            id={page}
          >
            {page}
          </div>
        ))}
      </div>
      <PaginationArrow
        href={createPageURL(currentPage + 1)}
        direction="right"
        isDisabled={currentPage >= totalPages}
      />
    </div>
  )
}