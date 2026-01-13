'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { updateArchiveItems, getData, getPageCount } from '@/utils/api';
import { createSearchUrl, yearOptions, mediumOptions } from '@/utils/actions';
import ArchiveGallery from '@/app/components/ArchiveGallery';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import filterIcon from "@/../public/images/filter.svg";
import MobileFiltering from './MobileFiltering';

export default function AlbinaCommArchive({ associatedData }) {
  const itemsPerLoad = 20;
  const advancedDrawerRef = useRef(null);
  const mobileDrawerRef = useRef(null);
  const focusedRef = useRef(null);
  const archiveGalleryEl = useRef(null);
  const advancedSearchOpenRef = useRef(null);
  const exitAdvancedSearchOpenRef = useRef(null);
  const pathname = usePathname();
  const sP = useSearchParams();
  const searchParams = new URLSearchParams(sP);
  const router = useRouter();

  const locations = associatedData.locations;
  const tags = associatedData.tags;
  const commGroups = associatedData.comm_groups;
  const people = associatedData.people;
  const collections = associatedData.collections;

  const [search, setSearch] = useState(sP.get("search"));
  const [commGroupsSearchParams, setCommGroupsSearchParams] = useState(searchParams.getAll("comm_groups"));
  const [peopleSearchParams, setPeopleSearchParams] = useState(searchParams.getAll("people"));
  const [locationsSearchParams, setLocationsSearchParams] = useState(searchParams.getAll("locations"));
  const [tagsSearchParams, setTagsSearchParams] = useState(searchParams.getAll("tags"));
  const [collectionsSearchParams, setCollectionsSearchParams] = useState(searchParams.getAll("collections"));
  const [yearSearchParams, setYearSearchParams] = useState(searchParams.get("year"));
  const [mediumSearchParams, setMediumSearchParams] = useState(searchParams.get("medium"));

  const [archiveResults, setArchiveResults] = useState([]);
  const [filterYear, setFilterYear] = useState({ value: "", label: "Any" });
  const [filterMedium, setFilterMedium] = useState({ value: "", label: "Any" });
  const [filterLocations, setFilterLocations] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [filterCommGroups, setFilterCommGroups] = useState([]);
  const [filterPeople, setFilterPeople] = useState([]);
  const [filterCollections, setFilterCollections] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPagination, setShowPagination] = useState(false);
  const [pages, setPages] = useState(0)
  const [advancedDrawerHeight, setAdvancedDrawerHeight] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isFiltering, setIsFiltering] = useState(0);
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const [paramsChecked, setParamsChecked] = useState(false);
  const currentPage = searchParams.get("page");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const clickListener = (e) => {
      if (advancedSearchOpenRef.current && !advancedSearchOpenRef.current?.contains(e.target)) {
          setAdvancedSearchOpen(!advancedSearchOpen)
      }
    }

    document.addEventListener("click", clickListener)

    return () => {
      document.removeEventListener("click", clickListener)
    }
  }, [advancedSearchOpen])

  useEffect(() => {
    // this effect hook only re-hydrates archiveResults from index endpoint
    // when currentPage changes and filters has updated
    (async () => {
      if (isFiltering && !isSearching) {
        // this block only refreshes archiveResults with fresh data when user only toggling filters
        setIsLoaded(false);
        const data = await updateArchiveItems(currentPage, itemsPerLoad, filters)
        const paginationData = await getPageCount({ filterData: filters, itemsPerLoad: itemsPerLoad, })
        paginationData && setPages(paginationData)
        paginationData && setShowPagination(paginationData > 1 || currentPage > 1);
        data && setArchiveResults(data.adjustedResults);
        data && setIsLoaded(true)
      } else if (isSearching) {
        // this block refreshes archiveResults when users have searched and are filtering search results with advanced filter options
        setIsLoaded(false);
        const args = createSearchUrl({
          searchTerm: searchTerm,
          search: search,
          filters: filters,
          currentPage: currentPage,
          itemsPerLoad: itemsPerLoad
        });
        const data = await getData(args.url, args.itemsPerLoad);
        const paginationData = await getPageCount({
          filterData: filters,
          itemsPerLoad: args.itemsPerLoad,
          isSearching: true,
          search,
          searchTerm
        });
        paginationData && setPages(paginationData);
        paginationData && setShowPagination(paginationData > 1);
        data && setArchiveResults(data.adjustedResults);
        data && setIsLoaded(true)
      }
    })();
  }, [filters, isSearching]);

  useEffect(() => {
    // piece of state prevents top-most hook from firing and returning unwanted results too early
    if (!paramsChecked) return;
    // when any state for the filter fields are updated in Drawer.jsx
    // filters state object updates
    setFilters({ ...filters, locations: filterLocations, tags: filterTags, comm_groups: filterCommGroups, people: filterPeople, collections: filterCollections, year: filterYear.value, medium: filterMedium.value });
  }, [filterLocations, filterTags, filterCommGroups, filterPeople, filterCollections, filterYear, filterMedium])

  useEffect(() => {
    // if 'search' URL param present, set isSearching to true and searchTerm to 'search' URL param string
    if (search) {
      setIsSearching(true)
      setSearchTerm(search)
    } else {
      setIsSearching(false)
    }
  }, [search]);

  // hook sets filters based on URL params
  useEffect(() => {
    setParamsChecked(false);
    // .filter depends upon all associated data being hydrated, thus the if... block
    setFilterTags(tags.filter(i => tagsSearchParams.includes(i.name)))
    setFilterCommGroups(commGroups.filter(i => commGroupsSearchParams.includes(i.name)))
    setFilterCollections(collections.filter(i => collectionsSearchParams.includes(i.name)))
    setFilterLocations(locations.filter(i => locationsSearchParams.includes(i.name)))
    setFilterPeople(people.filter(i => peopleSearchParams.includes(i.name)))
    yearSearchParams ? setFilterYear(yearOptions[yearOptions.findIndex(option => option.value == yearSearchParams)]) : setFilterYear({ value: "", label: "Any" })
    mediumSearchParams ? setFilterMedium(mediumOptions[mediumOptions.findIndex(option => option.value == mediumSearchParams)]) : setFilterMedium({ value: "", label: "Any" })
    setIsFiltering(commGroupsSearchParams.length + tagsSearchParams.length + locationsSearchParams.length + peopleSearchParams.length + collectionsSearchParams.length + (yearSearchParams && 1) + (mediumSearchParams && 1));
    setParamsChecked(true);
  }, [commGroupsSearchParams, tagsSearchParams, locationsSearchParams, peopleSearchParams, collectionsSearchParams, yearSearchParams]);

  // useEffect(() => {
  //   isFiltering > 0 && archiveGalleryEl.current.scrollIntoView({ behavior: "instant" })
  // }, [isFiltering])

  // on location change, state updated with .get(), .getAll() URLSearchParams methods, triggers downstream effect hook dependencies
  useEffect(() => {
    setCommGroupsSearchParams(searchParams.getAll("comm_groups"));
    setTagsSearchParams(searchParams.getAll("tags"));
    setLocationsSearchParams(searchParams.getAll("locations"));
    setPeopleSearchParams(searchParams.getAll("people"));
    setCollectionsSearchParams(searchParams.getAll("collections"));
    setYearSearchParams(searchParams.get("year"));
    setMediumSearchParams(searchParams.get("medium"));
    setSearch(searchParams.get("search"));
  }, [sP]);

  function handleClickOutsideMenu(event) {
    if (mobileDrawerRef.current && !mobileDrawerRef.current.contains(event.target)) {
      setAdvancedSearchOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideMenu);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu)
    }
  }, []);

  // useEffect(() => {
  //   if (archiveGalleryEl.current && archiveResults.length > 0 && !focusedRef.current ) {
  //     archiveGalleryEl.current.scrollIntoView({ behavior: "instant" })
  //   }
  // }, [archiveGalleryEl, archiveResults])

  // pageReset is called whenever a filter is selected
  // this ensures that in the effect hook that hydrates archiveResults
  // results are not concatenated to the previous page of results and users get a fresh gallery
  function pageReset() {
    searchParams.delete("page")
    setIsLoaded(false);
  }

  function handleYearAndMediumSelect(val) {
    pageReset();
    let param;
    // check val.value against year and medium options
    // to determine which Select element is being used
    // and set `param`
    yearOptions.forEach((y, i) => {
      if (y.value === val.value) {
        param = 'year';
      };
    });
    mediumOptions.forEach((m, i) => {
      if (m.value === val.value) {
        param = 'medium';
      };
    });
    // if "Any" selected, 'year' or 'medium' param cleared from URL
    if (val.value === ""){
      searchParams.delete(param);
      const newParams = searchParams.toString();
      startTransition(() => {
        router.push(`${pathname}?${newParams}`, { scroll: false });
      });
    } else {
      // sets 'year' or 'medium' URLSearchParam
      searchParams.set(param, val.value);
      // navigates to updated URL
      const newParams = searchParams.toString();
      startTransition(() => {
        router.push(`${pathname}?${newParams}`, { scroll: false });
      });
    };
  };

  function handleToggleAdvancedDrawer() {
    let drawerTargetHeight = 0;
    if (advancedDrawerHeight < 1) {
      drawerTargetHeight = advancedDrawerRef.current.offsetHeight + 30;
    }
    setAdvancedDrawerHeight(drawerTargetHeight);
  }

  // async function handleSubmitSearch(e) {
  //   e.preventDefault();
  //   // searching clears filters effect hooks and sets currentPage to 0, effectively beginning user interaction with archive db
  //   clearAllFilters(searchParams);
  //   // close advanced drawer if open
  //   setAdvancedDrawerHeight(0);
  //   // set 'search' param with searchTerm
  //   searchParams.set("search", searchTerm);
  //   // navigate to new URL based on updated params
  //   const searchPath = searchParams.toString();
  //   console.log("searchPath", searchPath)
  //   console.log("pathname", pathname)
  //   searchParams.delete("page");
  //   startTransition(() => {
  //     router.push(`${pathname}?${searchPath}`, { scroll: false });
  //   });
  // }

  function clearSearch() {
    setSearchTerm('')
    searchParams.delete("search");
    const newParams = searchParams.toString();
    startTransition(() => {
      router.push(`${pathname}?${newParams}`, { scroll: false });
    });
  }

  return (
    <div className="page-wrapper --is-dark">
      <section className="archive-wrapper">
        <div className="archive-content ">
          {/* <div className='advanced-filter'> */}
            <MobileFiltering
              advancedSearchOpen={advancedSearchOpen}
              setAdvancedSearchOpen={setAdvancedSearchOpen}
              mobileDrawerRef={mobileDrawerRef}
              commGroups={commGroups}
              people={people}
              locations={locations}
              tags={tags}
              collections={collections}
              commGroupsSearchParams={commGroupsSearchParams}
              peopleSearchParams={peopleSearchParams}
              locationsSearchParams={locationsSearchParams}
              tagsSearchParams={tagsSearchParams}
              collectionsSearchParams={collectionsSearchParams}
              advancedSearchOpenRef={advancedSearchOpenRef}
              exitAdvancedSearchOpenRef={exitAdvancedSearchOpenRef}
            />
          {/* </div> */}
          {/* <div className={`archive-tags ${advancedSearchOpen ? "advanced-search-open" : ""}`}> */}
            <button
              onClick={() => {
                setAdvancedSearchOpen(!advancedSearchOpen)
              }}
              className={`advanced-search__toggle-mobile ${advancedSearchOpen ? "" : ""}`}
            >
              <Image
                src={filterIcon}
                width={20}
                height={20}
                alt='Filter icon'
                className='mobile-filter-icon'
              />
              Show advanced search options
            </button>
          {/* </div> */}
          {searchTerm && archiveResults.length > 0 &&
            <div className='search-results-for'>Search results for "{searchTerm}"</div>
          }
          <div id="archive-gallery" ref={archiveGalleryEl} className={`${advancedSearchOpen ? "advanced-search-open" : ""}`}>
            <ArchiveGallery
              isLoaded={isLoaded}
              isFiltering={isFiltering}
              isSearching={isSearching}
              archiveResults={archiveResults}
              showPagination={showPagination}
              pages={pages}
              searchTerm={searchTerm}
              isFocused={isFocused}
              setIsFocused={setIsFocused}
              focusedRef={focusedRef}
              isPending={isPending}
            />
          </div>
        </div>
      </section>
    </div>
  )
}