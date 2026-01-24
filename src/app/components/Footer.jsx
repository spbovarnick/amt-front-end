import Link from 'next/link';
import Image from 'next/image';
import footerLogo from "@/../public/images/footer-logo.png"

const Footer = ({  }) => {

    return (
        <footer>
            <div className='footer-info'>
                <div className='footer-presentedBy'>
                    <div>PRESENTED BY</div>
                    <Image
                        src={footerLogo}
                        alt='AMT Logo'
                        className='footer-logo'
                    />
                </div>
                <div className='footer-donate'>
                    <div className='donate-text'>
                        We are a 501(c)(3) non-profit based in Portland, OR<br/>
                        EIN: 99-3975378
                    </div>
                    <div className='donate-btn-div'>
                        <button className='pill-btn'><Link href={"https://www.paypal.com/donate/?hosted_button_id=Y5CY72BKFT9VE"}>Donate</Link></button>
                    </div>
                </div>
                <div className='footer-newsletter'>
                    <div className='newsletter-text'>
                        Sign up for our newsletter
                    </div>
                    <div className='signup-btn-div'>
                        <Link className='signup-btn pill-btn' href={"http://eepurl.com/h58Han"}>Sign Up</Link>
                    </div>
                </div>
                <div className='footer-links'>
                    <ul>
                        <li><Link href={"https://www.albinamusictrust.com/"}>Albina Music Trust Main Site</Link></li>
                        <li><Link href={"/about#collections-development-policy"}>Collections Development Policy</Link></li>
                        <li><Link href={"/about#terms-of-use"}>Terms & Conditions</Link></li>
                        <li><Link href={"/about#privacy-policy"}>Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>
            <div className='footer-copyright'>© Albina Community Achive 2025</div>
        </footer>
    );
}

export default Footer;