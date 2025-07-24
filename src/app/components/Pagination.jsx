'use client'

import { useSearchParams, usePathname } from "next/navigation"
import PaginationArrow from "./PaginationArrow"
import Link from "next/link";

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
          <Link
            key={page}
            className={`numEl ${currentPage === page ? "current_page" : ""}`}
            id={page}
            href={createPageURL(page)}
          >
            {page}
          </Link>
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