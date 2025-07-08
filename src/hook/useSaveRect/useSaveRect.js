import {useCallback} from "react";

const CONTROL_DIMENSION_DATA = "app-control-dimension";
const CONTROL_DIMENSION_MAXIMIZE = "MAXIMIZE";

export function useSaveRect() {
    const RectSetter = useCallback((componentRef) => {
        if (!componentRef.current) return;
        if (componentRef.current.getAttribute(CONTROL_DIMENSION_DATA) === CONTROL_DIMENSION_MAXIMIZE) return;

        const {rectDimension, appName} = RectGetter(componentRef);

        sessionStorage.setItem(appName, JSON.stringify(rectDimension))

    }, [])

    const RectGetter = useCallback((componentRef) => {
        const component = componentRef.current;
        const appName = [...component.classList]
            .filter(className => className.endsWith("_App"))
            .toString()
            .trim();
        const rectDimension = JSON.parse(sessionStorage.getItem(appName))

        return {rectDimension, appName}
    }, [])

    const RectInitialize = useCallback((componentRef) => {
        if (!componentRef.current) return;
        const {appName} = RectGetter(componentRef);
        const component = componentRef.current;
        const rectDimension = component.getBoundingClientRect();

        sessionStorage.setItem(appName, JSON.stringify(rectDimension))
    }, [])

    const RectLoader = useCallback((componentRef) => {
        if (!componentRef.current) return;
        const component = componentRef.current;

        if (component.getAttribute(CONTROL_DIMENSION_DATA) === CONTROL_DIMENSION_MAXIMIZE) {
            component.style.top = "0px";
            component.style.left = "0px";
            component.style.width = window.innerWidth + "px";
            component.style.height = window.innerHeight + "px";
        } else {
            const {rectDimension} = RectGetter(componentRef);

            // Check if rectDimension exists before using it
            if (!rectDimension) {
                // Initialize if rectDimension doesn't exist
                RectInitialize(componentRef);
                // Get the newly initialized dimensions
                const updatedData = RectGetter(componentRef);

                // Safety check again before applying styles
                if (updatedData.rectDimension) {
                    component.style.top = updatedData.rectDimension.top + "px";
                    component.style.left = updatedData.rectDimension.left + "px";
                    component.style.width = updatedData.rectDimension.width + "px";
                    component.style.height = updatedData.rectDimension.height + "px";
                }
            } else {
                // Use the existing rectDimension
                component.style.top = rectDimension.top + "px";
                component.style.left = rectDimension.left + "px";
                component.style.width = rectDimension.width + "px";
                component.style.height = rectDimension.height + "px";
            }
        }
    }, []);

    return {RectSetter, RectGetter, RectLoader}
}