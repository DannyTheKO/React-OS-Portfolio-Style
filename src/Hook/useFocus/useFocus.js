import React, {useState, useEffect, useCallback} from "react";

/*
    ────────────────────────────────────────────
    We want:   wallpaper (0) < windows (2-9) < task-bar (10)
    ────────────────────────────────────────────
 */

const Z_MIN = 2;      // just above wallpaper
const Z_MAX = 9;      // always below the task-bar (z-index 10)
let   zIndexCounter = Z_MIN;

export function useFocus(componentRef) {
    const [isFocused, setIsFocused] = useState(false)

    const onClick_Focus = useCallback(() => {
        const component = componentRef.current;
        if (!component) return;

        zIndexCounter = zIndexCounter >= Z_MAX ? Z_MIN : zIndexCounter + 1;
        component.style.zIndex = zIndexCounter;

        setIsFocused(true);
    }, [componentRef])

    useEffect(() => {
        const component = componentRef.current;
        if (!component) return;

        /* initial z-index so newly-mounted window is visible */
        component.style.zIndex = Z_MIN;

        const handleMouseDown = () => onClick_Focus()
        component.addEventListener("mousedown", handleMouseDown)

        return (
            component.removeEventListener("mousedown", handleMouseDown)
        )
    }, [componentRef, onClick_Focus]);

    return {isFocused, onClick_Focus}
}