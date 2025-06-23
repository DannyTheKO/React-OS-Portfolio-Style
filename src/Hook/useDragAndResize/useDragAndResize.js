import React, {useEffect, useRef, useState} from "react";
import {useResizableComponent} from "./useResizableComponent.js";
import {useDraggableComponent} from "./useDraggableComponent.js";

export function useDragAndResize() {
    const componentRef = useRef(null)
    const [componentName, setComponentName] = useState([])
    const {dimensions} = useResizableComponent(componentRef)
    const {position, isDraggable} = useDraggableComponent(componentRef);

    useEffect(() => {
        if (!componentRef.current) return;

        const classList = Array.from(componentRef.current.classList);
        const filteredClassList = classList.filter(cls => cls !== "SHOW" && cls !== "HIDE");
        setComponentName(filteredClassList)

    }, [componentRef.current]);

    const componentState = {
        componentName,
        position,
        dimensions,
        isDraggable
    }

    return {componentRef, componentState};
}