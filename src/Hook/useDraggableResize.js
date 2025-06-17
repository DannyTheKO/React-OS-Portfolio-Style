import React, {useRef} from "react";
import {useResizableComponent} from "./useResizableComponent.js";
import {useDraggableComponent} from "./useDraggableComponent.js";

export function useDraggableResize() {
    const { elementRef, dimension } = useResizableComponent()
    const { position, isDraggable } = useDraggableComponent(elementRef);

    const componentState = {
        position,
        dimension,
        isDraggable
    }

    return { componentRef: elementRef, componentState };
}