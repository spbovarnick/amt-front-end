import Link from 'next/link';
import Image from 'next/image';
import footerLogo from "@/../public/images/AMT-footer-logo.png"

const Footer = ({  }) => {

    return (
        <footer>
            <div className='footer-wrapper'>
                <div className='footer-grid-maker'>
                    <div className='line-block'>
                        <div className='horizontal-line sqs-block'>
                        <hr></hr>
                        </div>
                    </div>

                    <div className='contact-block'>
                        <div className='sqs-block bottom-blocks'>
                            <h3>CONTACT</h3>
                            <div className='socials-wrapper'>
                                <div className='sqs-block'>
                                    <div className='icon-list'>
                                        <Link className='social-link' href={"https://www.instagram.com/albinamusictrust/?hl=en"}>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ffffff" d="M17.34 5.46a1.2 1.2 0 1 0 1.2 1.2a1.2 1.2 0 0 0-1.2-1.2Zm4.6 2.42a7.59 7.59 0 0 0-.46-2.43a4.94 4.94 0 0 0-1.16-1.77a4.7 4.7 0 0 0-1.77-1.15a7.3 7.3 0 0 0-2.43-.47C15.06 2 14.72 2 12 2s-3.06 0-4.12.06a7.3 7.3 0 0 0-2.43.47a4.78 4.78 0 0 0-1.77 1.15a4.7 4.7 0 0 0-1.15 1.77a7.3 7.3 0 0 0-.47 2.43C2 8.94 2 9.28 2 12s0 3.06.06 4.12a7.3 7.3 0 0 0 .47 2.43a4.7 4.7 0 0 0 1.15 1.77a4.78 4.78 0 0 0 1.77 1.15a7.3 7.3 0 0 0 2.43.47C8.94 22 9.28 22 12 22s3.06 0 4.12-.06a7.3 7.3 0 0 0 2.43-.47a4.7 4.7 0 0 0 1.77-1.15a4.85 4.85 0 0 0 1.16-1.77a7.59 7.59 0 0 0 .46-2.43c0-1.06.06-1.4.06-4.12s0-3.06-.06-4.12ZM20.14 16a5.61 5.61 0 0 1-.34 1.86a3.06 3.06 0 0 1-.75 1.15a3.19 3.19 0 0 1-1.15.75a5.61 5.61 0 0 1-1.86.34c-1 .05-1.37.06-4 .06s-3 0-4-.06a5.73 5.73 0 0 1-1.94-.3a3.27 3.27 0 0 1-1.1-.75a3 3 0 0 1-.74-1.15a5.54 5.54 0 0 1-.4-1.9c0-1-.06-1.37-.06-4s0-3 .06-4a5.54 5.54 0 0 1 .35-1.9A3 3 0 0 1 5 5a3.14 3.14 0 0 1 1.1-.8A5.73 5.73 0 0 1 8 3.86c1 0 1.37-.06 4-.06s3 0 4 .06a5.61 5.61 0 0 1 1.86.34a3.06 3.06 0 0 1 1.19.8a3.06 3.06 0 0 1 .75 1.1a5.61 5.61 0 0 1 .34 1.9c.05 1 .06 1.37.06 4s-.01 3-.06 4ZM12 6.87A5.13 5.13 0 1 0 17.14 12A5.12 5.12 0 0 0 12 6.87Zm0 8.46A3.33 3.33 0 1 1 15.33 12A3.33 3.33 0 0 1 12 15.33Z" /></svg>
                                            </div>
                                        </Link>
                                        <Link className='social-link' href={"https://www.youtube.com/@albinamusictrust9170"}>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1024 768"><path fill="#ffffff" d="M928 736q-222 32-416 32q-86 0-190-8t-165-16l-61-8q-27-5-47.5-37.5t-30-78.5t-14-86T0 461V307Q0 52 96 32Q318 0 512 0q86 0 190 8t165 16l61 8q29 4 49.5 36.5T1007 148t13 86t4 73v154q0 36-3 73t-12 85t-30 80t-51 37zM693 359L431 199q-11-10-29-5.5T384 208v352q0 11 18 15t29-6l262-160q11-10 11-25t-11-25z" /></svg>
                                            </div>
                                        </Link>
                                        <Link className='social-link' href={"https://www.facebook.com/groups/albinamusictrust/"}>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 224 432"><path fill="#ffffff" d="M145 429H66V235H0v-76h66v-56q0-48 27-74t72-26q36 0 59 3v67l-41 1q-22 0-30 9t-8 27v49h76l-10 76h-66v194z" /></svg>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <p className='footer-small'>
                                <Link href={"https://www.albinamusictrust.org/contact"}>Email Us</Link>
                                <br />
                                Address
                                <br />
                                2125 N. Vancouver Ave
                                <br />
                                Portland, Oregon 97227
                            </p>
                        </div>

                    </div>

                    <div className='archive-block'>
                        <div className='sqs-block bottom-blocks'>
                            <h3>ARCHIVE</h3>
                            <br />
                            <br />
                            <p className='footer-small'>
                                <Link href={"/"}>Search Archive</Link>
                                <br />
                                <Link href={"/collections"}>Archive Collections</Link>
                                <br />
                                <Link href={"https://www.albinamusictrust.org/about-the-archive"}>About The Archive</Link>
                            </p>
                        </div>
                    </div>

                    <div className='explore-block'>
                        <div className='sqs-block bottom-blocks'>
                            <h3>EXPLORE</h3>
                            <br />
                            <br />
                            <p className='footer-small'>
                                <Link href={"https://www.albinamusictrust.org/projects"}>Projects</Link>
                                <br />
                                <Link href={"https://www.albinamusictrust.org/upcoming-events"}>Upcoming Events</Link>
                                <br />
                                <Link href={"https://www.albinamusictrust.org/our-records"}>Our Records</Link>
                                <br />
                                <Link href={"https://www.albinamusictrust.org/about-us"}>About</Link>
                                <br />
                            </p>
                        </div>
                    </div>

                    <div className='support-block'>
                        <div className='sqs-block bottom-blocks'>
                            <h3>SUPPORT</h3>
                            <br/>
                            <br/>
                            <p className='footer-small'>
                                <Link href={"https://www.albinamusictrust.org/terms-and-conditions"}>Terms and Conditions</Link>
                                <br/>
                                <Link href={"https://www.albinamusictrust.org/privacy-policy"}>Privacy Policy</Link>
                                <br/>
                                <Link href={"https://www.albinamusictrust.org/faqs"}>FAQs</Link>
                                <br/>
                            </p>
                        </div>
                    </div>

                    <div className='footer-logo-block'>
                        <div className='sqs-block'>
                            <div className='footer-logo-wrapper'>
                                <Image
                                    src={footerLogo}
                                    alt='AMT Logo'
                                    fill
                                    sizes="(max-width: 768px) 100vw, 1600px"
                                    style={{ objectFit: "contain" }}
                                    priority={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;