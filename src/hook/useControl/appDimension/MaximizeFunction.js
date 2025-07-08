import {useCallback} from "react";
import {useSaveRect} from "../../useSaveRect/useSaveRect.js";

const CONTROL_DIMENSION_DATA = "app-control-dimension";
const CONTROL_DIMENSION_ANIMATION = "STATE_TRANSITION";
const CONTROL_DIMENSION_MAXIMIZE = "MAXIMIZE";
const CONTROL_DIMENSION_ORIGINAL = "ORIGINAL";

export function MaximizeFunction(componentRef) {
    const {RectSetter, RectGetter} = useSaveRect();

    const handleTransitionEnd = useCallback((e) => {
        // Use e.target instead of componentRef to ensure we always have the element
        const component = e.target;

        // Only proceed if one of the positioned properties finished transitioning
        if (['width', 'height', 'top', 'left'].includes(e.propertyName)) {
            // Remove transition class after animation completes
            component.classList.remove(CONTROL_DIMENSION_ANIMATION);

            // Update the saved rect dimensions after transition completes
            RectSetter(component);

            // Remove the event listener to prevent multiple calls
            component.removeEventListener('transitionend', handleTransitionEnd);
        }
    }, [componentRef, RectSetter])

    const isMaximize = useCallback((componentRef) => {
        if (!componentRef.current) return console.error("Invalid Component")
        const component = componentRef.current;

        return component.getAttribute(CONTROL_DIMENSION_DATA) === CONTROL_DIMENSION_MAXIMIZE;
    }, [componentRef])

    const toggleMaximizeControlState = useCallback((componentRef) => {
        const component = componentRef.current;

        // Add the transition class before starting changes
        component.classList.add(CONTROL_DIMENSION_ANIMATION);

        if (!isMaximize(componentRef)) {
            const Taskbar = document.querySelector(`.Taskbar_Container`);
            const Taskbar_Height = parseFloat(window.getComputedStyle(Taskbar).height) || 0;
            component.setAttribute(CONTROL_DIMENSION_DATA, CONTROL_DIMENSION_MAXIMIZE);
            console.log("Maximize");

            component.style.top = `0px`;
            component.style.left = `0px`;
            component.style.width = `${window.innerWidth}px`;
            component.style.height = `${window.innerHeight - Taskbar_Height}px`;
        } else {
            const {rectDimension} = RectGetter(componentRef);
            component.setAttribute(CONTROL_DIMENSION_DATA, CONTROL_DIMENSION_ORIGINAL);
            console.log("Original")

            component.style.top = `${rectDimension.top}px`;
            component.style.left = `${rectDimension.left}px`;
            component.style.width = `${rectDimension.width}px`;
            component.style.height = `${rectDimension.height}px`;
        }

        // Add event listener before starting transition
        component.addEventListener('transitionend', handleTransitionEnd);

    }, [componentRef, handleTransitionEnd, isMaximize])

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

    return {onClick_Maximize, forceMaximizeControlState, isMaximize, toggleMaximizeControlState};
}