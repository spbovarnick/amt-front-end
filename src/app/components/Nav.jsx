// This component is sunset with transition away from WAF fiscal sponsorship

'use client'
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';

const Nav = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    // const location = useLocation();
    const pathname = usePathname();

    // Create array of refs for links
    const numberOfLinks = 4;
    const linkRefs = [];

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
                        <li><Link className={pathname === "/" ? '--is-active' : ''} href="/albina-community-archive">Cultural Archive</Link></li>
                    </ul>
                    <Link className="global-nav__donate-link" href="/donate">Donate</Link>
                </nav>
            </div>
        </>
    );
}

export default Nav;