'use client';

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import chevronRight from 'public/images/chevron-right.svg'
import chevronLeft from 'public/images/chevron-left.svg'
import FullscreenImg from './FullscreenImg';
import Image from 'next/image';

const ModalCarousel = ({item}) => {
    const [fileIndex, setFileIndex] = useState(0);
    const [carouselItems, setCarouselItems] = useState([]);
    const [carouselFileNames, setCarouselFileNames] = useState([]);
    const [slideOffset, setSlideOffset] = useState(0)
    const [redirectLinks, setRedirectLinks] = useState([])
    const [redirectBackground, setRedirectBackground] = useState();
    const [itemTitle, setItemTitle] = useState("");
    const carouselRef = useRef();

    useEffect(() => {
        const {
            medium,
            medium_photo_urls = [],
            medium_photos_file_names = [],
            content_file_names = [],
            content_file_urls = [],
            redirect_links = [],
            content_redirect,
            title,
        } = item;

        let items = [];
        let filenames = [];

        title && setItemTitle(title);

        if (medium_photo_urls.length > 0 && !content_redirect) {
            items = [...medium_photo_urls];
            filenames = [...medium_photos_file_names, ...content_file_names];
            setSlideOffset(medium_photo_urls.length)
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
            setRedirectLinks(redirect_links)
            medium_photo_urls.length > 0 && setRedirectBackground(medium_photo_urls[0]);
            if (redirect_links.length <= 5) {
                items = [...items, redirect_links]
            } else {
                const slides = divideSlides(redirect_links)
                items = [...items, ...slides]
            }
        }

        setCarouselItems(items);
        setCarouselFileNames(filenames);
    }, [item]);

    const validImageTypes = ["jpg", "jpeg", "png"];
    const validVideoTypes = ["mp4", "mov", "qt", "webm"];

    function get_url_extension( url ) {
        if (typeof url === 'string') {
            return url.split(/[#?]/)[0].split('.').pop().trim();
        } else {
            return ""
        }
    }

    function getFileType(url) {
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
    }

    const divideSlides = (files, offset = 0) => {
        let slideArr = []
        for (let i = 0 + offset; i < files.length; i = i + 5) {
            slideArr.push(files.slice(i, i+5))
        }
        return slideArr
    }

    const audioClipTitle = (idx) => {

        return carouselItems.length > 5 ? carouselFileNames[fileIndex][idx] : carouselFileNames[fileIndex + idx]
    }

    const prevImg = () => {
        fileIndex === 0 ? setFileIndex(carouselItems.length - 1) : setFileIndex(fileIndex - 1)
    }

    const nextImg = () => {
        fileIndex === carouselItems.length - 1 ? setFileIndex(0) : setFileIndex(fileIndex + 1)
    }

    const carouselWidth = carouselRef.current?.offsetWidth;

    let carousel
    if (carouselItems.length) {
        carousel = <div className='modal-carousel' >
            { carouselItems.length > 1 &&
                <Image
                    className='modal-carousel-btns'
                    src={chevronLeft.src}
                    width={24} height={24}
                    alt="Previous image icon"
                    onClick={prevImg}
                />
            }
            <div className='carousel-content' ref={carouselRef}>
                {getFileType(carouselFileNames[fileIndex]) === "image" &&
                    <FullscreenImg
                        imgPath={carouselItems[fileIndex]}
                        defaultWidth={carouselWidth * 2}
                        prevImg={prevImg}
                        nextImg={nextImg}
                        fileIndex={fileIndex}
                        carouselItems={carouselItems}
                    />
                }
                { getFileType(carouselFileNames[fileIndex]) === "video" &&
                    <video
                        key={fileIndex}
                        controls controlsList="nodownload"
                        className="modalVideo"
                    >
                        <source src={carouselItems[fileIndex]} type="video/mp4" />
                        Sorry, your browser doesn't support embedded videos.
                    </video>
                }
                {getFileType(carouselFileNames[fileIndex]) === "pdf" &&
                    <iframe
                        className="modalArticle"
                        src={`${item?.content_file_urls[0]}#toolbar=0`}
                    />
                }
                {item.medium === "audio" && !item.content_redirect && typeof carouselItems[fileIndex] === 'object'  &&
                    <div className='audio-container'>
                        {carouselItems[fileIndex].map((clip, idx) => (
                            <div key={clip} className='clip-container'>
                                <span>{audioClipTitle(idx)}</span>
                                <audio
                                controls
                                controlsList="nodownload"
                                src={clip}>
                                    Your browser does not support the
                                    <code>audio</code> element.
                                </audio>
                            </div>
                        ))}
                    </div>
                }
                {item.content_redirect && typeof carouselItems[fileIndex] === 'object' &&
                    <div className='redirect-frame'>
                        <div className="list-container">
                            <ul className='redirect-list'>
                                {carouselItems[fileIndex].map((rd, idx) => (
                                    <li
                                        key={idx}
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
                        {redirectBackground && <Image
                            src={redirectBackground}
                            sizes="50vw"
                            alt={`Media photo for ${itemTitle}`}
                            className="redirect-bg"
                            style={{
                                width: "100%",
                                height: "auto",
                            }}
                            width={500}
                            height={500}
                        />}
                    </div>
                }
                {carouselItems.length > 1 && <span className='content-counter'>{fileIndex + 1}/{carouselItems.length}</span>}
            </div>
            {carouselItems.length > 1 && <Image className='modal-carousel-btns' src={chevronRight.src} width={24} height={24} alt="Next image icon" onClick={nextImg} />}
        </div>
    } else {
        carousel = <span>Archive item loading...</span>
    }

    return (
        <>
        {carousel}
        </>
    )
}

export default ModalCarousel