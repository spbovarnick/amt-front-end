'use client';

import { useState } from "react";
import InfoWindow from './InfoWindow'

const LocationMarker = ({  name, text, archiveItemLocationId, id }) => {
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [isTextHovered, setTextHovered] = useState(false);
    const [isIconHovered, setIconHovered ] = useState(false);

    const handleClick = () => {
        setShowInfoWindow(!showInfoWindow)
    }

    return (
        <div className="pin" 
            style={{
                zIndex: showInfoWindow ? "12" : "10"
            }}
        >
            {showInfoWindow ?  
                <InfoWindow name={name} text={text} handleClick={handleClick} windowOpen={showInfoWindow} /> : 
                <span 
                    className="pin-heading"
                    style={{ 
                        color: isTextHovered || isIconHovered ? "#5444ec" : "black",
                        zIndex: isTextHovered || isIconHovered ? "11" : "10",
                        display: isTextHovered || isIconHovered || id === archiveItemLocationId ? "block" : "none", 
                    }}
                    onMouseEnter={() => setTextHovered(true)}
                    onMouseLeave={() => setTextHovered(false)}
                    onClick={handleClick}
                >
                    {name}
                </span>
            }
            <svg 
                width="24" 
                height="24" 
                viewBox="0 0 16 16" 
                className="location-marker-icon"
                style={{ fill: isIconHovered || isTextHovered || showInfoWindow ? "#5444ec" : "black"}}
                onMouseEnter={() => setIconHovered(true)}
                onMouseLeave={() => setIconHovered(false)}
                onClick={handleClick}
            >
                <path  d="M9.156 14.544C10.899 13.01 14 9.876 14 7A6 6 0 0 0 2 7c0 2.876 3.1 6.01 4.844 7.544a1.736 1.736 0 0 0 2.312 0ZM6 7a2 2 0 1 1 4 0a2 2 0 0 1-4 0Z"/>
            </svg>
        </div>
    )
}

export default LocationMarker