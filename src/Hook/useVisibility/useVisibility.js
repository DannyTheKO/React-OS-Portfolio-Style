import React, {useState, useCallback, useEffect, useRef} from "react";

export function useVisibility(componentRef, initial = false) {
    const [isVisible, setIsVisible] = useState(initial);
    const [isMounted, setIsMounted] = useState(initial);
    const [visibleClass, setVisibleClass] = useState("")

    const onClick_Open = useCallback(() => {
        setIsMounted(true)

        // Small delay to allow DOM to update before animation starts
        setTimeout(() => setIsVisible(true), 10);
    }, []);

    const onClick_Close = useCallback(() => {
        setIsVisible(false)

        // Wait for animation to complete before unmounting
        setTimeout(() => setIsMounted(false), 300); // Match your CSS transition duration
    }, []);

    const onClick_Minimize = useCallback(() => {
        setIsVisible(false)
    }, [])


    // TODO: Maximize Function

    return {isVisible, isMounted, onClick_Open, onClick_Close, onClick_Minimize};
}
