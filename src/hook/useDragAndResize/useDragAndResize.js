import React, {useEffect, useState} from "react";
import {resizableApp} from "./ResizableApp.js";
import {draggableApp} from "./DraggableApp.js";

export function useDragAndResize(componentRef) {
    const [componentName, setComponentName] = useState("")
    const {dimensions} = resizableApp(componentRef)
    const {position} = draggableApp(componentRef);

    useEffect(() => {
        if (!componentRef.current) return;

        const classList = Array.from(componentRef.current.classList);
        const filteredClassList = classList.filter(cls => cls !== "SHOW" && cls !== "HIDE");
        setComponentName(filteredClassList.toString())

    }, [componentRef.current]);

    const componentState = {
        componentName,
        position,
        dimensions,
    }

    // DEBUG
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