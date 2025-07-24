import Link from "next/link"

export default function PaginationNumber ({
  page,
  href,
  isActive,
}) {

  return (
    <Link
      key={page}
      className={`numEl ${isActive ? "current_page" : ""}`}
      id={page}
      href={href}
    >
      {page}
    </Link>
  )
}