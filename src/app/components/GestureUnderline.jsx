import Link from 'next/link';
import classNames from 'classnames';

const GestureUnderline = ({ text, url, isLight, isSmall, isDonate, onClickFn, isExternal }) => {
  const cmptClasses = classNames({
    'cmpt-gesture-underline': true,
    'is-light': isLight,
    'is-small': isSmall,
    'is-donate': isDonate
  });

  return (
    <>
      {onClickFn &&
        <a className={cmptClasses} onClick={onClickFn}>{text}</a>
      }

      {isExternal && !onClickFn &&
        <a className={cmptClasses} href={url} target="_blank" rel="noopener">{text}</a>
      }

      {!onClickFn && !isExternal &&
        <Link
          className={cmptClasses}
          href={url}
        >
          {text}
        </Link>
      }
    </>
  );
}

export default GestureUnderline;