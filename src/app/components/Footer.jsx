import Link from 'next/link';

import icon_fb from "public/images/icons/fb.svg"
import icon_insta from 'public/images/icons/insta.svg';
import icon_youtube from 'public/images/icons/youtube.svg';

const Footer = ({ archive = false, mailListLink = null, mailListName = null }) => {

    return (
        <div className="cmpt-footer">
            <div className="global-container">
                {!archive &&
                    <div className="cmpt-footer__left">
                        <div className="cmpt-footer__byline">
                            World Arts Foundation Inc.
                            <div className="cmpt-footer__contact">
                                <a href="mailto:wafpdx@gmail.com">wafpdx@gmail.com</a>
                            </div>
                            <div className="cmpt-footer__contact">
                                PO Box 12384 Portland,<br/>OR 97212-0384
                            </div>
                        </div>
                        <div className="cmpt-footer__social">
                            <a href="https://www.facebook.com/wafpdx" target="_blank" rel="noopener noreferrer"><img src={icon_fb.src} /></a>
                            <a href="https://www.instagram.com/wafpdx/" target="_blank" rel="noopener noreferrer"><img src={icon_insta.src} /></a>
                            <a href="https://www.youtube.com/channel/UC-4PwMXuB7MaLiWg55w4ldg" target="_blank" rel="noopener noreferrer"><img src={icon_youtube.src} /></a>
                        </div>
                    </div>
                }

                <div className="cmpt-footer__right">
                    <ul className="cmpt-footer__links">
                        { !archive &&
                            <>
                            <li><Link href="/about">About</Link></li>
                            <li><Link href="/albina-community-archive">Cultural Archive</Link></li>
                            <li><Link href="/our-work">Our Work</Link></li>
                            <li><Link href="/leadership">Leadership</Link></li>
                            <li><Link href="/donate">Donate</Link></li>
                            </>
                        }
                        <li><Link href="/albina-community-archive/terms-of-use">Archive Terms of Use</Link></li>
                        <li>To share feedback, take this <a href="https://docs.google.com/forms/d/e/1FAIpQLSea4m8mK3u4nRL3zEpbLDXWZBadYa_dIpwFE66Mjjd-4SpQaA/viewform?usp=sharing" target="_blank" className="--highlight">survey</a></li>
                        {mailListLink && (
                            <li>Join {mailListName ? `the ${mailListName}` : "our"} <a href={mailListLink} className="--highlight" target="_blank">mailing list</a></li>
                        )}
                    </ul>
                    <span className="cmpt-footer__copy">&copy; 2021 World Arts Foundation Inc.</span>
                </div>
            </div>
        </div>
    );
}

export default Footer;