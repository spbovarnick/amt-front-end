'use client';

import React, { useState } from "react";
import DrawerButton from "./DrawerButton";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import xIcon from "@/../public/images/x.svg"
import chevronDown from 'public/images/chevron-down.svg'
import chevronUp from 'public/images/chevron-up.svg'
import Image from "next/image";
import toggleFilterParam from "@/utils/toggleFilterParam";

const Drawer = ({
    label,
    data,
    filterCateogry,
    mediumOrYear=false,
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const sp = useSearchParams();

    const selected = sp.getAll(filterCateogry)

    const [isOpen, setIsOpen] = useState(false);
    const [filteredData, setFilteredData] = useState(data)
    const [inputVal, setInputVal] = useState("")

    const onToggle = (name) => {
        const next = toggleFilterParam(sp, filterCateogry, name)
        router.push(`${pathname}?${next}`, { scroll: false })
    }

    const handleInputChange = (event) => {
        const val = event.target.value;
        setInputVal(val);
        setFilteredData(data.filter(item => item.name.toLowerCase().includes(val.toLowerCase())));
    }

    const clearInput = (e) => {
        e.preventDefault();
        setInputVal("");
        setFilteredData(data);
    }

    const placeholder = (label) => {
        if (label.toLowerCase() === "community groups") return "communities"
        if (label.toLowerCase() === "tagged with") return "tags"
        if (label.toLowerCase() === "location") return "locations"
        return label.toLowerCase()

    }

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
            <div className={`drawer-outer button-scroll ${isOpen ? "open-drawer" : ""}`}>
                <div className="drawer-inner">
                    { label !== "Year" && label !== "Media" &&
                        <form className="search_assoc-data">
                            <input
                                className="drawer-search"
                                placeholder={`Search ${placeholder(label)}`}
                                onChange={e => handleInputChange(e)}
                                value={inputVal}
                            />
                            <button
                                className="drawer-search-clear"
                                onClick={e => clearInput(e)}
                            >
                                <Image
                                    src={xIcon.src}
                                    width={20}
                                    height={20}
                                    alt="X icon to clear search terms"
                                />
                            </button>
                        </form>
                    }
                    {filteredData.map((item, i) => (
                        <DrawerButton
                            key={item.id + item.name}
                            item={item}
                            label={item.name}
                            toggleTag={onToggle}
                            isActive={mediumOrYear ? selected.includes(String(item.value)) : selected.includes(item.name)}
                            mediumOrYear={mediumOrYear}
                            style={{ "--i": i}}
                        />
                    ))}
                </div>
            </div>
            { label !== "Collections" && <span className="cmpt-drawer-separator"></span>}
        </div>
    );
}

export default Drawer;