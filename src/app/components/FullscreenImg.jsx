import React, {useState, useRef, useEffect, memo, useCallback} from "react";
import { TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';
import zoomInIcon from 'public/images/zoom-in.svg';
import zoomOutIcon from 'public/images/zoom-out.svg';
import zoomResetIcon from 'public/images/zoom-reset.svg';
import chevronRight from 'public/images/chevron-right_fs.svg'
import chevronLeft from 'public/images/chevron-left_fs.svg'
import Image from "next/image";

const ControlPanel = memo(function ControlPanel({
    isFullscreen,
    zoomIn,
    zoomOut,
    resetTransform,
    // prevImg,
    // nextImg,
    exitFullscreen,
    // multiple
}){
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
                {/* {multiple &&
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
                } */}
            </div>
            {isFullscreen &&
                <button
                    type='button'
                    className="fullscreenBtn exitFullscreen"
                    onClick={exitFullscreen}
                    onTouchStart={exitFullscreen}
                    style={{
                        opacity: isFullscreen ? "1" : "0"
                    }}
                ></button>
            }
        </>
    )
})

const FullscreenImg = memo(function FullscreenImg({
    // prevImg,
    // nextImg,
    // carouselItems,
    src,
}) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    // const [containerWidth, setContainerWidth] = useState(0);
    const fullScreenRef = useRef(null);
    // const imgRef = useRef();

    const exitFullscreen = useCallback(() => {
        if (document.fullscreenElement) document.exitFullscreen();
    }, []);

    const toggleFullscreen = useCallback(() => {
        if (!isFullscreen) {
            fullScreenRef.current?.requestFullscreen();
        } else {
            exitFullscreen();
        };
    }, [isFullscreen, exitFullscreen]);

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

    return (
        <>
            <div className='zpp-container' ref={fullScreenRef}>
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
                                // prevImg={prevImg}
                                // nextImg={nextImg}
                                exitFullscreen={exitFullscreen}
                                // multiple={carouselItems.length > 1}
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
            {!isFullscreen &&
                <button
                    type='button'
                    className="fullscreenBtn enterFullscreen"
                    onClick={toggleFullscreen}
                    style={{
                        opacity: isFullscreen ? "0" : "1",
                    }}
                ></button>
            }
        </>
    )
})

export default FullscreenImg;