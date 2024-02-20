import Link from 'next/link';
import classNames from 'classnames';
import chevronRight from 'public/images/chevron-right.svg'
import Image from 'next/image';

const NavPage = ({themeLight, pageName}) => {

    const cmptClasses = classNames({
        'global-nav-wrapper': true,
        '--is-light': themeLight,
        '--is-dark': !themeLight,
    });

    return (
        <>
            <div className="mobile-navbar">
                <div className="page-nav__links">
                    <Link className="global-nav__home-link" href="/">Albina Community Archive</Link>
                    { pageName && 
                        <>
                        <Image className='page-nav__arrow' width={24} height={24} alt="Breadcrumb arrow" src={chevronRight.src} />
                            <Link href="#">{pageName}</Link>
                        </>
                    }
                </div>
            </div>

            <div className={cmptClasses}>
                <nav className='global-nav'>
                    <div className="page-nav__links">
                        <Link className="global-nav__home-link" href="/">Albina Community Archive</Link>
                        { pageName && 
                            <>
                            <Image className='page-nav__arrow' width={24} height={24} alt="Breadcrumb arrow" src={chevronRight.src} />
                                <Link href="#">{pageName}</Link>
                            </>
                        }
                    </div>
                </nav>
            </div>
        </>
    );
}

export default NavPage;