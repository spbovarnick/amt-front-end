'use client';

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import xIcon from "@/../public/images/x-white.svg";
import { filterFacets } from "@/utils/filterFacetConfig";
import toggleFilterParam from "@/utils/toggleFilterParam";

const AppliedFilters = ({ }) => {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Flatten filter params
  const filters = Object.entries(filterFacets).flatMap(([key, facet]) => {
    const values = sp.getAll(key);

    return values.map(value => ({
      key,
      value,
      label: facet.format(value),
      facetLabel: facet.label,
    }));
  });

  if (filters.length === 0) return null;

  const removeFilter = (key, value) => {
    const next = toggleFilterParam(sp, key, value);
    router.push(`${pathname}?${next}`, { scroll: false });
  };


  console.log (filters)
  return (
    <div className="applied_filters">
      {filters.map(({ key, value, label, facetLabel }) => (
        <button
          key={`${key}:${value}`}
          className="applied_filters-button"
          onClick={() => removeFilter(key, value)}
        >
          <span className="applied_filters-label">{label}</span>
          <Image
            src={xIcon}
            width={16}
            height={16}
            className='applied_filters-btn-xIcon'
            alt="X icon"
          />
        </button>
      ))}
    </div>
  );
};

export default AppliedFilters;