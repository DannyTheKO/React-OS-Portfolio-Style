import {useCallback} from "react";
import {useSaveRect} from "../../useSaveRect/useSaveRect.js";

const CONTROL_DIMENSION_DATA = "app-control-dimension";
const CONTROL_DIMENSION_ANIMATION = "STATE_TRANSITION";
const CONTROL_DIMENSION_MAXIMIZE = "MAXIMIZE";
const CONTROL_DIMENSION_ORIGINAL = "ORIGINAL";

export function MaximizeFunction(componentRef) {
    const {RectSetter, RectGetter} = useSaveRect();

    const handleTransitionEnd = useCallback((e) => {
        // Only proceed if this is the target component (not a child element)
        if (e.target !== e.currentTarget) return;

        // Only proceed if one of the positioned properties finished transitioning
        if (['width', 'height', 'top', 'left'].includes(e.propertyName)) {
            e.target.classList.remove(CONTROL_DIMENSION_ANIMATION);
            RectSetter({current: e.target});
            // Remove the event listener to prevent multiple calls
            e.target.removeEventListener('transitionend', handleTransitionEnd);
        }
    }, [RectSetter]);

    const isMaximize = useCallback((componentRef) => {
        if (!componentRef.current) return console.error("Invalid Component")
        const component = componentRef.current;

        return component.getAttribute(CONTROL_DIMENSION_DATA) === CONTROL_DIMENSION_MAXIMIZE;
    }, [componentRef])

    const toggleMaximizeControlState = useCallback((componentRef) => {
        const component = componentRef.current;
        if (!component) return;

        if (!isMaximize(componentRef)) {
            const Taskbar = document.querySelector(`.Taskbar_Container`);
            const Taskbar_Height = parseFloat(window.getComputedStyle(Taskbar).height) || 0;

            RectSetter(componentRef);

            // Add the transition class before changing attributes
            component.classList.add(CONTROL_DIMENSION_ANIMATION);

            // Important: Set dimensions BEFORE changing the attribute
            component.style.top = `0px`;
            component.style.left = `0px`;
            component.style.width = `${window.innerWidth}px`;
            component.style.height = `${window.innerHeight - Taskbar_Height}px`;

            // Set attribute after styles are applied
            component.setAttribute(CONTROL_DIMENSION_DATA, CONTROL_DIMENSION_MAXIMIZE);

            // Use the component reference directly for the event listener
            component.addEventListener("transitionend", handleTransitionEnd);
        } else {
            const {rectDimension} = RectGetter(componentRef);

            // Add the transition class before setting dimensions
            component.classList.add(CONTROL_DIMENSION_ANIMATION);

            // Set dimensions before changing attribute
            component.style.top = `${rectDimension.top}px`;
            component.style.left = `${rectDimension.left}px`;
            component.style.width = `${rectDimension.width}px`;
            component.style.height = `${rectDimension.height}px`;

            // Set attribute after dimensions
            component.setAttribute(CONTROL_DIMENSION_DATA, CONTROL_DIMENSION_ORIGINAL);

            // Use the component reference directly for the event listener
            component.addEventListener("transitionend", handleTransitionEnd);
        }
    }, [componentRef, handleTransitionEnd, isMaximize, RectGetter])

    const forceMaximizeControlState = useCallback((componentRef, wantedState) => {
        if (!componentRef.current) return console.error("Invalid Component")
        const component = componentRef.current
        const componentState = component.getAttribute(CONTROL_DIMENSION_DATA)

        if (componentState !== null && componentState !== wantedState) {
            toggleMaximizeControlState(componentRef)
        }

    }, [componentRef, toggleMaximizeControlState])

    const onClick_Maximize = useCallback(() => {
        const component = componentRef.current;
        if (!component) return;

        // toggle state
        toggleMaximizeControlState(componentRef)

    }, [componentRef, toggleMaximizeControlState, handleTransitionEnd]);

    return {onClick_Maximize, isMaximize, forceMaximizeControlState, toggleMaximizeControlState, handleTransitionEnd};
}