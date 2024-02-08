const InfoWindow = ({name, text, handleClick, windowOpen}) => {

    return (
        windowOpen && (
            <div className="info-window" >
                <button onClick={handleClick}>x</button>
                <h3 className="info-window-title">{name}</h3>
                <p className="info-window-content">{text}</p>
            </div>
        )
    )
}

export default InfoWindow