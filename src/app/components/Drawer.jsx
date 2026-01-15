import React, { useEffect, useState } from "react";
import DrawerButton from "./DrawerButton";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import chevronDown from 'public/images/chevron-down.svg'
import chevronUp from 'public/images/chevron-up.svg'
import Image from "next/image";

const Drawer = ({ label, data, filterCateogry, filterSearchParams }) => {
    const router = useRouter();
    const pathname = usePathname();
    const sp = useSearchParams();
    const searchParams = new URLSearchParams(sp);

    const [isOpen, setIsOpen] = useState(false);
    // const [showAll, setShowAll] = useState(false);
    const [btnOffset, setBtnOffset] = useState(-1)
    const [drawerBtns, setDrawerBtns] = useState(null);

    useEffect(() => {
        const sliceStart = 25 + (25 * btnOffset);
        const sliceEnd = 50 + (25 * btnOffset);
        if (btnOffset < 0 ){
            setDrawerBtns(data?.slice(0, 25).map(item =>
                <DrawerButton
                    item={item}
                    label={item.name}
                    key={item.id}
                    handleClick={toggleTag}
                    // button selection determined by inclusion in filterSearchParams
                    isActive={filterSearchParams?.includes(item.name)}
                />
            ))
            return;
        }
        const newSlice = data?.slice(sliceStart, sliceEnd).map(item =>
            <DrawerButton
                item={item}
                label={item.name}
                key={item.id}
                handleClick={toggleTag}
                // button selection determined by inclusion in filterSearchParams
                isActive={filterSearchParams?.includes(item.name)}
            />
        );
        setDrawerBtns([...drawerBtns, ...newSlice]);
    }, [btnOffset])

    const toggleTag = (name) => {
        if(filterSearchParams.filter(i => i === name).length > 0) {
            // array of filter params, minus the one just de-selected by user
            const filterOptions = searchParams.getAll(filterCateogry).filter(filterOption => filterOption !== name)
            // .delete() removes all filters with of key filterCategory
            searchParams.delete(filterCateogry)
            // for loop reconstructs search params from filterOptions array
            for (const filterOption of filterOptions) {
                searchParams.append(filterCateogry, filterOption)
            }
            // navigates to new URL based on updated params
            const newParams = searchParams.toString()
            router.push(`${pathname}?${newParams}`, { scroll: false })
        } else {
            // appends search URLSearchParams object with selected key value pair
            searchParams.append(filterCateogry, name)
            // navigates to new URL based on appended params
            const newParams = searchParams.toString()
            router.push(`${pathname}?${newParams}`, { scroll: false })
            // archiveGallery.scrollIntoView({ behavior: "smooth" })
        }
    }

    const showMoreOrLess = (e) => {
        e.preventDefault();
        data?.length > 50 + (25 * btnOffset) ? setBtnOffset(btnOffset + 1) : setBtnOffset(-1);
    }


    const allDrawerBtns = data?.slice(25).map(item =>
        <DrawerButton
            item={item}
            label={item.name}
            key={item.id}
            handleClick={toggleTag}
            // button selection determined by inclusion in filterSearchParams
            isActive={filterSearchParams?.includes(item.name)}
        />
    )

    return (
        <div className="cmpt-drawer">
            <div className="archive__label" onClick={() => { setIsOpen(!isOpen) }}>
                    {label}
                    <Image
                        src={isOpen ? chevronUp.src : chevronDown.src}
                        width={24}
                        height={24}
                        alt="Chevron icon"
                    />
            </div>
            <div className={`button-scroll ${isOpen ? "open-drawer" : ""}`}>
                {drawerBtns && drawerBtns}
                <div
                    className={`show-all-drawerBtns`}
                    onClick={(e) => showMoreOrLess(e)}
                >{data?.length > 50 + (25 * btnOffset) ? "Show more" : "Show less"}</div>
            </div>
            { label !== "Collections" && <span className="cmpt-drawer-separator"></span>}
        </div>
    );
}

export default Drawer;