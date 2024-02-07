import Link from 'next/link';
import classNames from 'classnames';

const GestureCircle = ({text, url, isLight}) => {
    const cmptClasses = classNames({
        'cmpt-gesture-circle': true,
        'is-light': isLight       
    });    

    return (    
        <Link className={cmptClasses} href={url}>{text}</Link>
    );
}

export default GestureCircle;