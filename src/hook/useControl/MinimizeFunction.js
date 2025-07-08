import {useCallback} from "react";
import {useSaveRect} from "../useSaveRect/useSaveRect.js";
import {FocusFunction} from "./FocusFunction.js";

export function MinimizeFunction(componentRef, setIsMounted, CONTROL_STATUS_DATA, CONTROL_STATUS_MINIMIZE) {
    const {RectSetter, RectGetter} = useSaveRect();
    const {onClick_Focus} = FocusFunction(componentRef);

    const onClick_Minimize = useCallback(() => {
        const component = componentRef.current;
        if (!component) return;

        setIsMounted(true)
        component.setAttribute(CONTROL_STATUS_DATA, CONTROL_STATUS_MINIMIZE)
        component.removeEventListener("mousedown", onClick_Focus)
        RectSetter(componentRef)

    }, [componentRef.current])

    return {onClick_Minimize}
}