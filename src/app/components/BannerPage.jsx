import React from "react";
import classNames from 'classnames';

const BannerPage = ({themeLight, alignLeft, headline, className, url, subtitle, description, donate}) => {


    const cmptClasses = classNames(
        'cmpt-banner',
        themeLight && '--is-light',
        !themeLight && '--is-dark',
        alignLeft && '--is-left',
        !alignLeft && '--is-right',
        className
    );

    return (
        <div
            className={cmptClasses}
            style={{
                backgroundImage: `linear-gradient(0.25turn, #000000, transparent), url("${url}")`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100vw auto"
            }}>
            <div className="cmpt-banner__wrapper">
                <div
                    className="cmpt-banner__content"
                    style={description ? {padding: "180px 46px 110px 46px"} : null }
                >
                    {/* <img className="page-banner__header" src={url} /> */}
                    {headline &&
                        <h1 className="heading-xl" dangerouslySetInnerHTML={{__html: headline}} />
                    }
                    {subtitle &&
                        <h1 className="heading-m2 banner-subtitle">{subtitle}</h1>
                    }
                    {donate &&
                        <a href={donate} target="_blank" className="cmpt-banner__page-donate-cta">Donate now</a>
                    }
                </div>
            </div>
        </div>
    );
}

export default BannerPage;