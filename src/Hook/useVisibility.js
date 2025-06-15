import React from "react";
import { useState, useCallback, useEffect } from 'react';

// TODO: Open and Close Action Element
export function useVisibility(initial = false) {
    const [isVisible, setIsVisible] = useState(initial);
    const [isMounted, setIsMounted] = useState(initial);

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

    return { isVisible, isMounted, onClick_Open, onClick_Close };
}
