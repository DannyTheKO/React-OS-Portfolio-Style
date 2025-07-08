import {useCallback, useState} from "react";
import {FocusFunction} from "../onFocus/FocusFunction.js";
import {useSaveRect} from "../../useSaveRect/useSaveRect.js";

export function OpenFunction(componentRef, setIsMounted, CONTROL_STATUS_DATA, CONTROL_STATUS_OPEN) {
    const {onClick_Focus} = FocusFunction(componentRef)
    const {RectLoader} = useSaveRect();

    // Force render functionality
    const [, updateState] = useState();
    const forceRender = useCallback(() => updateState({}), []);

    const onClick_Open = useCallback(() => {
        setIsMounted(true)

        setTimeout(() => {
            const component = componentRef.current
            if (!component) return;

            component.setAttribute(CONTROL_STATUS_DATA, CONTROL_STATUS_OPEN)
            component.addEventListener("mousedown", onClick_Focus)
            RectLoader(componentRef);
            onClick_Focus();
            forceRender();
        }, 10); // <-- Set this to 10ms, to use the eventLoop callback queue
    }, [componentRef.current]);

    return {onClick_Open}
}