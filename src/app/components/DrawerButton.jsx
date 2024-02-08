import classNames from 'classnames';

const DrawerButton = ({item, label, isActive = false, handleClick}) => {
    return (
        <button
            type="button"
            className={classNames("cmpt-drawer-button", isActive && "active")}
            onClick={() => { handleClick(item.name) }}
        >
            {label}
        </button>
    );
}

export default DrawerButton;