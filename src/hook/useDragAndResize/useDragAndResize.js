import React, {useEffect, useState} from "react";
import {resizableApp} from "./Resize/ResizableApp.js";
import {draggableApp} from "./Drag/DraggableApp.js";

export function useDragAndResize(componentRef) {
    const [componentName, setComponentName] = useState("")
    const {dimensions} = resizableApp(componentRef)
    const {position} = draggableApp(componentRef);

    useEffect(() => {
        if (!componentRef.current) return;

        const classList = componentRef.current.classList
        setComponentName(classList.toString())

    }, [componentRef.current]);

    const componentState = {
        componentName,
        position,
        dimensions,
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

    return {componentState}
}