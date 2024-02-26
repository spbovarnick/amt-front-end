"use client";

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useRef } from 'react';
import BannerPage from "@/app/components/BannerPage";
import Carousel from '@/app/components/Carousel';
import MissionStatement from '@/app/components/MissionStatement';
import NavPage from "@/app/components/NavPage";
import ArchiveItemModal from '@/app/components/ArchiveItemModal';
import { yearOptions, mediumOptions, updateArchiveItems, getData, fetchAssociatedData, fetchPageData, clearAllFilters } from '@/utils/api';
import Drawer from "@/app/components/Drawer";
import ArchiveGallery from '@/app/components/ArchiveGallery';
import Footer from "@/app/components/Footer";
import SelectUI from '@/app/components/SelectUI';
import { useSearchParams, usePathname, useRouter, useParams } from 'next/navigation';

export default function OrgPageArchive({ pageData, associatedData }) {
  const itemsPerLoad = 20;
  const advancedDrawerRef = useRef(null);
  const mobileDrawerRef = useRef(null);
  const focusedRef = useRef(null);
  const archiveGalleryEl = useRef(null);
  const pathname = usePathname();
  const sP = useSearchParams();
  const searchParams = new URLSearchParams(sP);
  const router = useRouter();
  const { slug } = useParams();
  const callFromPage = true

  const [search, setSearch] = useState(sP.get("search"));
  const [commGroupsSearchParams, setCommGroupsSearchParams] = useState(sP.getAll("comm_groups"));
  const [peopleSearchParams, setPeopleSearchParams] = useState(sP.getAll("people"));
  const [locationsSearchParams, setLocationsSearchParams] = useState(sP.getAll("locations"));
  const [tagsSearchParams, setTagsSearchParams] = useState(sP.getAll("tags"));
  const [collectionsSearchParams, setCollectionsSearchParams] = useState(sP.getAll("collections"));
  const [yearSearchParams, setYearSearchParams] = useState(sP.get("year"));
  const [mediumSearchParams, setMediumSearchParams] = useState(sP.get("medium"));

  const [archiveResults, setArchiveResults] = useState([]);
  const locations = associatedData.locations;
  const people = associatedData.people;
  const tags = associatedData.tags;
  const carouselSlides = associatedData.page_carousel_slides;
  const collections = associatedData.collections;
  const commGroups = associatedData.comm_groups;

  const [filterYear, setFilterYear] = useState({ value: "", label: "Any" });
  const [filterMedium, setFilterMedium] = useState({ value: "", label: "Any" });
  const [filterLocations, setFilterLocations] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [filterCommGroups, setFilterCommGroups] = useState([]);
  const [filterPeople, setFilterPeople] = useState([]);
  const [filterCollections, setFilterCollections] = useState([])
  const [filters, setFilters] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [advancedDrawerHeight, setAdvancedDrawerHeight] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isFiltering, setIsFiltering] = useState(0);
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const [userLoadsMore, setUserLoadsMore] = useState(false);

  // fetch page data on mount
  useEffect(() => {
    setFilters({ ...filters, pageTag: pageData.tag, pageCollection: pageData.collection });
  }, [pageData]);

  useEffect(() => {
    // this effect hook only re-hydrates archiveResults from pages_index endpoint
    // when currentPage changes AND filters has updated
    (async () => {
      if (isFiltering && !isSearching) {
        // this block only refreshes archiveResults with fresh data when user only toggling filters
        const data = await updateArchiveItems(currentPage, itemsPerLoad, filters, slug);
        data && setIsLoaded(true)
        setShowLoadMore(data.hasMore)
        setArchiveResults(data.adjustedResults);
      } else if (isSearching) {
        // this block refreshes archiveResults when users have searched and are filtering search results with advanced filter options
        const args = createSearchUrl()
        const data = await getData(args.url, args.itemsPerLoad)
        data && setIsLoaded(true)
        setShowLoadMore(data.hasMore)
        setArchiveResults(data.adjustedResults);
      }
    })()
  }, [filters, isSearching])

  useEffect(() => {
    if (currentPage > 0) {
      (async () => {
        if (isFiltering && !isSearching) {
          // this block only refreshes archiveResults with fresh data when user only toggling filters
          const data = await updateArchiveItems(currentPage, itemsPerLoad, filters, slug);
          data && setIsLoaded(true)
          setShowLoadMore(data.hasMore)
          setArchiveResults(currentPage > 0 ? archiveResults.concat(data.adjustedResults) : data.adjustedResults);
        } else if (isSearching) {
          // this block refreshes archiveResults when users have searched and are filtering search results with advanced filter options
          const args = createSearchUrl()
          const data = await getData(args.url, args.itemsPerLoad)
          data && setIsLoaded(true)
          setShowLoadMore(data.hasMore)
          setArchiveResults(currentPage > 0 ? archiveResults.concat(data.adjustedResults) : data.adjustedResults);
        }
      })()
    }
  }, [currentPage])

  useEffect(() => {
    // when any state for the filter fields are updated in Drawer.jsx
    // filters state object updates
    setFilters({ ...filters, locations: filterLocations, people: filterPeople, collections: filterCollections, tags: filterTags, comm_groups: filterCommGroups, year: filterYear.value, medium: filterMedium.value })
  }, [filterLocations, filterPeople, filterCollections, filterTags, filterCommGroups, filterYear, filterMedium])

  useEffect(() => {
    // if 'search' URL param present, set isSearching to true and searchTerm to 'search' URL param string
    if (search) {
      setIsSearching(true)
      setSearchTerm(search)
      archiveGalleryEl.current?.scrollIntoView({ behavior: "smooth" })
    } else {
      setIsSearching(false)
    }
  }, [search]);

  // hook sets filters based on URL params
  useEffect(() => {
    // .filter depends upon all associated data being hydrated, thus the if... block
    // if (!assocDataIsLoading) {
      setFilterTags(tags.filter(i => tagsSearchParams.includes(i.name)))
      setFilterCommGroups(commGroups.filter(i => commGroupsSearchParams.includes(i.name)))
      setFilterCollections(collections.filter(i => collectionsSearchParams.includes(i.name)))
      setFilterLocations(locations.filter(i => locationsSearchParams.includes(i.name)))
      setFilterPeople(people.filter(i => peopleSearchParams.includes(i.name)))
      yearSearchParams ? setFilterYear(yearOptions[yearOptions.findIndex(option => option.value == yearSearchParams)]) : setFilterYear({ value: "", label: "Any" })
      mediumSearchParams ? setFilterMedium(mediumOptions[mediumOptions.findIndex(option => option.value == mediumSearchParams)]) : setFilterMedium({ value: "", label: "Any" })
      setIsFiltering(commGroupsSearchParams.length + tagsSearchParams.length + locationsSearchParams.length + peopleSearchParams.length + collectionsSearchParams.length + (yearSearchParams && 1) + (mediumSearchParams && 1))
    // }
  }, [commGroupsSearchParams, tagsSearchParams, locationsSearchParams, peopleSearchParams, collectionsSearchParams, yearSearchParams]);

  useEffect(() => {
    isFiltering > 0 && archiveGalleryEl.current?.scrollIntoView({ behavior: "smooth" })
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


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideMenu);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu)
    }
  }, []);

  useEffect(() => {
    if (archiveGalleryEl.current && archiveResults.length > 0 && !focusedRef.current && !userLoadsMore) {
      archiveGalleryEl.current.scrollIntoView({ behavior: "smooth" })
    }
    setUserLoadsMore(false);
  }, [archiveGalleryEl, archiveResults])

  // pageReset is called whenever a filter is selected
  // this ensures that in the effect hook that hydrates archiveResults
  // results are not concatenated to the previous page of results and users get a fresh gallery
  function pageReset() {
    setCurrentPage(0);
    setUserLoadsMore(false);
    setIsLoaded(false);
  }

  function handleYearSelect(val) {
    pageReset();
    // if "Any" selected, 'year' param cleared from URL
    if (val.value == "") {
      // deletes 'year' URLSearchParam
      searchParams.delete('year')
      // navigates to updated URL
      const newParams = searchParams.toString();
      router.push(`${pathname}?${newParams}`, { scroll: false });
      setFilterYear({ value: "", label: "Any" })
    } else {
      // sets 'year' URLSearchParam
      searchParams.set('year', val.value)
      // navigates to updated URL
      const newParams = searchParams.toString();
      router.push(`${pathname}?${newParams}`, { scroll: false });
    }
  }

  function handleMediumSelect(val) {
    pageReset();
    // if "Any" selected, 'medium' param cleared from URL
    if (val.value == "") {
      // deletes 'medium' URLSearchParam
      searchParams.delete('medium')
      // navigates to updated URL
      const newParams = searchParams.toString();
      router.push(`${pathname}?${newParams}`, { scroll: false });
    } else {
      // sets 'medium' URLSearchParam
      searchParams.set('medium', val.value)
      // navigates to updated URL
      const newParams = searchParams.toString();
      router.push(`${pathname}?${newParams}`, { scroll: false });
    }
  }

  function showMoreItems() {
    setCurrentPage(currentPage + 1);
    // setting userLoadsMore state controls whether or not gallery will scroll to top in effect hook above
    setUserLoadsMore(true);
  }

  function handleToggleAdvancedDrawer() {
    let drawerTargetHeight = 0;
    if (advancedDrawerHeight < 1) {
      drawerTargetHeight = advancedDrawerRef.current.offsetHeight + 100;
    }
    setAdvancedDrawerHeight(drawerTargetHeight);
  }

  // function creates the query string and params by grabbing values from filters state object
  function createSearchUrl() {
    let searchString
    searchTerm ? searchString = searchTerm : searchString = search;
    // pageTagString necessary to filter search results by content assoc'd to given page
    const pageTagsArr = filters.pageTag?.split(", ");
    const pageTagString = pageTagsArr ? pageTagsArr.map((tag) => `&page_tags[]=${encodeURIComponent(tag)}`).join('') : '';
    const pageCollectionArr = filters.pageCollection?.split(", ");
    const pageCollectionString = pageCollectionArr ? pageCollectionArr.map((tag) => `&page_collections[]=${encodeURIComponent(tag)}`).join('') : '';
    const yearString = filters.year ? `&year=${filters.year}` : '';
    const mediumString = filters.medium ? `&medium=${filters.medium}` : '';
    const peopleString = filters.people ? filters.people.map((person) => `&people[]=${encodeURIComponent(person.name)}`).join('') : '';
    const locationString = filters.locations ? filters.locations.map((location) => `&locations[]=${encodeURIComponent(location.name)}`).join('') : '';
    const collectionString = filters.collections ? filters.collections.map((collection) => `&collections[]=${encodeURIComponent(collection.name)}`).join('') : '';
    // const collectionString = `&collections[]=${encodeURIComponent('Test Collection One')}`;
    const commGroupString = filters.comm_groups ? filters.comm_groups.map((comm_group) => `&comm_groups[]=${encodeURIComponent(comm_group.name)}`).join('') : '';
    const tagString = filters.tags ? filters.tags.map((tag) => `&tags[]=${encodeURIComponent(tag.name)}`).join('') : '';
    const offset = currentPage * itemsPerLoad;
    const url = `/api/v1/archive_items/search?limit=${itemsPerLoad + 1}&offset=${offset}&q=${encodeURIComponent(searchString)}${tagString}${locationString}${yearString}${mediumString}${commGroupString}${peopleString}${collectionString}${pageTagString}${pageCollectionString}`;
    return { url: url, itemsPerLoad: itemsPerLoad }
  }

  async function handleSubmitSearch(e) {
    e.preventDefault();
    // set 'search' param with searchTerm
    searchParams.set("search", searchTerm);
    // navigate to new URL based on updated params
    const searchPath = searchParams.toString();
    router.push(`${pathname}?${searchPath}`, { scroll: false });
    // searching clears filters and sets currentPage to 0, effectively beginning user interaction with archive db
    clearAllFilters(searchParams);
    // close advanced drawer if open
    setAdvancedDrawerHeight(0);
    setCurrentPage(0);
    setIsSearching(true);
    const args = createSearchUrl();
    const data = await getData(args.url, args.itemsPerLoad);
    data && setIsLoaded(true);
    setShowLoadMore(data.hasMore);
    setArchiveResults(currentPage > 0 ? archiveResults.concat(data.adjustedResults) : data.adjustedResults);
  }

  function clearSearch() {
    setSearchTerm('')
    searchParams.delete("search");
    const newParams = searchParams.toString();
    router.push(`${pathname}?${newParams}`, { scroll: false });
  }

  function handleClickOutsideMenu(event) {
    if (mobileDrawerRef.current && !mobileDrawerRef.current.contains(event.target)) {
      setAdvancedSearchOpen(false)
    }
  }

  function renderClearFilterBtn() {
    for (const property in filters) {
      if (property !== 'pageTag' && property !== 'pageCollection') {
        if (filters[property].length > 0) {
          return true
        }
        if (filters[property] > 0) {
          return true
        }
      }
    }
  }

  return (
    <div className="page-wrapper --is-dark">
      <NavPage pageName={pageData?.title} />
      <BannerPage
        themeLight={false}
        alignLeft={true}
        headline={pageData?.title}
        url={pageData?.header_file}
        subtitle={pageData?.subtitle}
        description={pageData?.description.length > 0 ? true : false}
        donate={pageData?.donate_url}
      />
      {pageData?.description &&
        <MissionStatement text={pageData?.description} />
      }

      <Carousel
        slides={carouselSlides}
        onPage={true}
        pageReset={pageReset}
        slidesPerView="1.5"
        pathname={pathname}
        searchParams={searchParams}
      />
      <section className="archive-wrapper">
        <div className="archive-content global-container">
          <div className="archive-search" id="archive-search">
            <div className="archive__label">Search</div>
            <form onSubmit={(e) => { handleSubmitSearch(e) }} className="archive__search-form">
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
                <button type="submit" className="archive__search-submit button-round --secondary">Search</button>
              </div>
            </form>
          </div>
          <div className={`archive-tags ${advancedSearchOpen ? "advanced-search-open" : ""}`}>
            <div className="archive-filters">
              <div className="archive-filters__col">
                <div className="archive__label">Year</div>
                <SelectUI
                  placeholder="Select years..."
                  val={filterYear}
                  year={true}
                  changeHandler={handleYearSelect}
                />
              </div>
              <div className="archive-filters__col">
                <div className="archive__label">Medium</div>
                <SelectUI
                  placeholder="Select medium..."
                  val={filterMedium}
                  medium={true}
                  changeHandler={handleMediumSelect}
                />
              </div>
              <div className="archive-filters__col --clear">
                {renderClearFilterBtn() &&
                  <button
                    className='clear-filters button-round sml'
                    onClick={() => {
                      clearAllFilters(searchParams);
                      const newParams = searchParams.toString();
                      router.push(`${pathname}?${newParams}`, { scroll: false });
                    }}
                  >Clear Filters</button>
                }
              </div>

            </div>
            <div className='toggle-clear-ui'>
              <button
                onClick={handleToggleAdvancedDrawer}
                className="advanced-search__toggle"
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
                {/* <Drawer
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
                /> */}
              </div>
            </div>
          </div>
          <div id="archive-gallery" ref={archiveGalleryEl} className={`${advancedSearchOpen ? "advanced-search-open" : ""}`}>
            <ArchiveGallery
              isLoaded={isLoaded}
              isFiltering={isFiltering}
              isSearching={isSearching}
              archiveResults={archiveResults}
              showLoadMore={showLoadMore}
              showMoreItems={showMoreItems}
              searchTerm={searchTerm}
              isFocused={isFocused}
              setIsFocused={setIsFocused}
              focusedRef={focusedRef}
            />
          </div>
        </div>
      </section>
      <Footer archive={true} mailListLink={pageData?.mail_list_url} mailListName={pageData?.title} />
      {filters.pageTag &&
        <ArchiveItemModal
          focusedRef={focusedRef}
          pageTag={filters.pageTag?.split(",")} />}
    </div >
  );
}