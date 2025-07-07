import {useState, useCallback} from "react";
import {useSaveRect} from "../useSaveRect/useSaveRect.js";

// Focus Variable Function
let zIndexCurrent = 0;      // Initialize Component (n)
let zIndexThreshold = 3;    // Set current top focus zIndex (n + 1)
let zIndexTaskbar = 0;      // Initialize Taskbar (n + zIndexThreshold + 1)

export function useControl(componentRef) {
    const [isMounted, setIsMounted] = useState(false);
    const {RectSetter, RectGetter} = useSaveRect()

    // Force render functionality
    const [, updateState] = useState();
    const forceRender = useCallback(() => updateState({}), []);

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

    const onClick_Open = useCallback(() => {
        setIsMounted(true)

        setTimeout(() => {
            const component = componentRef.current
            if (!component) return;

            component.setAttribute("app-control-status", "OPEN")
            component.addEventListener("mousedown", onClick_Focus)
            onClick_Focus();
            forceRender();
        }, 10); // <-- Set this to 10ms, to use the eventLoop callback queue
    }, [componentRef.current]);


    const onClick_Close = useCallback(() => {
        const component = componentRef.current;
        if (!component) return;

        component.setAttribute("app-control-status", "CLOSE")
        component.removeEventListener("mousedown", onClick_Focus)
        RectSetter(componentRef)

        setTimeout(() => setIsMounted(false), 300); // Match CSS transition duration
    }, [componentRef.current]);


    const onClick_Minimize = useCallback(() => {
        const component = componentRef.current;
        if (!component) return;

        setIsMounted(true)
        component.setAttribute("app-control-status", "MINIMIZE")
        component.removeEventListener("mousedown", onClick_Focus)
        RectSetter(componentRef)

    }, [componentRef.current])

    const onClick_Maximize = useCallback(() => {
        const component = componentRef.current;
        if (!component) return;

        setIsMounted(true);

        // Add transitionend event listener
        const handleTransitionEnd = (event) => {
            // Only proceed if one of the positioned properties finished transitioning
            if (['width', 'height', 'top', 'left'].includes(event.propertyName)) {
                // Remove transition class after animation completes
                component.classList.remove("STATE_TRANSITION");

                // Update the saved rect dimensions after transition completes
                RectSetter(componentRef);

                // Remove the event listener to prevent multiple calls
                component.removeEventListener('transitionend', handleTransitionEnd);
            }
        };

        // Add the transition class before starting changes
        component.classList.add("STATE_TRANSITION");

        // Add event listener before starting transition
        component.addEventListener('transitionend', handleTransitionEnd);

        if (component.getAttribute("app-control-state") !== "MAXIMIZE") {
            const Taskbar = document.querySelector(`.Taskbar_Container`);
            const Taskbar_height = parseFloat(window.getComputedStyle(Taskbar).height) || 0;
            component.setAttribute("app-control-state", "MAXIMIZE");

            component.style.top = `0px`;
            component.style.left = `0px`;
            component.style.width = `${window.innerWidth}px`;
            component.style.height = `${window.innerHeight - Taskbar_height}px`;
        } else {
            const {rectDimension} = RectGetter(componentRef);
            component.setAttribute("app-control-state", "ORIGINAL");

            component.style.top = `${rectDimension.top}px`;
            component.style.left = `${rectDimension.left}px`;
            component.style.width = `${rectDimension.width}px`;
            component.style.height = `${rectDimension.height}px`;
        }
    }, [componentRef.current]);

    return {isMounted, onClick_Open, onClick_Close, onClick_Minimize, onClick_Maximize, onClick_Focus};
}
