import React, { useEffect, useState, useRef, memo} from "react";
import { FixedSizeList as List } from "react-window";
import { InView } from "react-intersection-observer";
import audioIcon from 'public/images/timeline-audio-icon.jpg';
import videoIcon from 'public/images/timeline-video-icon.jpg';
import pdfIcon from 'public/images/timeline-pdf-icon.jpg';
import zoomInIcon from 'public/images/zoom-in.svg';
import zoomOutIcon from 'public/images/zoom-out.svg';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCloudfrontUrl } from "@/utils/helpers";
import { fetchTimelineItems } from "@/utils/api";

const Timeline = ({ pageTag, id, setModalItem, setLocations, setIsLoading, isLoading, setViewContent, setViewMap, setViewTimeline, viewPane, pathname, searchParams }) => {
    const activeItemRef = useRef(null)
    const [activeItemIndex, setActiveItemIndex] = useState(null);
    const [screenSize, setScreenSize] = useState(getCurrentWindowWidth());
    const [zoom, setZoom] = useState(0);
    const [itemSize, setItemSize] = useState(250);
    const [zoomOffsetRatio, setZoomOffsetRatio] = useState(null);
    const [preZoomWidth, setPreZoomWidth] = useState(null);
    const [centeredItemId, setCenteredItemId] = useState(null);
    const [hoveredItemId, setHoveredItemId] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [initialPosition, setInitialPosition] = useState(0);
    const [listScrollX, setListScrollX] = useState(0);
    const [velocity, setVelocity] = useState(0);
    const [isInertiaScrolling, setIsInertiaScrolling] = useState(false);
    const [initialTime, setInitialTime] = useState(0);
    const [items, setItems] = useState([]);
    const listRef = useRef();
    const innerContainer = useRef();
    const outerContainer = useRef();
    const isMounted = useRef(false);
    const router = useRouter();

    // controls placeholder vs. List visibility
    useEffect(() => {
        items.length > 0 && setIsLoading(false)
    },[items.length])

    useEffect(() => {
        if (items.length === 0 ) {
            (async () => {
                const fetchedTimelineItems = await fetchTimelineItems(pageTag);
                setItems(fetchedTimelineItems)
            })();
        }
    }, []);

    useEffect(() => {
        if (id && !isLoading) {
            // updates index of active item for scrollToItem method
            setActiveItemIndex(findItemIndex(id))
        }
    }, [id, isLoading])

    // scroll to active item on mount
    useEffect(() => {
        listRef.current?.scrollToItem(activeItemIndex, "center")
    }, [activeItemIndex, listRef]);

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentWindowWidth())
        }
        window.addEventListener('resize', updateDimension);

        return(() => {
            window.removeEventListener('resize', updateDimension);
        })
    },[screenSize])

    // on zoom change, update timeline proportions
    useEffect(() => {
        if ( isMounted.current ) {
            if (zoom === 0) {
                setItemSize(250);
            } else if (zoom === 1) {
                setItemSize(200);
            } else if (zoom === 2) {
                setItemSize(150);
            } else if (zoom === 3) {
                setItemSize(100);
            }
            // find width after item dimensions and inner container dimensions update
            let newWidth = innerContainer.current?.offsetWidth
            // scroll to offset based on calculated ratio of scrollOffset and offsetWidth
            if (preZoomWidth !== newWidth && zoomOffsetRatio !== null) {
                listRef.current?.scrollTo(zoomOffsetRatio * newWidth)
            }
        } else {
            isMounted.current = true
        }
    }, [zoom, itemSize, listRef.current, innerContainer.current?.offsetWidth, zoomOffsetRatio, isMounted.current]);

    // List aka FixedSizeList from react-window doesn't accept relevant onMouse events
    // this effect hook attaches mouse event listeners to list scroll container
    useEffect(() => {
        const outer = outerContainer.current;
        if (outer) {
            outer.addEventListener("mousedown", handleDragMouseDown);
            outer.addEventListener("mousemove", handleDragMouseMove);
            outer.addEventListener("mouseup", handleDragMouseUp);
            outer.addEventListener("mouseleave", handleDragMouseLeave);
        }
        return () => {
            if (outer) {
                outer.removeEventListener("mousedown", handleDragMouseDown);
                outer.removeEventListener("mousemove", handleDragMouseMove);
                outer.removeEventListener("mouseup", handleDragMouseUp);
                outer.removeEventListener("mouseleave", handleDragMouseLeave);
            }
        }
        
    }, [outerContainer.current, handleDragMouseDown, handleDragMouseMove, handleDragMouseUp]);

    // give inertia to scroll events, including drag
    useEffect(() => {
        if (isInertiaScrolling) {
            requestAnimationFrame(handleInertiaScrolling);
        }
    }, [isInertiaScrolling, velocity]);

    // cleanup inertia scrolling
    useEffect(() => {
        return () => {
            setIsInertiaScrolling(false);
        }
    }, []);

    function handleDragMouseDown(e) {
        if (isTimelineCard(e.target)) return;
        setIsDragging(true);
        setInitialPosition(e.pageX);
        setInitialTime(performance.now())
        setListScrollX(outerContainer.current.scrollLeft)
    }

    function handleDragMouseMove(e) {
        if (isDragging) {
            const deltaX = initialPosition - e.pageX;
            outerContainer.current.scrollLeft = listScrollX + deltaX;
        }
    }
    
    function handleDragMouseUp(e) {
        if (isDragging) {
            setIsDragging(false);
            const deltaX = initialPosition - e.pageX;
            const deltaT = (performance.now() - initialTime) / 100;
            const velocity = deltaX / deltaT;
            setVelocity(velocity);
            setIsInertiaScrolling(true);
        }
    }

    function isTimelineCard(target) {
        return target.closest('.timelineCard');
    }
    
    function handleDragMouseLeave(e) {
        setIsDragging(false);
        setIsInertiaScrolling(true);
    }

    function handleInertiaScrolling() {
        if (isInertiaScrolling) {
            const friction = 0.7;
            const newVelocity = velocity * friction;

            if (Math.abs(newVelocity) < 0.3) {
                setIsInertiaScrolling(false);
                setVelocity(0);
            } else {
                outerContainer.current.scrollLeft += newVelocity;
                setVelocity(newVelocity);
            }
        }
    }

    function findItemIndex(itemId) {
        return items.findIndex(item => item.id === itemId)
    }

    function getCurrentWindowWidth() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    // gets height of .view-pane, to set List same height of other element inside of modal
    function getCurrentViewPaneDimensions() {
        if (viewPane.current) {
            return {height: viewPane.current?.offsetHeight, width: viewPane.current?.offsetWidth}
        }
    }
    
    // sourcer picker returns some image; users can click media tab to view all contents
    function pickSource(item) {
        if (item.content_file_url && item.medium !== "audio" && item.medium !== "film") {
            return getCloudfrontUrl(item.content_file_url, 1000)
        } else {
            if (item.medium === "audio") {
                return audioIcon;
            } else if (item.medium === "film") {
                return videoIcon;
            } else if (item.medium === "article" || item.medium === "printed material") {
                return pdfIcon;
            }
        }
    }

    // click handler only updates the modalItem, locations and pathname so that users stay in the timeline
    function handleClick(itemId) {
        if (itemId !== id ) {
            setModalItem(null);
            setLocations(null);
            searchParams.set('id', itemId);
            router.push(`${pathname}?${searchParams.toString()}`, { scroll: false })
            setViewContent(true);
            setViewTimeline(false);
            setViewMap(false);
        }
    }

    function findZoomOffset() {
        let width = innerContainer.current.offsetWidth;
        let offset = listRef.current.state.scrollOffset;
        let ratio = offset / width;
        setPreZoomWidth(width);
        setZoomOffsetRatio(ratio);
    }

    function handleZoomIn() {
        findZoomOffset();
        if (zoom > 0) {
            setZoom(zoom - 1)
        } else {
            return
        }
    }
    
    function handleZoomOut() {
        findZoomOffset();
        if (zoom < 3) {
            setZoom(zoom + 1)
        } else {
            return
        }
    }

    function handleDecadeSelect(e) {
        e.preventDefault();
        const lowEnd = parseInt(e.target.id);
        const highEnd = parseInt(e.target.id) + 10;
        let focusIndex = items.findIndex(item => item.year >= lowEnd && item.year < highEnd);
        listRef.current?.scrollToItem(focusIndex, "start");
    }

    // check if decade range exists in timeline dataset
    function checkRangeExists(year) {
        const check = items.findIndex(item => item.year >= year && item.year < year + 10);
        if (check > -1){
            return true
        } else {
            return false
        }
    }

    // .timelineCard onMouseOver handler 
    // hover handled through DOM manipulation in order to be responsive to zoom state
    function handleCardHover(id) {
        setHoveredItemId(id);
        let container = document.querySelector(`#container-${id}`);
        if (zoom <= 1 ) {
            container.style.transform = "scale(1.25)"
        } else if (zoom > 1) {
            container.style.transform = "scale(1.45)";
        }
        container.style.zIndex = "100";
    }
    
    // .timelineCard onMouseLeave handler
    function handleEndCardHover(id) {
        setHoveredItemId(null);
        let container = document.querySelector(`#container-${id}`);
        container.style.transform = "scale(1)";
        container.style.zIndex = "1";
    }

    // when .item-container is centered within .list, .timeline-year.style.visibility = visible
    function handleCentered(inView, entry) {
        const itemId = parseInt(entry.target.id.replace('container-', ''));
        if (inView) {
            setCenteredItemId(itemId);
        } else {
            if (itemId === centeredItemId) {
                setCenteredItemId(null);
            }
        }
    }

    const createDecadeButtons = () => {
        let buttons = []
        for (let i = 1940; i <= 2020; i += 10) {
            if (checkRangeExists(i)) {
                buttons.push(
                    <button 
                        key={i}
                        id={i}
                        className="button-round sml decade-button"
                        type="button" 
                        onClick={(e)=>handleDecadeSelect(e)}
                    >{i}</button>
                )
            }
        }
        return buttons
    } 

    // Column object is memoized to improve performance
    const Column = memo(function Column({ index, style}) {
        const item = items[index]
        return (
            <InView 
                as="div"
                style={style}
                className="item-container"
                onChange={(inView, entry) => { item.id !== hoveredItemId && handleCentered(inView, entry)}}
                rootMargin="0% -50% 0% -50%"
                root={innerContainer.current?.offsetParent}
                id={`container-${item.id}`}
            >                
                <div 
                    className={`timeline-line ${item.date_is_approx && "date_is_approx"}`}
                    style={{
                        visibility: (item.id === centeredItemId && item.id !== hoveredItemId) ? "visible" : "hidden",
                        opacity: (item.id === centeredItemId && item.id !== hoveredItemId) ? "1" : "0",
                    }}
                >
                    <div className={`timeline-year ${item.date_is_approx && "date_is_approx"}`}
                        style={{
                            border:  item.id === id ?  "#5444ec solid 3px" : undefined,
                            borderRadius:  item.id === id ? "8px" : undefined,
                        }} 
                        >
                        {item.year}
                        {item.date_is_approx &&
                            <>
                            <span className="tooltip">Date is approximate<span className="triangle-icon"></span></span>
                            
                            </>
                        }
                    </div>
                </div>
                <div 
                    ref={item.id === id ? activeItemRef : null}
                    className="timelineCard"
                    onClick={() => handleClick(item.id)}
                    key={item.id}
                    style={{
                        border: item.id === id ? "#5444ec solid 3px" : undefined,
                        borderRadius: item.id === id ? "10px" : undefined,
                    }}
                    onMouseOver={() => handleCardHover(item.id)}
                    onMouseLeave={() => handleEndCardHover(item.id)}
                >
                    <div 
                        className="timelineItemTitle" 
                        onClick={() => handleClick(item.id)}
                        style={{
                            cursor: item.id === id ? "default" : "pointer",
                            fontSize: zoom >= 2 ? "12px" : "16px",
                            padding: zoom >=2 ? "5px 10px" : "5px 15px",
                            justifyContent: zoom >= 2 ? "start" : "center",
                        }}
                    >
                        <b>{item.title}</b>
                    </div>
                    <Image 
                        src={ item.poster_image_url && getCloudfrontUrl(item.poster_image_url, 1000) || item.medium_photo_url && getCloudfrontUrl(item.medium_photo_url, 1000) || pickSource(item)} 
                        width={500}
                        height={1200}
                        className="timelineMedia" 
                        style={ !item.poster_image_url && !item.medium_photo_url && !item.content_file_url ? {objectFit:contain} : {objectFit: "cover"}}
                        alt={item.title}
                    />
                    <span className="triangle-icon"></span>
                </div>
            </InView>
        )
    })

    const dragStyling = isDragging ? {cursor: 'grabbing',} : {cursor: 'grab'};
    
    return (
        isLoading ? (
        // if loading show animated placeholder
        <div 
            className='suspenseful-container'
        >
            <div 
                className="timeline-loader"
            >
                <span className="shimmer">LOADING</span>
                <div className="spinner-box">
                    <div className="pulse-container">
                        <div className="pulse-bubble pulse-bubble-1"></div>
                        <div className="pulse-bubble pulse-bubble-2"></div>
                        <div className="pulse-bubble pulse-bubble-3"></div>
                    </div>
                </div>
            </div> 
            </div>
        ) : (
            <div className="list-container">
                <List
                    ref={listRef}
                    innerRef={innerContainer}
                    outerRef={outerContainer}
                    height={"100%"}
                    width={getCurrentViewPaneDimensions().width}
                    itemCount={items.length}
                    itemSize={itemSize}
                    className="list"
                    layout="horizontal"
                    style={dragStyling}
                >
                    {Column}
                </List> 
                    <div className="zoom-actions">
                        <button 
                            className="zoom-button button-round" 
                            onClick={handleZoomIn}
                            disabled={zoom === 0 ? true : false}
                        >
                            <Image src={zoomInIcon.src} width={24} height={24} alt="Zoom in icon" />
                        </button>
                        <button 
                            className="zoom-button button-round" 
                            onClick={handleZoomOut}
                            disabled={zoom === 3 ? true : false}
                        >
                            <Image src={zoomOutIcon.src} width={24} height={24} alt="Zoom out icon"/>
                        </button>
                    </div>
                    <div className="decades-menu">
                        {createDecadeButtons()}
                    </div>
            </div>
        )
    )
}

export default Timeline;