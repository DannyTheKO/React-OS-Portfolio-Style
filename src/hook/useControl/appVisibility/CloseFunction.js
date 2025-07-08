import {useCallback} from "react";
import {useSaveRect} from "../../useSaveRect/useSaveRect.js";
import {FocusFunction} from "../onFocus/FocusFunction.js";

export function CloseFunction(componentRef, setIsMounted, CONTROL_STATUS_DATA, CONTROL_STATUS_CLOSE) {
    const {RectSetter, RectGetter} = useSaveRect();
    const {onClick_Focus} = FocusFunction(componentRef)


    const onClick_Close = useCallback(() => {
        const component = componentRef.current;
        if (!component) return;

        component.setAttribute(CONTROL_STATUS_DATA, CONTROL_STATUS_CLOSE)
        component.removeEventListener("mousedown", onClick_Focus)
        RectSetter(componentRef)

        setTimeout(() => setIsMounted(false), 300); // Match CSS transition duration
    }, [componentRef]);

    return {onClick_Close}
}