'use client';

import { useEffect, useState } from "react";
import { getNewsItems } from "@/utils/api";

const NewsBlock = () => {
    const [newsItems, setNewsItems] = useState(null);

    // get data on mount
    useEffect(() => {
        (async () => { 
            const data = await getNewsItems()
            if(data) {
                setNewsItems(data.data);
            }
        })();
    }, []);

    return (
        <>
            {newsItems?.length > 0 && (
                <div className={"cmpt-news-block"}>
                    <div className="global-container">
                        <h2 className="heading-m cmpt-news-block__heading">Latest news</h2>

                        <div className="cmpt-news-block__items">
                            {newsItems.map((item, idx) => (
                                <div className="cmpt-news-block__item" key={item.headline + idx}>
                                    <div className="cmpt-news-block__item-headline">{item.headline}</div>
                                    {item.photo && (
                                        <div className="cmpt-news-block__item-picture-wrapper">
                                            <img src={item.photo} className="cmpt-news-block__item-picture" />
                                        </div>
                                    )}
                                    {item.body && <div className="cmpt-news-block__item-body" dangerouslySetInnerHTML={{__html: item.body.body}} />}
                                    {item.cta_text && item.cta_link && (
                                        <a href={item.cta_link} className="cmpt-news-block__item-link">{item.cta_text}</a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default NewsBlock;