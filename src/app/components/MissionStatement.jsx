import React from "react";

const MissionStatement = ({text}) => {
    return (
        <div className="cmpt-mission-statement">
            <div className="global-container">
                <div className="cmpt-mission-statement__wrapper">
                    {text}
                </div>
            </div>
        </div>
    );
}

export default MissionStatement;