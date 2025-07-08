import {useState, useCallback} from "react";
import {useSaveRect} from "../useSaveRect/useSaveRect.js";
import {FocusFunction} from "./onFocus/FocusFunction.js";
import {MaximizeFunction} from "./appDimension/MaximizeFunction.js";
import {OpenFunction} from "./appVisibility/OpenFunction.js";
import {CloseFunction} from "./appVisibility/CloseFunction.js";
import {MinimizeFunction} from "./appVisibility/MinimizeFunction.js";

// Control Attribute
const CONTROL_STATUS_DATA = "app-control-status";
const CONTROL_STATUS_OPEN = "OPEN";
const CONTROL_STATUS_CLOSE = "CLOSE";
const CONTROL_STATUS_MINIMIZE = "MINIMIZE";

export function useControl(componentRef) {
    const [isMounted, setIsMounted] = useState(false);

    // Control Function
    const {onClick_Focus} = FocusFunction(componentRef);
    const {onClick_Maximize} = MaximizeFunction(componentRef);
    const {onClick_Open} = OpenFunction(componentRef, setIsMounted, CONTROL_STATUS_DATA, CONTROL_STATUS_OPEN)
    const {onClick_Close} = CloseFunction(componentRef, setIsMounted, CONTROL_STATUS_DATA, CONTROL_STATUS_CLOSE)
    const {onClick_Minimize} = MinimizeFunction(componentRef, setIsMounted, CONTROL_STATUS_DATA, CONTROL_STATUS_MINIMIZE)

    return {
        isMounted,
        onClick_Open,
        onClick_Close,
        onClick_Minimize,
        onClick_Maximize,
        onClick_Focus
    };
}
