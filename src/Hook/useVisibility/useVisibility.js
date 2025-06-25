import React, {useState, useCallback, useEffect, useRef} from "react";
import {useFocus} from "../useFocus/useFocus.js";

export function useVisibility(componentRef, initialState = false) {
    const [isMounted, setIsMounted] = useState(initialState);
    const [visibleClass, setVisibleClass] = useState("")
    const {onClick_Focus} = useFocus(componentRef);

    // TODO: Maximize Function

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

            // Check if component class contain "CLOSE" or class only has component class
            if (component.classList.contains("CLOSE") || component.classList.contains("HIDE") ||component.classList.length === 1) {
                // Play animation after mounted component on screen
                setVisibleClass("OPEN")
                onClick_Focus();
            }

        }, 10); // <-- Set this to 10ms, to use the eventLoop callback queue
    }, []);

    const onClick_Close = useCallback(() => {
        const component = componentRef.current;
        if (!component) {
            console.error("something fuck in the useVisibility -> onClick_Close()")
            return; // Exit function
        }

        if (component.classList.contains("OPEN") || component.classList.contains("HIDE") || component.classList.length === 1) {
            setVisibleClass("CLOSE")

            // Wait for animation to complete before unmounting
            setTimeout(() => setIsMounted(false), 300); // Match your CSS transition duration
        }
    }, []);


    const onClick_Minimize = useCallback(() => {
        const component = componentRef.current;
        if (!component) {
            console.error("something fuck in the useVisibility -> onClick_Minimize()")
            return; // Exit function
        }

        if (component.classList.contains("OPEN") || component.classList.length === 1) {
            setVisibleClass("HIDE")
        }
    }, [])


    return {visibleClass, isMounted, onClick_Open, onClick_Close, onClick_Minimize};
}
