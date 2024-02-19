'use client'


import React, { useRef } from 'react';

import { getCloudfrontUrl } from "@/utils/helpers";
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { clearAllFilters } from "@/utils/api";
import classnames from "classnames";

const Carousel = ({ slides, onPage, pageReset, slidesPerView = 1.5, isShort = false }) => {
    // let location = useLocation();
    let location = useRouter();
    const slideRef = useRef();
    const slidelWidth = slideRef.current?.offsetWidth;
    // let navigate = useNavigate();
    let searchParams = new URLSearchParams(location.search)


    function handlePageSlideClick(slide) {
        // if user has clicked Load More, current page needs to be reset, and userLoadsMore state needs to be set to false
        pageReset();
        // clear search params
        clearAllFilters(searchParams)
        navigate({
            pathname: location.pathname,
            search: searchParams.toString()
        })
        // appends search URLSearchParams object with selected key value pair
        slide.collections?.forEach(collection => searchParams.append('collections', collection));
        slide.year && searchParams.append('year', slide.year);
        slide.medium && searchParams.append('medium', slide.medium);
        slide.people?.forEach(p => searchParams.append('people', p))
        slide.comm_groups?.forEach(cg => searchParams.append('comm_groups', cg));
        slide.locations?.forEach(l => searchParams.append('locations', l));
        slide.tags?.forEach(t => searchParams.append('tags', t))
        // // navigates to new URL based on appended params
        navigate({
            pathname: location.pathname,
            search: searchParams.toString()
        })
    }

    return (
        <div className="cmpt-carousel">
            <div className="global-container">
                {/* CTA moved to footer, persisting here in case move back */}
                {/* { CTAText && CTALink &&
                    <h1
                        className="heading-m2 form-CTA"
                    >
                        {CTAText}&nbsp;
                        <a
                            className="CTA-link"
                            href={CTALink}
                            target="_blank"
                        >
                            here.
                        </a>
                    </h1>
                } */}
                <h3 className="heading-m2 carousel__heading">Featured collections</h3>
                <div className={classnames("carousel__slides-container", slides.length > 0 && "--loaded", isShort && "--short")}>
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={slidesPerView}
                        freeMode={false}
                        navigation={true}
                        autoplay={{
                            delay: 48000,
                            disableOnInteraction: false,
                        }}
                    >
                        {slides.map((slide) => {

                            return (
                                <SwiperSlide key={slide.id}>
                                    { onPage ?
                                        // slide if rendering from Page.jsx
                                        <div onClick={() => handlePageSlideClick(slide)} className="carousel-item" ref={slideRef}>
                                            { slide.image_url && <img src={getCloudfrontUrl(slide.image_url, slidelWidth * 2)} className="carousel-image" />}
                                            <div className="carousel-text">
                                                <h3 className="carousel-item-title">{slide.title}</h3>
                                                <div className="carousel-item-description">{slide.description}</div>
                                            </div>
                                        </div>
                                        :
                                        // slide if rendering from root page.js
                                        <Link href={`/page/${slide.link}`} className="carousel-item" target={"_blank"}>
                                            { slide.image_url && <img src={getCloudfrontUrl(slide.image_url, slidelWidth * 2)} className="carousel-image" />}
                                            <div className="carousel-text">
                                                <h3 className="carousel-item-title">{slide.title}</h3>
                                                <div className="carousel-item-description">{slide.description}</div>
                                            </div>
                                        </Link>

                                    }
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Carousel;