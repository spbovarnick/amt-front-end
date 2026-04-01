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

    const onToggle = (name) => {
        const next = toggleFilterParam(sp, filterCateogry, name)
        router.push(`${pathname}?${next}`, { scroll: false })
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
                    {data.map((item, i) => (
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