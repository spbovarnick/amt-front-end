import Link from 'next/link';

const Footer = ({ mailListLink = null, mailListName = null }) => {

    return (
        <div className="cmpt-footer">
            <div className="global-container">
                <div className="cmpt-footer__right">
                    <ul className="cmpt-footer__links">
                        <li><Link href="/terms-of-use">Archive Terms of Use</Link></li>
                        <li>To share feedback, take this <a href="https://docs.google.com/forms/d/e/1FAIpQLSea4m8mK3u4nRL3zEpbLDXWZBadYa_dIpwFE66Mjjd-4SpQaA/viewform?usp=sharing" target="_blank" className="--highlight">survey</a></li>
                        {mailListLink && (
                            <li>Join {mailListName ? `the ${mailListName}` : "our"} <a href={mailListLink} className="--highlight" target="_blank">mailing list</a></li>
                        )}
                    </ul>
                    <span className="cmpt-footer__copy">&copy; 2024 Albina Music Trust</span>
                </div>
            </div>
        </div>
    );
}

export default Footer;