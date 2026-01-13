import Image from 'next/image';
import xIcon from "@/../public/images/x.svg"

const DrawerButton = ({item, label, isActive = false, handleClick}) => {
    return (
        <button
            type="button"
            className={`cmpt-drawer-button ${isActive && "active"}`}
            onClick={() => { handleClick(item.name) }}
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