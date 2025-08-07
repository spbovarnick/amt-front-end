// used in ArchiveBeta.jsx, Page.jsx, Carousel.jsx
// deletes all searchParams, but has no navigational effect until useNavigate called
export function clearAllFilters(params) {
  // clear all URLSearchParams except 'search'
  params.delete("page")
  params.delete("comm_groups");
  params.delete("people");
  params.delete("locations");
  params.delete("tags");
  params.delete("collections");
  params.delete("year");
  params.delete("medium");
}

export function createSearchUrl({
  searchTerm,
  search,
  filters,
  currentPage,
  itemsPerLoad,
  pageTag = null
}) {
  let searchString;
  searchTerm ? searchString = searchTerm : searchString = search;
  const pageTagsArr = pageTag ? pageTag?.split(", ") : null;
  const pageTagString = pageTagsArr ? pageTagsArr.map((tag) => `&page_tags[]=${encodeURIComponent(tag)}`).join('') : '';
  const yearString = filters.year ? `&year=${filters.year}` : '';
  const mediumString = filters.medium ? `&medium=${filters.medium}` : '';
  const peopleString = filters.people ? filters.people.map((person) => `&people[]=${encodeURIComponent(person.name)}`).join('') : '';
  const locationString = filters.locations ? filters.locations.map((location) => `&locations[]=${encodeURIComponent(location.name)}`).join('') : '';
  const collectionString = filters.collections ? filters.collections.map((collection) => `&collections[]=${encodeURIComponent(collection.name)}`).join('') : '';
  const commGroupString = filters.comm_groups ? filters.comm_groups.map((comm_group) => `&comm_groups[]=${encodeURIComponent(comm_group.name)}`).join('') : '';
  const tagString = filters.tags ? filters.tags.map((tag) => `&tags[]=${encodeURIComponent(tag.name)}`).join('') : '';
  const offset = currentPage < 1 ? currentPage * itemsPerLoad : (currentPage - 1) * itemsPerLoad;
  const url = `/api/v1/archive_items/search?limit=${itemsPerLoad + 1}&offset=${offset}&q=${encodeURIComponent(searchString)}${tagString}${locationString}${yearString}${mediumString}${commGroupString}${peopleString}${collectionString}${pageTagString && pageTagString}`;
  return { url: url, itemsPerLoad: itemsPerLoad }
};

export function generatePagination({ currentPage, totalPages, width }) {
  const truncateMin = width >= 768 ? 10 : 5;

  // if total number of pages is 5 or less, display all pages w/o ellipsis
  if (totalPages <= truncateMin) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  };

  // If currentPage is among first 3 pages, show first 3, an ellipsis, and last 2 pages
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If currentPage is among last 3 pages, show first 2, an ellipsis, and last 3 pages
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If currentPage is in the middle, show first page, ellipsis, current page & neighbors, ellipsis, last page
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ];
};

export const yearOptions = [
  { value: "", label: "Any" },
  { value: 1930, label: "1930s" },
  { value: 1940, label: "1940s" },
  { value: 1950, label: "1950s" },
  { value: 1960, label: "1960s" },
  { value: 1970, label: "1970s" },
  { value: 1980, label: "1980s" },
  { value: 1990, label: "1990s" },
  { value: 2000, label: "2000s" },
  { value: 2010, label: "2010s" },
  { value: 2020, label: "2020s" },
];

export const mediumOptions = [
  { value: "", label: "Any" },
  { value: "photo", label: "Photos" },
  { value: "film", label: "Film" },
  { value: "audio", label: "Audio" },
  { value: "article", label: "Articles" },
  { value: "printed material", label: "Printed Material" }
];