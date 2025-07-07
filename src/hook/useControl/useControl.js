import {useState, useCallback} from "react";
import {useSaveRect} from "../useSaveRect/useSaveRect.js";

// Focus Variable Function
let zIndexCurrent = 0;      // Initialize Component (n)
let zIndexThreshold = 3;    // Set current top focus zIndex (n + 1)
let zIndexTaskbar = 0;      // Initialize Taskbar (n + zIndexThreshold + 1)

export function useControl(componentRef) {
    const [isMounted, setIsMounted] = useState(false);
    const [visibleClass, setVisibleClass] = useState("" || null)
    const {RectSetter, RectGetter} = useSaveRect()

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

            if (!component.classList.contains("OPEN")) {
                setVisibleClass("OPEN")
                component.addEventListener("mousedown", onClick_Focus)
            }
            onClick_Focus()
        }, 10); // <-- Set this to 10ms, to use the eventLoop callback queue
    }, [componentRef.current]);


    const onClick_Close = useCallback(() => {
        const component = componentRef.current;
        if (!component) return;

        if (!component.classList.contains("CLOSE")) {
            setVisibleClass("CLOSE")
            component.removeEventListener("mousedown", onClick_Focus)
            RectSetter(componentRef)

            setTimeout(() => setIsMounted(false), 300); // Match CSS transition duration
        }
    }, [componentRef.current]);


    const onClick_Minimize = useCallback(() => {
        const component = componentRef.current;
        if (!component) return;

        if (!component.classList.contains("HIDE")) {
            setVisibleClass("HIDE")
            component.removeEventListener("mousedown", onClick_Focus)
            RectSetter(componentRef)
        }

    }, [componentRef.current])

    // TODO: Maximize Function
    const onClick_Maximize = useCallback(() => {
        const component = componentRef.current;
        if (!component) return;

        if (!component.classList.contains("MAXIMIZE")) {
            const Taskbar = document.querySelector(`.Taskbar_Container`);
            const Taskbar_height = parseFloat(window.getComputedStyle(Taskbar).height) || 0
            setVisibleClass("MAXIMIZE")

            component.style.top = `0px`
            component.style.left = `0px`
            component.style.width = `${window.innerWidth}px`;
            component.style.height = `${window.innerHeight - Taskbar_height}px`;
        } else {
            const {rectDimension} = RectGetter(componentRef)
            setVisibleClass("OPEN");

            component.style.top = `${rectDimension.top}px`;
            component.style.left = `${rectDimension.left}px`;
            component.style.width = `${rectDimension.width}px`;
            component.style.height = `${rectDimension.height}px`;
        }

    }, [componentRef.current])

    return {visibleClass, isMounted, onClick_Open, onClick_Close, onClick_Minimize, onClick_Maximize, onClick_Focus};
}
