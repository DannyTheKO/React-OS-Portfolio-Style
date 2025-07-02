import React, {useCallback} from "react";

export function useSaveRect() {
    // Set Rect of the component
    const RectSetter =  useCallback((componentRef) => {
        if (!componentRef.current) return;

        const component = componentRef.current
        const rect = component.getBoundingClientRect();
        const appName = [...component.classList].filter(className => className.endsWith("_App")).toString();

        sessionStorage.setItem(appName, JSON.stringify(rect))
    }, [])

    // TODO: GETTER
    const RectGetter = useCallback((componentRef) => {
        console.log(componentRef)
    }, [])

    return {RectSetter, RectGetter}
}