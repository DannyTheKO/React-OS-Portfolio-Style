import React, {useRef} from "react";
import {useResizableComponent} from "./useResizableComponent.js";
import {useDraggableComponent} from "./useDraggableComponent.js";

export function useDragAndResize() {
    const { componentRef, dimension } = useResizableComponent()
    const { position, isDraggable } = useDraggableComponent(componentRef);

    const componentState = {
        position,
        dimension,
        isDraggable
    }

    return { componentRef, componentState };
}