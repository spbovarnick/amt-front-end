'use client';

import { getCloudfrontUrl } from '@/utils/helpers';
import React, { useLayoutEffect, useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import chevronRight from 'public/images/chevron-right-black.svg'
import chevronLeft from 'public/images/chevron-left-black.svg'
import FullscreenImg from './FullscreenImg';
import Image from 'next/image';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const MediaCarousel = ({item}) => {
    const [fileIndex, setFileIndex] = useState(0);
    const [carouselWidth, setCarouselWidth] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef();
    const swiperRef = useRef(null)

    const divideSlides = (files, offset = 0) => {
        let slideArr = []
        for (let i = 0 + offset; i < files.length; i = i + 5) {
            slideArr.push(files.slice(i, i + 5))
        }
        return slideArr
    }

    function get_url_extension(url) {
        if (typeof url === 'string') {
            return url.split(/[#?]/)[0].split('.').pop().trim();
        } else {
            return ""
        }
    }

    useEffect(() => {
        if (!swiperRef.current) return;

        if (isFullscreen) {
            swiperRef.current.allowTouchMove = false;
            // swiperRef.current.detachEvents();
        } else {
            // swiperRef.current.attachEvents();
            swiperRef.current.allowTouchMove = true;
        }
    }, [isFullscreen]);

    useEffect(() => {
        const handler = () => {
            if (!document.fullscreenElement) {
                setIsFullscreen(false)
            } else {
                setIsFullscreen(true)
            }
        }

        document.addEventListener("fullscreenchange", handler);
        return () => document.removeEventListener("fullscreenchange", handler);
    }, [])

    const getFileType = useCallback((url)=> {
        const validImageTypes = ["jpg", "jpeg", "png"];
        const validVideoTypes = ["mp4", "mov", "qt", "webm"];

        let fileType = get_url_extension(url).toLowerCase();
        if (validImageTypes.includes(fileType)) {
            return "image";
        } else if (validVideoTypes.includes(fileType)) {
            return "video";
        } else if (fileType === "pdf") {
            return "pdf";
        } else {
            return "other";
        }
    },[])

    const { carouselItems, carouselFileNames, redirectBackground } = useMemo (() => {
        const {
            medium,
            medium_photo_urls = [],
            medium_photos_file_names = [],
            content_file_names = [],
            content_file_urls = [],
            redirect_links = [],
            content_redirect,
        } = item || {};

        const slideOffset = medium_photo_urls.length || 0;

        let items = [];
        let filenames = [];

        if (medium_photo_urls.length > 0 && !content_redirect) {
            items = [...medium_photo_urls];
            filenames = [...medium_photos_file_names, ...content_file_names];
        } else {
            filenames = [...content_file_names];
        }

        if (medium === "audio" && !content_redirect && content_file_urls.length > 0) {
            if (content_file_urls.length <= 5) {
                items = [...items, content_file_urls];
            } else {
                const slides = divideSlides(content_file_urls);
                items = [...items, ...slides];

                const dividedNames = divideSlides(content_file_names, slideOffset)
                filenames = [...medium_photos_file_names, ...dividedNames]
            }
        } else {
            items = [...items, ...content_file_urls];
        }

        if (content_redirect) {
            // setRedirectLinks(redirect_links)
            const bg = medium_photo_urls.length > 0 ? medium_photo_urls[0] : undefined;
            if (redirect_links.length <= 5) {
                items = [...items, redirect_links]
            } else {
                const slides = divideSlides(redirect_links)
                items = [...items, ...slides]
            }
            return {
                carouselItems: items,
                carouselFileNames: filenames,
                redirectBackground: bg,
            };
        };
        return {
            carouselItems: items,
            carouselFileNames: filenames,
            redirectBackground: undefined,
        }
    },[item]);

    const processedUrls = useMemo(() => {
        return carouselItems.map((urlOrArray) => {
            if (Array.isArray(urlOrArray)) return urlOrArray;
            return getCloudfrontUrl(urlOrArray, 2000);
        })
    }, [carouselItems])

    useLayoutEffect(() => {
        function handleResize(){
            setCarouselWidth(containerRef.current.offsetWidth || 0)
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    },[containerRef]);

    const audioClipTitle = (idx, clipIdx) => {
        const nameEntry = carouselFileNames[idx];
        if (Array.isArray(nameEntry)) return nameEntry[clipIdx];
        return carouselFileNames[idx + clipIdx];
    }

    if (!carouselItems.length) {
        return (
            <span>Archive item loading...</span>
        )
    }

    return (
        <div
            className={`media-carousel ${isFullscreen ? "fullscreen" : ""}`}
            ref={containerRef}
        >
            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                pagination={{
                    type: "fraction",
                    el: ".content-counter",
                    renderFraction: (currentClass, totalClass) => {
                        return '<span class="' + currentClass + '"></span>' + '/' + '<span class="' + totalClass + '"span></span>';
                    },
                }}
                navigation={{
                    nextEl: ".media-next-btn",
                    prevEl: ".media-prev-btn",
                }}
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                spaceBetween={20}
                className='carousel-content'
                loop={true}
                allowTouchMove={!isFullscreen}
                simulateTouch={!isFullscreen}
                touchStartPreventDefault={false}
            >
            {carouselItems.map((slide, idx) => {
                const rawFilename = carouselFileNames[idx];
                const type = Array.isArray(slide) ? "group" : getFileType(rawFilename);

                return(
                    <SwiperSlide key={idx}>
                        {/* ------------ PHOTO MEDIUM ------------ */}
                        {type === "image" &&
                            <FullscreenImg
                                key={"fullscreen"}
                                src={processedUrls[idx]}
                                defaultWidth={carouselWidth * 2}
                                isFullscreen={isFullscreen}
                            />
                        }
                        {/* ------------ VIDEO MEDIUM ------------ */}
                        {type === "video" &&
                            <video
                            key={fileIndex}
                            controls controlsList="nodownload"
                            className="modalVideo"
                            >
                                <source src={slide} type="video/mp4" />
                                Sorry, your browser doesn't support embedded videos.
                            </video>
                        }
                        {/* ------------ PDF MEDIUM ------------ */}
                        {type === "pdf" &&
                            <iframe
                            className="modalArticle"
                            src={`${item?.content_file_urls[0]}#toolbar=0`}
                            />
                        }
                        {/* ------------ AUDIO MEDIUM ------------ */}
                        {item.medium === "audio" &&
                            !item.content_redirect &&
                            Array.isArray(slide)  &&
                            <div className='audio-container'>
                                {slide.map((clip, clipIdx) => {
                                    return (
                                        <div key={clip} className='clip-container'>
                                            <span>
                                                {audioClipTitle(idx, clipIdx)}
                                            </span>
                                            <audio
                                                controls
                                                controlsList="nodownload"
                                                src={clip}
                                            >
                                                Your browser does not support the
                                                <code>audio</code> element.
                                            </audio>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        {/* ------------ REDIRECTS ------------ */}
                        {item.content_redirect && Array.isArray(slide) &&
                            <div className='redirect-frame'>
                                <div className="list-container">
                                    <ul className='redirect-list'>
                                        {slide.map((rd, rdIdx) => (
                                            <li
                                            key={rdIdx}
                                            className="redirectListItem"
                                            title="Click link to see archive material"
                                            >
                                                <a
                                                    href={rd.url}
                                                    target="_blank"
                                                    className="redirectListItemLink"
                                                    >
                                                    {rd.url_label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* REDIRECT BACKGROUND IMG */}
                                {redirectBackground &&
                                    <Image
                                    src={getCloudfrontUrl(redirectBackground, carouselWidth * 2)}
                                    alt={`Media photo for ${item.title}`}

                                    className="redirect-bg"
                                    sizes="100vw"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                    }}
                                    width={500}
                                    height={500}
                                    />
                                }
                                {!redirectBackground &&
                                    <div
                                    style={{
                                        width: "500px",
                                        height: "33vh",
                                        borderRadius: "4px",
                                        position: "relative",
                                        backgroundColor: "#00000099",
                                    }}
                                    ></div>

                                }
                            </div>
                        }
                </SwiperSlide>
            )
            })}
            </ Swiper>


            {carouselItems.length > 1 &&
                <div className='carousel-ctrls'>
                    <button className='media-carousel-btn media-prev-btn'>
                    <Image

                        src={chevronLeft.src}
                        width={24} height={24}
                        alt="Previous image icon"
                    />
                    </button>
                    <span
                        className='content-counter'
                        style={{
                            bottom: "10px",
                            width: "fit-content",

                        }}
                    ></span>
                    <button className='media-carousel-btn media-next-btn'>
                    <Image

                        src={chevronRight.src}
                        width={24}
                        height={24}
                        alt="Next image icon"
                    />
                    </button>
                </div>
            }
        </div>
    )
}

export default MediaCarousel