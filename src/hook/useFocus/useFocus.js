import React, {useState, useEffect, useCallback} from "react";

/* TODO: Fix this
    ────────────────────────────────────────────
    We want:   wallpaper (0) < windows (2 -> n) < task-bar (n+1)
    ────────────────────────────────────────────
 */

let zIndexCurrent = 0;      // Initialize Component (n)
let zIndexThreshold = 3;    // Set current top focus zIndex (n + 1)
let zIndexTaskbar = 0;      // Initialize Taskbar (n + zIndexThreshold + 1)

export function useFocus(componentRef) {

    const onClick_Focus = useCallback(() => {
        const component = componentRef.current;
        const Taskbar = document.querySelector(`.Taskbar-Container`)

        if (!component || !Taskbar) return;

        // Initialize
        zIndexCurrent = parseInt(window.getComputedStyle(component).zIndex);
        zIndexTaskbar = parseInt(window.getComputedStyle(Taskbar).zIndex);

        // Logic
        if (zIndexCurrent < zIndexThreshold) {
            zIndexThreshold += 1;
            component.style.zIndex = zIndexThreshold;

            zIndexTaskbar = zIndexThreshold + 1;
            Taskbar.style.zIndex = zIndexTaskbar;
        }

        console.log(`=============================================`)
        console.log(`Component Name: ${component.className}`)
        console.log(`Current Component: ${component.style.zIndex}`)
        console.log(`Threshold: ${zIndexThreshold}`)
        console.log(`Current Taskbar: ${zIndexTaskbar}`)

    }, [componentRef]);

    useEffect(() => {
        const component = componentRef.current;
        const Taskbar = document.querySelector(`.Taskbar-Container`)

        if (!component || !Taskbar) return;

        const handleMouseDown = () => onClick_Focus();
        component.addEventListener("mousedown", handleMouseDown)

    }, [componentRef, onClick_Focus]);

    return {onClick_Focus}
}