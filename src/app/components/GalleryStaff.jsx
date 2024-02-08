'use client';

import { useEffect, useState } from "react";
import classNames from 'classnames';
import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";

const GalleryStaff = ({slides, headline}) => {
    const [isMobile, setIsMobile] = useState(false);

    const cmptClasses = classNames(
        'cmpt-gallery-staff',
    );

    useEffect(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth < 768) {
            setIsMobile(true);
        }
    }, []);

    return (
        <div className={cmptClasses}>
            <div className="cmpt-gallery-staff__heading">
                <h2 className="heading-m">{headline}</h2>
            </div>
            <div className="cmpt-gallery-staff__wrapper">
                <Swiper
                    modules={[Mousewheel]}
                    spaceBetween={isMobile ? 30 : 50}
                    slidesPerView={isMobile ? 2 : 3.5}
                    slidesOffsetBefore={isMobile ? 40 : 80}
                    freeMode={true}
                    mousewheel={false}
                >
                    {slides?.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="cmpt-gallery-staff__item">
                                <img src={slide.headshot} className="cmpt-gallery-staff__item-headshot" />
                                <h3 className="cmpt-gallery-staff__item-name">{slide.name}</h3>
                                <div className="cmpt-gallery-staff__item-role">{slide.title}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default GalleryStaff;