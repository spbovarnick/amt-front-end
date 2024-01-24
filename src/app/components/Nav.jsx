'use client'
import { useState, useEffect } from 'react';
// import { useLocation } from "react-router-dom";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';

const Nav = (props) => {

    // const [locationPath, setLocationPath] = useState();
    // const [activeLink, setActiveLink] = useState();
    const [isOpen, setIsOpen] = useState(false);
    // const location = useLocation();
    const pathname = usePathname();

    // Create array of refs for links
    const numberOfLinks = 4;
    const linkRefs = [];

    // for (let i = 0; i < numberOfLinks; i++) {
    //     const newRef = React.createRef();
    //     linkRefs.push(newRef);
    // }

    // useEffect(() => {
    //     const currentPath = location.pathname;
    //     setLocationPath(currentPath);
    // }, [location]);

    // useEffect(() => {
    //     linkRefs.forEach((link, index) => {
    //         const linkHref = link.current.getAttribute('href');
    //         if (linkHref === locationPath) {
    //             setActiveLink(index);
    //         }
    //     });
    // }, [locationPath]);

    const cmptClasses = classNames({
        'global-nav-wrapper': true,
        '--is-light': props.themeLight,
        '--is-dark': !props.themeLight,
        '--is-open': isOpen,
    });

    return (
        <>
            <div className="mobile-navbar">
                <Link className="mobile-navbar__title" href="/">WORLD ARTS FOUNDATION INC.</Link>
                <button className="mobile-navbar__button" onClick={()=>{setIsOpen(!isOpen)}}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div className={cmptClasses}>
                <nav className='global-nav'>
                    <Link className="global-nav__home-link" href="/">WORLD ARTS FOUNDATION INC.</Link>
                    <ul className="global-nav__links">
                        <li><Link className={pathname === "/about" ? '--is-active' : ''} href="/about">About</Link></li>
                        <li><Link className={pathname === "/archive" ? '--is-active' : ''} href="/archive">Cultural Archive</Link></li>
                        <li><Link className={pathname === "/our-work" ? '--is-active' : ''} href="/our-work">Our Work</Link></li>
                        <li><Link className={pathname === "/leadership" ? '--is-active' : ''} href="/leadership">Leadership</Link></li>
                    </ul>
                    <Link className="global-nav__donate-link" href="/donate">Donate</Link>
                </nav>
            </div>
        </>
    );
}

export default Nav;