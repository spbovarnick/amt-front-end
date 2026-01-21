'use client';

import React, { useState } from "react";
import DrawerButton from "./DrawerButton";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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
    const [btnOffset, setBtnOffset] = useState(0)

    const onToggle = (name) => {
        const next = toggleFilterParam(sp, filterCateogry, name)
        router.push(`${pathname}?${next}`, { scroll: false })
    }

    const visibleItems = data.slice(0, 25 + btnOffset * 25);


    const updateOffset = (e) => {
        e.preventDefault();
        data?.length < 50 + (25 * (btnOffset - 1)) ? setBtnOffset(0) : setBtnOffset(btnOffset + 1);
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
            <div className={`button-scroll ${isOpen ? "open-drawer" : ""}`}>
                {visibleItems.map(item => (
                    <DrawerButton
                        key={item.id + item.name}
                        item={item}
                        label={item.name}
                        toggleTag={onToggle}
                        isActive={mediumOrYear ? selected.includes(String(item.value)) : selected.includes(item.name)}
                        mediumOrYear={mediumOrYear}
                    />
                ))}
                <div
                    className={`show-all-drawerBtns`}
                    onClick={(e) => updateOffset(e)}
                >{data?.length > 50 + (25 * (btnOffset - 1)) ? "Show more" : "Show less"}</div>
            </div>
            { label !== "Collections" && <span className="cmpt-drawer-separator"></span>}
        </div>
    );
}

export default Drawer;