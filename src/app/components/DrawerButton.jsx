import Image from 'next/image';
import xIcon from "@/../public/images/x.svg"

const DrawerButton = ({item, label, isActive, toggleTag, mediumOrYear}) => {

    const handleClick = (e) => {
        e.preventDefault();
        mediumOrYear ? toggleTag(item.value) : toggleTag(item.name);
        return
    }
    return (
        <button
            type="button"
            className={`cmpt-drawer-button ${isActive && "active"}`}
            onClick={(e) => handleClick(e)}
        >
            {isActive &&
                <Image
                    src={xIcon}
                    width={16}
                    height={16}
                    className='drawer-btn-xIcon'
                    alt="X icon"
                />}
            <span className='cmpt-btn-label'>{label}</span>
        </button>
    );
}

export default DrawerButton;