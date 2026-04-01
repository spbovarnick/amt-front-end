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

    const onToggle = (name) => {
        const next = toggleFilterParam(sp, filterCateogry, name)
        router.push(`${pathname}?${next}`, { scroll: false })
    }

    const filterButtons = (event) => {
        const wrapperEl = event.target.parentNode.parentNode;
        console.log(wrapperEl)
        const btns = wrapperEl.querySelectorAll(".cmpt-drawer-button")

        Array.from(btns).forEach((btn) => {
            if (
                btn.textContent
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase())
            ) {
                btn.style.display = "block";
            } else {
                btn.style.display = "none";
            }
        })
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
                                placeholder={`Search for ${label.toLowerCase()}`}
                                onChange={e => filterButtons(e)}
                            />
                            <button className="drawer-search-clear">
                                <Image
                                    src={xIcon.src}
                                    width={20}
                                    height={20}
                                    alt="X icon to clear search terms"
                                    onClick={e => clearTerm(e)}
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