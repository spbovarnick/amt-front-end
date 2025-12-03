'use client';

import React, { Fragment, useRef } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import { useEffect, useState} from 'react';
import { getItem, getLocations, sendArchiveItemFeedback, fetchTimelineItems } from '@/utils/api';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import ModalCarousel from './ModalCarousel';
import Map from './Map';
import Timeline from './Timeline.jsx';

const ArchiveItemModal = ({ pageTag, focusedRef }) => {
    const router = useRouter();
    const sp = useSearchParams();
    const pathname = usePathname();
    const searchParams = new URLSearchParams(sp);
    const id = searchParams.get('id');
    const modalIsOpen = searchParams.get('modal') === 'true' ? true : false;
    const [modalItem, setModalItem] = useState(null);
    const [viewContent, setViewContent] = useState(true)
    const [viewMap, setViewMap] = useState(false);
    const [locations, setLocations] = useState(null);
    const [viewTimeline, setViewTimeline] = useState(false);
    const [timelineItems, setTimelineItems] = useState([]);
    const [timelineIsLoading, setTimelineIsLoading] = useState(true);
    const [commentValue, setCommentValue] = useState('');
    const [DOMLoaded, setDOMLoaded] = useState(false);
    const viewPaneRef = useRef();
    const tabRef = useRef();

    const currentUrl = usePathname();

    useEffect(() => {
        const appEl = document.getElementsByClassName('page-wrapper')[0];
        setDOMLoaded(true);
        appEl && Modal.setAppElement(document.getElementsByClassName('page-wrapper')[0]);
    }, [])

    useEffect(() => {
        if (id) {
            // setIsOpen(true);
            (async () => {
                const fetchedItem = await getItem(id)
                setModalItem(fetchedItem)
            })();
        } else {
            // setIsOpen(false);
        }
    }, [id]);

    useEffect(() => {
        if (modalItem && modalItem?.locations.length > 0) {
            (async () => {
                const fetchedLocations = await getLocations(modalItem.locations)
                setLocations(fetchedLocations)
            })();
        }
    }, [modalItem]);

    // useEffect(() => {
    //     if ( timelineItems.length === 0 && modalItem?.year ) {
    //         (async () => {
    //             const fetchedTimelineItems = await fetchTimelineItems(pageTag);
    //             setTimelineItems(fetchedTimelineItems)
    //         })();
    //     }
    // },[modalItem?.year]);

    // useEffect(() => {
    //     timelineItems.length > 0 && setTimelineIsLoading(false)
    // },[])

    const handleClose = (e) => {
        e.preventDefault();
        searchParams.delete('modal')
        searchParams.delete('id')
        const newParams = searchParams.toString();
        router.push(`${pathname}?${newParams}`, {scroll: false})
        setModalItem(null);
        setLocations(null);
        setViewContent(true);
        setViewMap(false);
        setViewTimeline(false);
        setTimelineItems([]);
    }

    const selectMediaTab = (e) => {
        if (e.target.id === "media-tab" && !viewContent) {
            setViewContent(true);
            setViewMap(false);
            setViewTimeline(false);
        }
    }

    const selectMapTab = (e) => {
        if (e.target.id === "map-tab" && !viewMap) {
            setViewMap(true);
            setViewContent(false);
            setViewTimeline(false);
        }
    }

    const selectTimelineTab = (e) => {
        if (e.target.id === "timeline-tab" && !viewTimeline) {
            setViewTimeline(true);
            setViewMap(false);
            setViewContent(false);
        }
    }

    async function handleCommentSubmission(e) {
        e.preventDefault();
        const result = await sendArchiveItemFeedback(commentValue, modalItem.title, id)
        if (result.status === "success") {
            alert("Email sent!")
        } else {
            alert("Problem sending email. Please try again or contact us.")
        }
        setCommentValue('');
    }

    // return scroll position to item clicked before modal open
    function afterModalClose() {
        if (focusedRef.current) {
            setTimeout(() => {
                focusedRef.current.scrollIntoView({ behavior: "instant", block: "center" })
            }, ".05")
        }
    }

    return (
        DOMLoaded &&
        <>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={(e) => handleClose(e)}
            className="modal"
            overlayClassName="overlay"
            contentLabel="Archive Modal"
            onAfterClose={afterModalClose}
        >
        <div className='modal'>
            <button className="modalClose" onClick={handleClose}></button>
            <div className="modalContent">
                <div className="modalArchiveItem">
                    <div className="view-pane" ref={viewPaneRef} >
                        {Boolean(viewContent && (modalItem?.content_file_urls[0] || modalItem?.redirect_links[0])) &&
                            <ModalCarousel item={modalItem} tabRef={tabRef.current}/>
                        }
                        {locations && viewMap &&
                            <Map itemLocation={locations} />
                        }
                        {modalItem?.year && viewTimeline &&
                            <Timeline
                                // items={timelineItems}
                                pageTag={pageTag}
                                id={modalItem.id}
                                setModalItem={setModalItem}
                                setLocations={setLocations}
                                setIsLoading={setTimelineIsLoading}
                                isLoading={timelineIsLoading}
                                setViewContent={setViewContent}
                                setViewMap={setViewMap}
                                setViewTimeline={setViewTimeline}
                                viewPane={viewPaneRef}
                                pathname={pathname}
                                searchParams={searchParams}
                            />
                        }
                        <div className="tabs" ref={tabRef}>
                            <button
                                id="media-tab"
                                className={viewContent ? "selected-tab" : undefined}
                                style={{
                                    padding: viewMap ? "8px 13px 8px 8px" : "8px 10px 8px 8px",
                                }}
                                onClick={e => selectMediaTab(e)}
                            >
                                Media
                            </button>
                            <button
                                    id="map-tab"
                                    className={viewMap ? "selected-tab" : undefined}
                                    onClick={e => selectMapTab(e)}
                                    style={{
                                        left: viewContent ? "56px" : "60px"
                                    }}
                                    disabled={modalItem?.locations.length < 1 ? true : false}
                                >
                                    Map
                                </button>
                                <button
                                    id="timeline-tab"
                                    className={viewTimeline ? "selected-tab" : undefined}
                                    onClick={e => selectTimelineTab(e)}
                                    disabled={modalItem?.year ? false : true}
                                >
                                    Timeline
                                </button>
                        </div>
                    </div>

                    <div className={`modalMetaInfo ${locations ? "locations" : ""}`}>
                        {modalItem?.title && (
                            <div className="modalMetaItem">
                                <div className="modalMetaLabel"><span>TITLE:</span></div>
                                {modalItem?.title}
                            </div>
                        )}
                        {modalItem?.year && (
                            <div className="modalMetaItem">
                                <div className="modalMetaLabel"><span>YEAR:</span></div>
                                {modalItem?.year}
                            </div>
                        )}
                        {modalItem?.content_notes.body && (
                            <div className="modalMetaItem">
                                <div className="modalMetaLabel"><span>NOTES:</span></div>
                                <div dangerouslySetInnerHTML={{__html: modalItem.content_notes.body}} />
                            </div>
                        )}

                        {modalItem?.locations.length > 0 && (
                            <div className="modalMetaItem">
                                <div className="modalMetaLabel"><span>LOCATION:</span></div>
                                {modalItem.locations.map((i, idx) => (
                                    <Fragment key={idx} >
                                        <Link href={`${currentUrl}?locations=${encodeURIComponent(i.name)}`}>{i.name}</Link>
                                        {idx < modalItem.locations.length - 1 ? ", " : ""}
                                    </Fragment>
                                ))}
                            </div>
                        )}

                        {modalItem?.tags.length > 0 && (
                            <div className="modalMetaItem">
                                <div className="modalMetaLabel"><span>TAGS:</span></div>
                                {modalItem.tags.map((i, idx) => (
                                    <Fragment key={idx} >
                                        <Link href={`${currentUrl}?tags=${encodeURIComponent(i.name)}`}>{i.name}</Link>
                                        {idx < modalItem.tags.length - 1 ? ", " : ""}
                                    </Fragment>
                                ))}
                            </div>
                        )}

                        {modalItem?.comm_groups.length > 0 && (
                            <div className="modalMetaItem">
                                <div className="modalMetaLabel"><span>COMMUNITY GROUPS:</span></div>
                                {modalItem.comm_groups.map((i, idx) => (
                                    <Fragment key={idx} >
                                        <Link href={`${currentUrl}?comm_groups=${encodeURIComponent(i.name)}`}>{i.name}</Link>
                                        {idx < modalItem.comm_groups.length - 1 ? ", " : ""}
                                    </Fragment>
                                ))}
                            </div>
                        )}

                        {modalItem?.people.length > 0 && (
                            <div className="modalMetaItem">
                                <div className="modalMetaLabel"><span>PEOPLE:</span></div>
                                {modalItem.people.map((i, idx) => (
                                    <Fragment key={idx} >
                                        <Link href={`${currentUrl}?people=${encodeURIComponent(i.name)}`}>{i.name}</Link>
                                        {idx < modalItem.people.length - 1 ? ", " : ""}
                                    </Fragment>
                                ))}
                            </div>
                        )}

                        {modalItem?.collections.length > 0 && (
                            <div className="modalMetaItem">
                                <div className="modalMetaLabel"><span>COURTESY OF:</span></div>
                                {modalItem.collections.map((i, idx) => (
                                    <Fragment key={idx} >
                                        <Link href={`${currentUrl}?collections=${encodeURIComponent(i.name)}`}>{i.name}</Link>
                                        {idx < modalItem.collections.length - 1 ? ", " : ""}
                                    </Fragment>
                                ))}
                            </div>
                        )}

                        {modalItem?.credit?.length > 0 && (
                            <div className="modalMetaItem">
                                <div className="modalMetaLabel"><span>CREDIT:</span></div>
                                {modalItem.credit}
                            </div>
                        )}

                        <div className="modalMetaItem">
                            <div className="modalMetaLabel"><span>RIGHTS:</span></div>
                                See <Link className='rights-links' href="/terms-of-use">Copyright, Terms of Use & Policies</Link> for more information. For all rights holder inquiries, please contact us <a className='rights-links' href='mailto:albinacommunityarchive@gmail.com' target='_blank'>here.</a>
                        </div>

                        <div className="modalMetaItem">
                            <div className="modalMetaLabel"><span>ADDITIONAL INFORMATION:</span></div>
                            <form className='comment-form'>
                                <textarea
                                    value={commentValue}
                                    onChange={e => setCommentValue(e.target.value)}
                                    placeholder="Would you like to contribute to this archive item? Please share here..."
                                />
                                <button
                                    type='submit'
                                    onClick={handleCommentSubmission}
                                    className='button-round .sml --secondary'
                                    disabled={commentValue.length === 0}
                                >Share</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Modal>
        {/* </div> */}
        </>
    )
}

export default ArchiveItemModal