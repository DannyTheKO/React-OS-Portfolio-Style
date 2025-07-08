import {useCallback} from "react";

const CONTROL_DIMENSION_DATA = "app-control-dimension";
const CONTROL_DIMENSION_MAXIMIZE = "MAXIMIZE";

export function useSaveRect() {
    // Set Rect of the component
    const RectSetter =  useCallback((componentRef) => {
        if (!componentRef.current) return;
        if (componentRef.current.getAttribute(CONTROL_DIMENSION_DATA) === CONTROL_DIMENSION_MAXIMIZE) return;

        const component = componentRef.current;
        const appName = [...component.classList]
            .filter(className => className.endsWith("_App"))
            .toString()
            .trim();
        const rectDimension = component.getBoundingClientRect();

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

    return {RectSetter, RectGetter}
}