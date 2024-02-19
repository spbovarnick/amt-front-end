import { getCloudfrontUrl } from "@/utils/helpers";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import audioIcon from 'public/images/audio-icon-2.svg';
import videoIcon from 'public/images/video-icon.svg';
import pdfIcon from 'public/images/pdf-icon.svg';
import printedMaterialIcon from 'public/images/printed-material-icon.svg'

const ArchiveItem = ({item, isFocused, setIsFocused, focusedRef}) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const modalParams = `?modal=true&id=${item.id}&${params.toString()}`;


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
                            <img src={getCloudfrontUrl(item.content_urls[0], 800)} loading="lazy" draggable="false" />
                        </div>
                    )}

                    {item.medium === "printed material" && item.content_files[0] && validFormats.includes(get_url_extension(item.content_files[0]).toLowerCase()) && (
                        <div className="cmpt-archive-item__thumb">
                            <img src={getCloudfrontUrl(item.content_urls[0], 800)} loading="lazy" draggable="false" />
                        </div>
                    )}

                    {item.medium === "printed material" && item.content_files[0] && !validFormats.includes(get_url_extension(item.content_files[0]).toLowerCase()) && (
                        <div className="cmpt-archive-item__thumb">
                            <img src={printedMaterialIcon.src} className="cmpt-archive-item__icon" draggable="false" />
                        </div>
                    )}

                    {item.medium === "article" && item.content_files[0] && !validFormats.includes(get_url_extension(item.content_files[0]).toLowerCase()) && (
                        <div className="cmpt-archive-item__thumb" >
                            <img src={pdfIcon.src} className="cmpt-archive-item__icon" draggable="false" />
                        </div>
                    )}

                    {item.medium === "article" && item.content_files[0] && validFormats.includes(get_url_extension(item.content_files[0]).toLowerCase()) && (
                        <div className="cmpt-archive-item__thumb" >
                            <img src={getCloudfrontUrl(item.content_urls[0], 800)} loading="lazy" draggable="false" />
                        </div>
                    )}

                    {item.medium === "audio" && item.content_files[0] && !item.poster_image && (
                        <div className="cmpt-archive-item__thumb">
                            <img src={audioIcon.src} className="cmpt-archive-item__icon" draggable="false" />
                        </div>
                    )}

                    {item.medium === "audio" && item.content_files[0] && item.poster_image && (
                        <div className="cmpt-archive-item__thumb">
                            <img src={getCloudfrontUrl(item.poster_url, 800)} loading="lazy" draggable="false" />
                        </div>
                    )}

                    {item.medium === "film" && item.content_files[0] && !item.poster_image && (
                        <div className="cmpt-archive-item__thumb">
                            <img src={videoIcon.src} className="cmpt-archive-item__icon" draggable="false" />
                        </div>
                    )}

                    {item.medium === "film" && item.content_files[0] && item.poster_image && (
                        <div className="cmpt-archive-item__thumb">
                            <img src={getCloudfrontUrl(item.poster_url, 800)} loading="lazy" draggable="false" />
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