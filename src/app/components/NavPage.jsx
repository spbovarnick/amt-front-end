import Link from 'next/link';
import classNames from 'classnames';
import chevronRight from '../../../public/images/chevron-right.svg'

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
                    <Link className="global-nav__home-link" href="/albina-community-archive">Albina Community Archive</Link>
                    <img className='page-nav__arrow' src={chevronRight} />
                    <Link href="#">{pageName}</Link>
                </div>
            </div>

            <div className={cmptClasses}>
                <nav className='global-nav'>
                    <div className="page-nav__links">
                        <Link className="global-nav__home-link" href="/albina-community-archive">Albina Community Archive</Link>
                        <img className='page-nav__arrow' src={chevronRight} />
                        <Link href="#">{pageName}</Link>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default NavPage;