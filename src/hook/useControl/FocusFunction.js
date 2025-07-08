import {useCallback} from "react";

// Focus Global Variable Function
let zIndexCurrent = 0;      // Initialize Component (n)
let zIndexThreshold = 3;    // Set current top focus zIndex (n + 1)
let zIndexTaskbar = 0;      // Initialize Taskbar (n + zIndexThreshold + 1)

export function FocusFunction(componentRef) {
    // Mounted on every component
    const onClick_Focus = useCallback(() => {
        const component = componentRef.current;
        const Taskbar = document.querySelector(`.Taskbar_Container`)

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
    }, [componentRef.current]);

    return {onClick_Focus}
}