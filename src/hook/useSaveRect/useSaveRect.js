import {useCallback} from "react";

export function useSaveRect() {
    // Set Rect of the component
    const RectSetter =  useCallback((componentRef) => {
        if (!componentRef.current) return console.log("Invalid ComponentRef")
        if (componentRef.current.classList.contains("MAXIMIZE")) return;

        const component = componentRef.current;
        const appName = [...component.classList]
            .filter(className => className.endsWith("_App"))
            .toString()
            .trim();
        const rectDimension = component.getBoundingClientRect();

        sessionStorage.setItem(appName, JSON.stringify(rectDimension))

        // DEBUG
        // console.group(`SET: ${appName}`)
        // console.log(rectDimension)
        // console.groupEnd()

    }, [])

    const RectGetter = useCallback((componentRef) => {
        const component = componentRef.current;
        const appName = [...component.classList]
            .filter(className => className.endsWith("_App"))
            .toString()
            .trim();
        const rectDimension = JSON.parse(sessionStorage.getItem(appName))

        // DEBUG
        // console.group(`GET: ${appName}`)
        // console.log(rectDimension)
        // console.groupEnd()

        return {rectDimension, appName}
    }, [])

    return {RectSetter, RectGetter}
}