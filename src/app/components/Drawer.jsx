import React, { useState } from "react";
import DrawerButton from "./DrawerButton";
// import { useLocation, useNavigate } from "react-router-dom";
import chevronDown from 'public/images/chevron-down.svg'
import chevronUp from 'public/images/chevron-up.svg'

const Drawer = ({ label, data, pageReset, archiveGallery, filterCateogry, filterSearchParams }) => {
    // let navigate = useNavigate();
    // let location = useLocation();
    // let searchParams = new URLSearchParams(location.search)

    const [isOpen, setIsOpen] = useState(false)

    const toggleTag = (name) => {
        // pageReset();
        // if(filterSearchParams.filter(i => i === name).length > 0) {
        //     // array of filter params, minus the one just de-selected by user
        //     const filterOptions = searchParams.getAll(filterCateogry).filter(filterOption => filterOption !== name)        
        //     // .delete() removes all filters with of key filterCategory
        //     searchParams.delete(filterCateogry)
        //     // for loop reconstructs search params from filterOptions array
        //     for (const filterOption of filterOptions) {
        //         searchParams.append(filterCateogry, filterOption)
        //     }
        //     // navigates to new URL based on updated params
        //     navigate({
        //         pathname: location.pathname,
        //         search: searchParams.toString()
        //     })
        // } else {
        //     // appends search URLSearchParams object with selected key value pair
        //     searchParams.append(filterCateogry, name)
        //     // navigates to new URL based on appended params
        //     navigate({
        //         pathname: location.pathname,
        //         search: searchParams.toString()
        //     })
        //     archiveGallery.scrollIntoView({ behavior: "smooth" })
        // }
    }

    return (
        <div className="cmpt-drawer">
            <div className="archive__label">
                {label}
                <button className="cmpt-drawer-toggle" onClick={()=>{setIsOpen(!isOpen)}}>
                    <img src={isOpen ? chevronUp : chevronDown} />
                </button>
            </div>
            <div className={`button-scroll ${isOpen ? "open-drawer" : ""}`}>
                {data.map(item =>
                    <DrawerButton 
                    item={item} 
                    label={item.name} 
                    key={item.id} 
                    handleClick={toggleTag} 
                    // button selection determined by inclusion in filterSearchParams
                    isActive={filterSearchParams?.includes(item.name)} 
                    />
                    )}
            </div>
            { label !== "Collections" && <span className="cmpt-drawer-separator"></span>}
        </div>
    );
}

export default Drawer;