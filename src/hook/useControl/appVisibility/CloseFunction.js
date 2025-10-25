import {useCallback} from "react";
import {useSaveRect} from "../../useSaveRect/useSaveRect.js";

export function CloseFunction(componentRef, setIsMounted, CONTROL_STATUS_DATA, CONTROL_STATUS_CLOSE) {
    const {RectSetter} = useSaveRect();

    const onClick_Close = useCallback(() => {
        const component = componentRef.current;
        if (!component) return;

        component.setAttribute(CONTROL_STATUS_DATA, CONTROL_STATUS_CLOSE)
        component.removeEventListener("mousedown", onClick_Focus)
        RectSetter(componentRef)

        // Limit delayed timing for all animation no longer than 300ms
        setTimeout(() => setIsMounted(false), 300);
    }, [componentRef]);

    return {onClick_Close}
}