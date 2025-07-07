import {useCallback} from "react";

export function useSaveRect() {
    // Set Rect of the component
    const RectSetter =  useCallback((componentRef) => {
        const {rectDimension, appName} = getAppDetail(componentRef);
        sessionStorage.setItem(appName, JSON.stringify(rectDimension))
    }, [])

    // TODO: GETTER
    const RectGetter = useCallback((componentRef) => {
        const {rectDimension, appName} = getAppDetail(componentRef);

        // DEBUG
        console.group(appName)
        console.log(rectDimension)
        console.groupEnd()

        return {rectDimension, appName}
    }, [])

    function getAppDetail(componentRef) {
        if (!componentRef.current) return console.log("Invalid ComponentRef")

        const component = componentRef.current;
        const rectDimension = component.getBoundingClientRect();
        const appName = [...component.classList]
            .filter(className => className.endsWith("_App"))
            .toString()
            .trim();

        return {rectDimension, appName}
    }

    return {RectSetter, RectGetter}
}