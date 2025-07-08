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

        if (componentRef.current.getAttribute(CONTROL_DIMENSION_DATA) === CONTROL_DIMENSION_MAXIMIZE) {

            component.style.top = "0px";
            component.style.left = "0px";
            component.style.width = window.innerWidth + "px";
            component.style.height = window.innerHeight + "px";
        } else {
            const {rectDimension, appName} = RectGetter(componentRef);
            if (sessionStorage.getItem(appName) === null) {
                RectInitialize(componentRef)
                RectLoader(componentRef)
            }

            component.style.top = rectDimension.top + "px";
            component.style.left = rectDimension.left + "px";
            component.style.width = rectDimension.width + "px";
            component.style.height = rectDimension.height + "px";
        }

    }, [])

    return {RectSetter, RectGetter, RectLoader}
}