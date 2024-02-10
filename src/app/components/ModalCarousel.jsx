'use client';

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import chevronRight from 'public/images/chevron-right.svg'
import chevronLeft from 'public/images/chevron-left.svg'
import FullscreenImg from './FullscreenImg';

const ModalCarousel = ({item}) => {
    const [fileIndex, setFileIndex] = useState(0);
    const [carouselItems, setCarouselItems] = useState([]);
    const [carouselFileNames, setCarouselFileNames] = useState([]);
    const [carouselContentTypes, setCarouselContentTypes] = useState([]);
    const carouselRef = useRef();

    useEffect(() => {
            // remove query params from urls
            const basicUrls = item.content_files?.map((url) => url.split('?')[0]);
            setCarouselFileNames([...item.medium_photos, ...basicUrls]);
    }, []);

    useEffect(() => {
        if (item.medium_photo_urls) {
            setCarouselItems([...item.medium_photo_urls]);
        }
    }, []);

    useEffect(() => {
        setCarouselItems(prevItems => {
            let newItems = [];
            if (item.medium === "audio") {
                // remove query params from urls
                const basicUrls = item.content_urls?.map((url) => url.split('?')[0]);

                if (item.content_urls.length <= 5) {
                    setCarouselItems([...prevItems, basicUrls]);
                } else if (item.content_urls.length > 5) {
                    let slides =  divideSlides(basicUrls);
                    setCarouselItems([...prevItems, ...slides]);
                }
            } else {
                // remove query params from urls
                const basicUrls = item.content_urls?.map((url) => url.split('?')[0]);
                newItems = [...prevItems, ...basicUrls];
            }
            return newItems
        })
    }, []);

    useEffect(() => {
        setCarouselContentTypes(carouselFileNames.map(url => getFileType(url)));
    }, [carouselFileNames]);

    const validImageTypes = ["jpg", "jpeg", "png"];
    const validVideoTypes = ["mp4", "mov", "qt", "webm"];

    function get_url_extension( url ) {
        return url.split(/[#?]/)[0].split('.').pop().trim();
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

    const audioClipTitle = (idx) => {
        const url = item.content_files[idx];
        let fileName = url.substring(url.lastIndexOf('/') + 1).replaceAll('%20', ' ').replaceAll('%23', '#')
        return fileName.slice(0, fileName.lastIndexOf('.'))
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
            { carouselItems.length > 1 && <img className='modal-carousel-btns' src={chevronLeft} onClick={prevImg} />}
            <div className='carousel-content' ref={carouselRef}>
                {carouselContentTypes[fileIndex] === "image" &&
                    <FullscreenImg 
                        imgPath={carouselItems[fileIndex]} 
                        defaultWidth={carouselWidth * 2} 
                        prevImg={prevImg}
                        nextImg={nextImg}
                        fileIndex={fileIndex}
                        carouselItems={carouselItems}
                    />
                }
                { carouselContentTypes[fileIndex] === "video" &&
                    <video key={fileIndex} controls controlsList="nodownload" className="modalVideo">
                        <source src={carouselItems[fileIndex]} type="video/mp4" />
                        Sorry, your browser doesn't support embedded videos.
                    </video>
                }
                {carouselContentTypes[fileIndex] === "pdf" &&
                    <iframe className="modalArticle" src={`${item?.content_files[0]}#toolbar=0`} />
                }
                {item.medium === "audio" && typeof carouselItems[fileIndex] === 'object'  &&
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
                {carouselItems.length > 1 && <span className='content-counter'>{fileIndex + 1}/{carouselItems.length}</span>}
            </div>
            { carouselItems.length > 1 && <img className='modal-carousel-btns' src={chevronRight} onClick={nextImg} />}
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