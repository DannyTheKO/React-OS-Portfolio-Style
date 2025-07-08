import {useCallback} from "react";
import {useSaveRect} from "../../useSaveRect/useSaveRect.js";
import {FocusFunction} from "../onFocus/FocusFunction.js";

export function MinimizeFunction(componentRef, setIsMounted, CONTROL_STATUS_DATA, CONTROL_STATUS_MINIMIZE) {
    const {onClick_Focus} = FocusFunction(componentRef);

    const onClick_Minimize = useCallback(() => {
        const component = componentRef.current;
        if (!component) return;

        setIsMounted(true)
        component.setAttribute(CONTROL_STATUS_DATA, CONTROL_STATUS_MINIMIZE)
        component.removeEventListener("mousedown", onClick_Focus)

    }, [componentRef.current])

    return {onClick_Minimize}
}