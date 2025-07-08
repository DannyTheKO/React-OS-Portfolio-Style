import {useCallback} from "react";
import {useSaveRect} from "../../useSaveRect/useSaveRect.js";

const CONTROL_STATE_DATA = "app-control-state";
const CONTROL_STATE_ANIMATION = "STATE_TRANSITION";
const CONTROL_STATE_MAXIMIZE = "MAXIMIZE";
const CONTROL_STATE_ORIGINAL = "ORIGINAL";

export function MaximizeFunction(componentRef) {
    const {RectSetter, RectGetter} = useSaveRect();

    const handleTransitionEnd = useCallback((e) => {
        const component = componentRef.current;
        if (!component) return;

        // Only proceed if one of the positioned properties finished transitioning
        if (['width', 'height', 'top', 'left'].includes(e.propertyName)) {
            // Remove transition class after animation completes
            component.classList.remove(CONTROL_STATE_ANIMATION);

            // Update the saved rect dimensions after transition completes
            RectSetter(componentRef);

            // Remove the event listener to prevent multiple calls
            component.removeEventListener('transitionend', handleTransitionEnd);
        }
    }, [componentRef])

    const toggleControlState = useCallback((componentRef) => {
        if (!componentRef.current) return console.error("Invalid Component")
        const component = componentRef.current;

        if (component.getAttribute(CONTROL_STATE_DATA) !== CONTROL_STATE_MAXIMIZE) {
            const Taskbar = document.querySelector(`.Taskbar_Container`);
            const Taskbar_Height = parseFloat(window.getComputedStyle(Taskbar).height) || 0;
            component.setAttribute(CONTROL_STATE_DATA, CONTROL_STATE_MAXIMIZE);

            component.style.top = `0px`;
            component.style.left = `0px`;
            component.style.width = `${window.innerWidth}px`;
            component.style.height = `${window.innerHeight - Taskbar_Height}px`;
        } else {
            const {rectDimension} = RectGetter(componentRef);
            component.setAttribute(CONTROL_STATE_DATA, CONTROL_STATE_ORIGINAL);

            component.style.top = `${rectDimension.top}px`;
            component.style.left = `${rectDimension.left}px`;
            component.style.width = `${rectDimension.width}px`;
            component.style.height = `${rectDimension.height}px`;
        }
    }, [componentRef])

    const forceControlState = useCallback((componentRef, wantedState) => {
        if (!componentRef.current) return console.error("Invalid Component")
        const component = componentRef.current
        const componentState = component.getAttribute("app-control-state")

        if (componentState !== wantedState) {
            toggleControlState(componentRef)
        }

    }, [componentRef, toggleControlState])

    const onClick_Maximize = useCallback(() => {
        const component = componentRef.current;
        if (!component) return;

        // Add the transition class before starting changes
        component.classList.add(CONTROL_STATE_ANIMATION);

        // Add event listener before starting transition
        component.addEventListener('transitionend', handleTransitionEnd);

        // toggle state
        toggleControlState(componentRef)

    }, [componentRef, toggleControlState, handleTransitionEnd]);

    return {onClick_Maximize, forceControlState};
}