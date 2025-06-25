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
    const [carouselContentTypes, setCarouselContentTypes] = useState([]);
    const [audioIndexer, setAudioIndexer] = useState(0);
    const carouselRef = useRef();

    // useEffect(() => {
    //         // remove query params from urls
    //         const basicUrls = item.content_file_urls?.map((url) => url.split('?')[0]);
    //         setCarouselFileNames([...item.medium_photos, ...basicUrls]);
    // }, []);

    // useEffect(() => {
    //     if (item.medium_photo_urls) {
    //         setCarouselItems([...item.medium_photo_urls]);
    //     }
    // }, [item]);

    useEffect(() => {
        // remove query params from urls
        const basicUrls = item.content_file_urls?.map((url) => url.split('?')[0]);
        setCarouselFileNames([...item.medium_photo_urls, ...basicUrls]);

        if (item.medium_photo_urls) {
            setCarouselItems([...item.medium_photo_urls]);
        }

        setCarouselItems(prevItems => {
            let newItems = [];
            if (item.medium === "audio") {
                // remove query params from urls
                const basicUrls = item.content_file_urls?.map((url) => url.split('?')[0]);

                if (item.content_file_urls.length <= 5) {
                    setCarouselItems([...prevItems, basicUrls]);
                } else if (item.content_file_urls.length > 5) {
                    let slides =  divideSlides(basicUrls);
                    setCarouselItems([...prevItems, ...slides]);
                }
            } else {
                // remove query params from urls
                const basicUrls = item.content_file_urls?.map((url) => url.split('?')[0]);
                newItems = [...prevItems, ...basicUrls];
            }
            return newItems
        })
    }, [item]);

    useEffect(() => {
        setCarouselContentTypes(carouselFileNames.map(url => getFileType(url)));
    }, [carouselFileNames]);

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

    const divideSlides = (files) => {
        let slideArr = []
        for (let i = 0; i < files.length; i = i + 5) {
            slideArr.push(files.slice(i, i+5))
        }
        return slideArr
    }

    const audioClipTitle = (clip) => {
        let fileName = clip.substring(clip.lastIndexOf('/') + 1).replaceAll('%20', ' ').replaceAll('%23', '#')
        return fileName.slice(0, fileName.lastIndexOf('.'))
    }

    const prevImg = () => {
        fileIndex === 0 ? setFileIndex(carouselItems.length - 1) : setFileIndex(fileIndex - 1)
    }

    const nextImg = () => {
        fileIndex === carouselItems.length - 1 ? setFileIndex(0) : setFileIndex(fileIndex + 1)
    }

    useEffect(() => {
        carouselItems?.length > 1 ? setAudioIndexer((fileIndex - 1) * 5) : setAudioIndexer(0)
    }, [fileIndex]);

    const carouselWidth = carouselRef.current?.offsetWidth;

    let carousel
    if (carouselItems.length) {
        carousel = <div className='modal-carousel' >
            {carouselItems.length > 1 && <Image className='modal-carousel-btns' src={chevronLeft.src} width={24} height={24} alt="Previous image icon" onClick={prevImg} />}
            <div className='carousel-content' ref={carouselRef}>
                {getFileType(carouselItems[fileIndex]) === "image" &&
                    <FullscreenImg
                        imgPath={carouselItems[fileIndex]}
                        defaultWidth={carouselWidth * 2}
                        prevImg={prevImg}
                        nextImg={nextImg}
                        fileIndex={fileIndex}
                        carouselItems={carouselItems}
                    />
                }
                { getFileType(carouselItems[fileIndex]) === "video" &&
                    <video key={fileIndex} controls controlsList="nodownload" className="modalVideo">
                        <source src={carouselItems[fileIndex]} type="video/mp4" />
                        Sorry, your browser doesn't support embedded videos.
                    </video>
                }
                {getFileType(carouselItems[fileIndex]) === "pdf" &&
                    <iframe className="modalArticle" src={`${item?.content_file_urls[0]}#toolbar=0`} />
                }
                {item.medium === "audio" && typeof carouselItems[fileIndex] === 'object'  &&
                    <div className='audio-container'>
                        {carouselItems[fileIndex].map((clip, idx) => (
                            <div key={clip} className='clip-container'>
                                <span>{audioClipTitle(clip)}</span>
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