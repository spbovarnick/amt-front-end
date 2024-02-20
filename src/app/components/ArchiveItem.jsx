import { encode } from "blurhash";
import { getCloudfrontUrl } from "@/utils/helpers";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import audioIcon from 'public/images/audio-icon-2.svg';
import videoIcon from 'public/images/video-icon.svg';
import pdfIcon from 'public/images/pdf-icon.svg';
import printedMaterialIcon from 'public/images/printed-material-icon.svg'
import Image from "next/image";

const ArchiveItem = ({item, isFocused, setIsFocused, focusedRef}) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const modalParams = `?modal=true&id=${item.id}&${params.toString()}`;

    const loadImage = async src =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (...args) => reject(args);
            img.src = src;
        });

    const getImageData = image => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
        return context.getImageData(0, 0, image.width, image.height);
    };

    const encodeImageToBlurhash = async imageUrl => {
        const image = await loadImage(imageUrl);
        const imageData = getImageData(image);
        return encode(imageData.data, imageData.width, imageData.height, 4, 4);
    };


    function get_url_extension( url ) {
        return url.split(/[#?]/)[0].split('.').pop().trim();
    }
    const validFormats = ["jpg", "jpeg", "png"];

    function handleClick(e) {
        e.preventDefault();
        const url = `${pathname}${modalParams}`

        router.push(url, {scroll: false})
        setIsFocused(item.id)
    }

    return (
        <>
            {
                // prevent broken images when file type is not image format
                !(item.medium === "photo" && item.content_files[0] && !validFormats.includes(get_url_extension(item.content_files[0]).toLowerCase())) &&

            <div className="cmpt-archive-item" ref={isFocused === item.id ? focusedRef : null}>
                <button type="button"
                className="cmpt-archive-item__button"
                // modals are opened via effect hook in ArchiveItemModal.jsx: when id params changes, modal opens
                onClick={(e) => handleClick(e)}>
                    {item.medium === "photo" && item.content_files[0] && (
                        <div className="cmpt-archive-item__thumb">
                            <Image 
                                src={getCloudfrontUrl(item.content_urls[0], 800)} 
                                width={389}
                                height={600}
                                alt={item.title}
                                loading="lazy" 
                                draggable="false" 
                            />
                        </div>
                    )}

                    {item.medium === "printed material" && item.content_files[0] && validFormats.includes(get_url_extension(item.content_files[0]).toLowerCase()) && (
                        <div className="cmpt-archive-item__thumb">
                            <Image 
                                src={getCloudfrontUrl(item.content_urls[0], 800)} 
                                width={389}
                                height={600}
                                alt={item.title}
                                loading="lazy" 
                                draggable="false" 
                            />
                        </div>
                    )}

                    {item.medium === "printed material" && item.content_files[0] && !validFormats.includes(get_url_extension(item.content_files[0]).toLowerCase()) && (
                        <div className="cmpt-archive-item__thumb">
                            <Image 
                                src={printedMaterialIcon.src} 
                                width={389}
                                height={600}
                                alt={"Printed matter icon"}
                                className="cmpt-archive-item__icon" 
                                draggable="false" 
                            />
                        </div>
                    )}

                    {item.medium === "article" && item.content_files[0] && !validFormats.includes(get_url_extension(item.content_files[0]).toLowerCase()) && (
                        <div className="cmpt-archive-item__thumb" >
                            <Image 
                                src={pdfIcon.src} 
                                className="cmpt-archive-item__icon" 
                                width={389}
                                height={600}
                                alt={"Pdf icon"}
                                draggable="false"
                            />
                        </div>
                    )}

                    {item.medium === "article" && item.content_files[0] && validFormats.includes(get_url_extension(item.content_files[0]).toLowerCase()) && (
                        <div className="cmpt-archive-item__thumb" >
                            <Image 
                                src={getCloudfrontUrl(item.content_urls[0], 800)} 
                                width={389}
                                height={600}
                                alt={item.title}
                                placeholder="blur"
                                blurDataURL={encodeImageToBlurhash(item.content_urls[0])}
                                loading="lazy" 
                                draggable="false" 
                            />
                        </div>
                    )}

                    {item.medium === "audio" && item.content_files[0] && !item.poster_image && (
                        <div className="cmpt-archive-item__thumb">
                            <Image 
                                src={audioIcon.src} 
                                width={389}
                                height={600}
                                alt={"Audio icon"}
                                className="cmpt-archive-item__icon" 
                                draggable="false" 
                            />
                        </div>
                    )}

                    {item.medium === "audio" && item.content_files[0] && item.poster_image && (
                        <div className="cmpt-archive-item__thumb">
                            <Image 
                                src={getCloudfrontUrl(item.poster_url, 800)} 
                                width={389}
                                height={600}
                                alt={item.title}
                                loading="lazy" 
                                draggable="false" 
                            />
                        </div>
                    )}

                    {item.medium === "film" && item.content_files[0] && !item.poster_image && (
                        <div className="cmpt-archive-item__thumb">
                            <Image 
                                src={videoIcon.src} 
                                width={389}
                                height={600}
                                alt={"Video icon"}
                                className="cmpt-archive-item__icon" 
                                draggable="false" 
                            />
                        </div>
                    )}

                    {item.medium === "film" && item.content_files[0] && item.poster_image && (
                        <div className="cmpt-archive-item__thumb">
                            <Image 
                                src={getCloudfrontUrl(item.poster_url, 800)} 
                                width={389}
                                height={600}
                                alt={item.title}
                                loading="lazy" 
                                draggable="false" 
                            />
                        </div>
                    )}

                    <div className={"cmpt-archive-item__meta"}>
                        {item.title && <div className={"cmpt-archive-item__title"}>{item.title}</div>}
                        {item.year && <div className={"cmpt-archive-item__year"}>{item.year}</div>}

                    </div>
                </button>
            </div>
            }
        </>
    )
}

export default ArchiveItem;