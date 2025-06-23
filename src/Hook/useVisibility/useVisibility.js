import React, {useState, useCallback, useEffect, useRef} from "react";

export function useVisibility(initial = false) {
    const [isVisible, setIsVisible] = useState(initial);
    const [isMounted, setIsMounted] = useState(initial);
    const [isFocus, setIsFocus] = useState()
    const componentRef = useRef(null)

    // TODO: Focus Function, using z-index

    // useEffect(() => {
    //     if (!componentRef.current) return;
    //
    // }, [componentRef.current]);


    const onClick_Open = useCallback(() => {
        setIsMounted(true);
        // Small delay to allow DOM to update before animation starts
        setTimeout(() => setIsVisible(true), 10);
    }, []);


    const onClick_Close = useCallback(() => {
        setIsVisible(false);
        // Wait for animation to complete before unmounting
        setTimeout(() => setIsMounted(false), 300); // Match your CSS transition duration
    }, []);

    return {isVisible, isMounted, onClick_Open, onClick_Close};
}
