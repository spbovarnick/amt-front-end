'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import Banner from "@/app/components/Banner"
import Carousel from "@/app/components/Carousel"
import MissionStatement from "@/app/components/MissionStatement"
import { updateArchiveItems, getData, getPageCount } from '@/utils/api';
import { clearAllFilters, createSearchUrl, yearOptions, mediumOptions } from '@/utils/actions';
import searchIcon from "public/images/search-icon.svg";
import Drawer from '@/app/components/Drawer';
import ArchiveGallery from '@/app/components/ArchiveGallery';
import Footer from '@/app/components/Footer';
import SelectUI from '@/app/components/SelectUI';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AlbinaCommArchive({ associatedData }) {
  const itemsPerLoad = 20;
  const advancedDrawerRef = useRef(null);
  const mobileDrawerRef = useRef(null);
  const focusedRef = useRef(null);
  const archiveGalleryEl = useRef(null);
  const pathname = usePathname();
  const sP = useSearchParams();
  const searchParams = new URLSearchParams(sP);
  const router = useRouter();

  const locations = associatedData.locations;
  const tags = associatedData.tags;
  const commGroups = associatedData.comm_groups;
  const people = associatedData.people;
  const carouselSlides = associatedData.carousel_slides;
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
      archiveGalleryEl.current?.scrollIntoView({ behavior: "instant" })
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

  useEffect(() => {
    isFiltering > 0 && archiveGalleryEl.current.scrollIntoView({ behavior: "instant" })
  }, [isFiltering])

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

  useEffect(() => {
    if (archiveGalleryEl.current && archiveResults.length > 0 && !focusedRef.current ) {
      archiveGalleryEl.current.scrollIntoView({ behavior: "instant" })
    }
  }, [archiveGalleryEl, archiveResults])

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

  async function handleSubmitSearch(e) {
    e.preventDefault();
    // searching clears filters effect hooks and sets currentPage to 0, effectively beginning user interaction with archive db
    clearAllFilters(searchParams);
    // close advanced drawer if open
    setAdvancedDrawerHeight(0);
    // set 'search' param with searchTerm
    searchParams.set("search", searchTerm);
    // navigate to new URL based on updated params
    const searchPath = searchParams.toString();
    searchParams.delete("page");
    startTransition(() => {
      router.push(`${pathname}?${searchPath}`, { scroll: false });
    });
  }

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
      {/* <Banner
        themeLight={false}
        alignLeft={true}
        headline="Albina<br/>Community Archive"
        subtitle="Documenting Albina's historic arts and culture legacy"
        className="--has-graphic --is-archive"
      /> */}
      {/* <MissionStatement
        text="Developed by Albina Music Trust, the Albina Community Archive is a digital repository documenting Albina's arts and culture legacy. Our mission is to engage community members and mission-aligned organizations to preserve digital versions of the Albina community's historical materials. We encourage you to revisit the archive as new items are added on a regular basis. These items include photography, film, audio, articles, and printed materials."
      /> */}
      {/* <Carousel
        slides={carouselSlides}
        onPage={false}
      /> */}
      <section className="archive-wrapper">
        <div className="archive-content global-container">
          <div className="archive-search" id="archive-search">
            <div className="archive__label">Search</div>
            <form onSubmit={(e) => {
              handleSubmitSearch(e)
            }
            }
              className="archive__search-form"
            >
              <div className="search-field-container">
                <input value={searchTerm} type="text" name="search" className="archive__search-field" onChange={e => setSearchTerm(e.target.value)} />
                {searchTerm &&
                  <button
                    type='button'
                    id='clear-search'
                    onClick={clearSearch}
                  >
                    <span id='clear-search-text'>clear</span>
                    <span id='clear-search-x'>x</span>
                  </button>
                }
              </div>
              <div>
                <button type="submit" className="archive__search-submit button-round --secondary">
                  <Image className='search-button-icon' src={searchIcon.src} width={24} height={24} alt={"Search icon"} />
                  <span className='search-button-text'>
                    Search
                  </span>
                </button>
              </div>
            </form>
          </div>

          <div className={`archive-tags ${advancedSearchOpen ? "advanced-search-open" : ""}`}>
            <div className="archive-filters">
              <div className="archive-filters__col">
                <div className="archive__label">Year</div>
                <SelectUI
                  placeholderText="Select years..."
                  val={filterYear}
                  year={true}
                  changeHandler={handleYearAndMediumSelect}
                  searchParams={yearSearchParams}
                />
              </div>
              <div className="archive-filters__col">
                <div className="archive__label">Medium</div>
                <SelectUI
                  placeholderText="Select years..."
                  val={filterMedium}
                  medium={true}
                  changeHandler={handleYearAndMediumSelect}
                  searchParams={mediumSearchParams}
                />
              </div>
              <div className="archive-filters__col --clear">
                {Object.values(filters).some(filter => filter.length > 0 || filter > 0) &&
                  <button
                    className='clear-filters button-round sml'
                    onClick={() => {
                      clearAllFilters(searchParams);
                      const newParams = searchParams.toString();
                      router.push(`${pathname}?${newParams}`, { scroll: false })
                    }}
                  >Clear Filters</button>
                }
              </div>
            </div>
            <div className='toggle-clear-ui'>
              <button
                onClick={handleToggleAdvancedDrawer} className="advanced-search__toggle"
              >
                {advancedDrawerHeight > 0 ? "Hide advanced search options" : "Show advanced search options"}
              </button>
              <button
                onClick={() => {
                  setAdvancedSearchOpen(!advancedSearchOpen)
                }}
                className={`advanced-search__toggle-mobile ${advancedSearchOpen ? "advanced-search-open" : ""}`}
              >
                {advancedSearchOpen ? "Hide advanced search options" : "Show advanced search options"}
              </button>
            </div>
            <div ref={mobileDrawerRef} className={`advanced-search__drawer ${advancedSearchOpen ? "advanced-search-open" : ""}`} style={{ height: `${advancedDrawerHeight}px` }}>
              <div ref={advancedDrawerRef}>
                <Drawer
                  label="Community Groups"
                  data={commGroups}
                  pageReset={pageReset}
                  archiveGallery={archiveGalleryEl.current}
                  filterCateogry="comm_groups"
                  filterSearchParams={commGroupsSearchParams}
                />
                <Drawer
                  label="People"
                  data={people}
                  pageReset={pageReset}
                  archiveGallery={archiveGalleryEl.current}
                  filterCateogry="people"
                  filterSearchParams={peopleSearchParams}
                />
                <Drawer
                  label="Location"
                  data={locations}
                  pageReset={pageReset}
                  archiveGallery={archiveGalleryEl.current}
                  filterCateogry="locations"
                  filterSearchParams={locationsSearchParams}
                />
                <Drawer
                  label="Tagged with"
                  data={tags}
                  pageReset={pageReset}
                  archiveGallery={archiveGalleryEl.current}
                  filterCateogry="tags"
                  filterSearchParams={tagsSearchParams}
                />
                <Drawer
                  label="Collections"
                  data={collections}
                  pageReset={pageReset}
                  archiveGallery={archiveGalleryEl.current}
                  filterCateogry="collections"
                  filterSearchParams={collectionsSearchParams}
                />
              </div>
            </div>

          </div>
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