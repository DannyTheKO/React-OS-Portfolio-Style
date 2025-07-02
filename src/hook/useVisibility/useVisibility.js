import React, {useState, useCallback} from "react";
import {useSaveRect} from "../useSaveRect/useSaveRect.js";

// Focus Variable Function
let zIndexCurrent = 0;      // Initialize Component (n)
let zIndexThreshold = 3;    // Set current top focus zIndex (n + 1)
let zIndexTaskbar = 0;      // Initialize Taskbar (n + zIndexThreshold + 1)

export function useVisibility(componentRef) {
    const [isMounted, setIsMounted] = useState(false);
    const [visibleClass, setVisibleClass] = useState("")
    const {RectSetter, RectGetter} = useSaveRect()

    // TODO: Maximize Function
    // TODO: Get Rect Windows

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

        // DEBUG
        // console.log(`=============================================`)
        // console.log(`Component Name: ${component.className}`)
        // console.log(`Current Component: ${component.style.zIndex}`)
        // console.log(`Threshold: ${zIndexThreshold}`)
        // console.log(`Current Taskbar: ${zIndexTaskbar}`)

    }, [componentRef]);

    const onClick_Open = useCallback(() => {
        // Mount component on user screen BUT visible is still false
        setIsMounted(true)

        // Small delay to allow DOM to update before animation starts
        setTimeout(() => {
            const component = componentRef.current

            // Check NULL component
            if (!component) {
                console.error("something fuck in the useVisibility -> onClick_Open()")
                return; // Exit function
            }

            if (component.classList.contains("CLOSE") || component.classList.contains("HIDE") || component.classList.length === 1) {
                setVisibleClass("OPEN")
            }

            component.addEventListener("mousedown", onClick_Focus)
            onClick_Focus()
        }, 10); // <-- Set this to 10ms, to use the eventLoop callback queue
    }, [componentRef.current]);


    const onClick_Close = useCallback(() => {
        const component = componentRef.current;
        if (!component) {
            console.error("something fuck in the useVisibility -> onClick_Close()")
            return; // Exit function
        }

        if (component.classList.contains("OPEN") || component.classList.contains("HIDE") || component.classList.length === 1) {
            setVisibleClass("CLOSE")

            // Wait for animation to complete before unmounting
            setTimeout(() => setIsMounted(false), 300); // Match CSS transition duration
        }

        component.removeEventListener("mousedown", onClick_Focus)
        RectSetter(componentRef)
    }, [componentRef.current]);


    const onClick_Minimize = useCallback(() => {
        const component = componentRef.current;
        if (!component) {
            console.error("something fuck in the useVisibility -> onClick_Minimize()")
            return; // Exit function
        }

        if (component.classList.contains("OPEN") || component.classList.length === 1) {
            setVisibleClass("HIDE")
        }

        component.removeEventListener("mousedown", onClick_Focus)
        RectSetter(componentRef)
    }, [componentRef.current])


    return {visibleClass, isMounted, onClick_Open, onClick_Close, onClick_Minimize};
}
