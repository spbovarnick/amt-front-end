import React, {useState, useRef, useEffect} from "react";
import { getCloudfrontUrl } from "@/utils/helpers";
import { TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';
import zoomInIcon from 'public/images/zoom-in.svg';
import zoomOutIcon from 'public/images/zoom-out.svg';
import zoomResetIcon from 'public/images/zoom-reset.svg';
import chevronRight from 'public/images/chevron-right_fs.svg'
import chevronLeft from 'public/images/chevron-left_fs.svg'
import Image from "next/image";

const FullscreenImg =({ defaultWidth, prevImg, nextImg, carouselItems, fileIndex }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);
    const [err, setErr] = useState();
    const fullScreenRef = useRef();
    const imgRef = useRef();

    useEffect(() => {
        if(isFullscreen) {
            // set container width to window width when entering fullscreen
            setContainerWidth(window.innerWidth);
        }
    }, [isFullscreen]);

    // updates state based on UI feedback
    const handleFullscreen = () => {
        if (fullScreenRef.current) {
            if (isFullscreen) {
                document.exitFullscreen();
            } else {
                fullScreenRef.current.requestFullscreen()
                    .catch((err) => {
                    alert(
                      `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
                    );
                  });
            }
            setIsFullscreen(!isFullscreen);
        }
    };

     // functional declaration gives access to zoom-pan-pinch controls
    const Component = ({zoomIn, zoomOut, resetTransform}) => {
        // event listener updates isFullscreen state if user exits with esc key
        useEffect(() => {
            if (fullScreenRef.current) {
                fullScreenRef.current.addEventListener("fullscreenchange", fullscreenChanged);
            }
            return(() => {
                fullScreenRef.current?.removeEventListener("fullscreenchange", fullscreenChanged);
            });
        }, []);

        const resetPromise = () => {
            return new Promise((resolve) => {
                resetTransform();
                resolve();
            })
        }

        async function fullscreenChanged() {
            if (!document.fullscreenElement) {
                    await setIsFullscreen(false);
                    await resetPromise();
                }
        }

        return (
            <>
                <>
                    <div className={`zoom-actions fullscreen-controls ${isFullscreen ? "fullscreen" : ""}`}>
                        <button
                            type="button"
                            className='zoom-button_fs button-round'
                            onClick={() => zoomIn()}
                        >
                            <Image src={zoomInIcon.src} width={24} height={24} alt="Zoom in icon" />
                            {err}
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
                        { carouselItems.length > 1 && 
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
                                <Image src={chevronRight.src} width={24} height={24} alt="Chevron right icon"/>
                            </button>
                            </>
                        }
                    </div>
                    {isFullscreen &&
                        <button
                            type='button'
                            className="fullscreenBtn exitFullscreen"
                            onClick={async() => {
                                await resetPromise();
                                handleFullscreen();
                            }}
                            onTouchStart={async() => {
                                await resetPromise();
                                handleFullscreen();
                            }}
                            style={{
                                opacity: isFullscreen ? "1" : "0"
                            }}
                        ></button>
                   }
                </>
                <TransformComponent
                    wrapperStyle={{
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <img
                        ref={imgRef}
                        className='modalImage'
                        src={getCloudfrontUrl(carouselItems[fileIndex], isFullscreen ? containerWidth * 2 : defaultWidth)}
                    />

                </TransformComponent>
            </>
        )
    }

    return (
        <>
            <div className='zpp-container' ref={fullScreenRef}>
                <TransformWrapper
                    disabled={isFullscreen ? false : true}
                    wrapperClass="magnify-wrapper"
                >
                   {(params) => <Component {...params} />}
                </TransformWrapper>
            </div>
            {!isFullscreen &&
                <button
                    type='button'
                    className="fullscreenBtn enterFullscreen"
                    onClick={handleFullscreen}
                    style={{
                        opacity: isFullscreen ? "0" : "1",
                    }}
                ></button>
            }
        </>
    )
}

export default FullscreenImg;