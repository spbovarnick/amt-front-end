"use client";

import dynamic from "next/dynamic";
import React, { memo } from "react";
const TransformWrapper = dynamic(
    () => import('react-zoom-pan-pinch').then(m => m.TransformWrapper),
    { ssr: false }
);
const TransformComponent = dynamic(
    () => import('react-zoom-pan-pinch').then(m => m.TransformComponent),
    { ssr: false }
)
import zoomInIcon from 'public/images/zoom-in.svg';
import zoomOutIcon from 'public/images/zoom-out.svg';
import zoomResetIcon from 'public/images/zoom-reset.svg';
import Image from "next/image";
import chevronLeft from "public/images/chevron-left-black.svg"
import chevronRight from "public/images/chevron-right-black.svg"

const ControlPanel = memo(function ControlPanel({
    isFullscreen,
    zoomIn,
    zoomOut,
    resetTransform,
    exitFullscreen,
    prevImg,
    nextImg,
    multiple
}){
    const handleExitFullScreen = (e) => {
        e.preventDefault();
        resetTransform();
        exitFullscreen();
    }

    return (
        <>
            <div className={`zoom-actions fullscreen-controls ${isFullscreen ? "fullscreen" : ""}`}>
                <button
                    type="button"
                    className='zoom-button_fs button-round'
                    onClick={() => zoomIn()}
                >
                    <Image src={zoomInIcon.src} width={24} height={24} alt="Zoom in icon" />
                </button>
                <button
                    type="button"
                    className='zoom-button_fs button-round'
                    onClick={() => zoomOut()}
                >
                    <Image src={zoomOutIcon.src} width={24} height={24} alt="Zoom out icon" />
                </button>
                <button
                    type="button"
                    className="zoom-button_fs button-round"
                    onClick={() => resetTransform()}
                >
                    <Image src={zoomResetIcon.src} width={24} height={24} alt="Zoom reset icon" />
                </button>
                {multiple &&
                    <>
                        <button
                            type="button"
                            className="zoom-button_fs button-round"
                            onClick={prevImg}
                        >
                            <Image src={chevronLeft.src} width={24} height={24} alt="Chevron left icon" />
                        </button>
                        <button
                            type="button"
                            className="zoom-button_fs button-round"
                            onClick={nextImg}
                        >
                            <Image src={chevronRight.src} width={24} height={24} alt="Chevron right icon" />
                        </button>
                    </>
                }
            </div>
            {isFullscreen &&
                <button
                    type='button'
                    className="fullscreenBtn exitFullscreen"
                    onClick={handleExitFullScreen}
                    onTouchStart={handleExitFullScreen}
                    style={{
                        opacity: isFullscreen ? "1" : "0"
                    }}
                ></button>
            }
        </>
    )
})

const FullscreenImg = memo(function FullscreenImg({
    isFullscreen,
    src,
    prevImg,
    nextImg,
    multiple,
    fullScreenRef,
    exitFullscreen,
}) {
    return (
        <div className={`zpp-fullscreen-overlay ${isFullscreen ? "fullscreen" : ""}`} ref={fullScreenRef}>
            <TransformWrapper
                disabled={!isFullscreen}
                wrapperClass="magnify-wrapper"
            >
                {({ zoomIn, zoomOut, resetTransform}) => (
                    <>
                        <ControlPanel
                            isFullscreen={isFullscreen}
                            zoomIn={zoomIn}
                            zoomOut={zoomOut}
                            resetTransform={resetTransform}
                            prevImg={prevImg}
                            nextImg={nextImg}
                            exitFullscreen={exitFullscreen}
                            multiple={multiple}
                        />
                        <TransformComponent
                            wrapperStyle={{
                                height: "100%",
                                width: "100%",
                            }}
                        >
                            <img
                                className='modalImage'
                                src={src}
                                alt=""
                            />

                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </div>
    )
})

export default FullscreenImg;
