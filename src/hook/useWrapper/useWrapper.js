// Create a new file: src/hook/useWrapper/useWrapper.js
import { useRef, useCallback, useState } from 'react';
import { useControl } from "../useControl/useControl.js";
import { useDragAndResize } from "../useDragAndResize/useDragAndResize.js";
import { draggableIcon } from "../useDragAndResize/Drag/DraggableIcon.js";

export function useWrapper() {
    const appRef = useRef(null);
    const iconRef = useRef(null)

    // Get all control functionality
    const {
        isMounted,
        onClick_Open,
        onClick_Close,
        onClick_Minimize,
        onClick_Maximize,
        onClick_Focus
    } = useControl(appRef);

    // Get drag and resize functionality
    const {appState, iconState} = useDragAndResize(appRef, iconRef);

    return {
        appRef,
        iconRef,
        isMounted,
        onClick_Open,
        onClick_Close,
        onClick_Minimize,
        onClick_Maximize,
        onClick_Focus,
        appState,
        iconState,
    };
}