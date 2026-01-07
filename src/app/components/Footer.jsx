import Link from 'next/link';
import Image from 'next/image';
import footerLogo from "@/../public/images/footer-logo.png"

const Footer = ({  }) => {

    return (
        <footer>
            <div className='footer-presentedBy'>
                <div>PRESENTED BY</div>
                <Image
                    src={footerLogo}
                    alt='AMT Logo'
                    className='footer-logo'
                />
            </div>
            <div className='footer-newsletter'>

            </div>
            <div className='footer-links'>
                <ul>
                    <li><Link href={"https://www.albinamusictrust.com/"}>Albina Music Trust Main Site</Link></li>
                    <li><Link href={"/about#collections-development-policy"}>Collections Development Policy</Link></li>
                    <li><Link href={"/about#terms-of-use"}>Terms & Conditions</Link></li>
                    <li><Link href={"/about#privacy-policy"}>Privacy Policy</Link></li>
                </ul>
            </div>
            <div className='footer-copyright'>© Albina Community Achive 2025</div>
        </footer>
    );
}

export default Footer;