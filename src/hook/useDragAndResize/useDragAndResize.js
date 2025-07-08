import React, {useEffect, useState} from "react";
import {resizableApp} from "./Resize/ResizableApp.js";
import {draggableApp} from "./Drag/DraggableApp.js";
import {draggableIcon} from "./Drag/DraggableIcon.js";

export function useDragAndResize(appRef, iconRef) {
    const [name, setName] = useState("")
    const {dimensions} = resizableApp(appRef)
    const {position: appPosition} = draggableApp(appRef);
    const {position: iconPosition} = draggableIcon(iconRef);

    useEffect(() => {
        if (!appRef.current) return;

        const classList = appRef.current.classList
        setName(classList.toString())

    }, [appRef]);

    const appState = {
        name,
        appPosition,
        dimensions,
    }

    const iconState = {
        iconPosition
    }

    // // DEBUG
    // useEffect(() => {
    //     if (componentState.componentName.length === 0) return;
    //
    //     // for more accurate log
    //     const timeout = setTimeout(() => {
    //         console.log("Component State Update:", componentState);
    //     }, 100);
    //
    //     // Cleanup the timeout if the componentState changes quickly
    //     return () => clearTimeout(timeout);
    // }, [componentState]);

    return {appState, iconState}
}