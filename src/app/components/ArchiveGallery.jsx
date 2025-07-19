import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ArchiveItem from "./ArchiveItem";
import Pagination from "./Pagination";

const ArchiveGallery = ({ isLoaded, isFiltering, isSearching, archiveResults, showPagination, searchTerm, isFocused, setIsFocused, focusedRef, pages }) => {


    if (!isLoaded && isFiltering || !isLoaded && isSearching) {
        return (
            <div className="archive-loader">
                LOADING
                <div className="spinner-box">
                    <div className="pulse-container">
                        <div className="pulse-bubble pulse-bubble-1"></div>
                        <div className="pulse-bubble pulse-bubble-2"></div>
                        <div className="pulse-bubble pulse-bubble-3"></div>
                    </div>
                </div>
            </div>
        )
    } else if (isLoaded && isFiltering && archiveResults.length > 0 || isLoaded && isSearching && archiveResults.length > 0) {
        return (
            <>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{425: 2, 750: 2, 900: 3}}
                >
                    <Masonry gutter={"20px"}>
                        {archiveResults.map((item, index) => (
                        <ArchiveItem
                            key={item.id}
                            item={item}
                            isFocused={isFocused}
                            setIsFocused={setIsFocused}
                            focusedRef={focusedRef}
                        />
                    ))}
                    </Masonry>
                </ResponsiveMasonry>
                { showPagination &&
                    <div className="archive-load-more">
                        {/* <button type="button" onClick={showMoreItems} className="archive-load-more-btn">Load More</button> */}
                        <Pagination
                            totalPages={pages}
                        />
                    </div>
                }
            </>
        )
    } else if (isLoaded && isSearching && archiveResults.length < 1 ) {
        return (
            <div className='no-results'>
                { isFiltering ? <p>Sorry, no results were found that match <b>"{searchTerm}"</b> and the filters you selected</p> : <p>Sorry, no results were found that match <b>"{searchTerm}."</b></p> }
                <div className='suggestions'>
                    <p>Search suggestions:</p>
                    <ul>
                        { isFiltering > 0 && <li>Try selecting fewer filter options</li> }
                        <li>Check your spelling</li>
                        <li>Try more general words or phrases</li>
                        <li>Try a shorter phrase</li>
                        <li>Try different words or phrases that mean the same thing</li>
                    </ul>
                </div>
            </div>
        )
    } else if (isLoaded && isFiltering && archiveResults.length < 1) {
        return (
            <div className='no-results'>
                <p>Sorry, no results were found matching the filters you selected</p>
                <div className='suggestions'>
                    <p>Try selecting fewer filter options, or using the search bar.</p>
                </div>
            </div>
        )
    }
}

export default ArchiveGallery