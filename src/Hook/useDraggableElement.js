import React from "react";
import {useEffect, useState, useCallback} from "react";

export function useDraggableElement(initial = false) {
    const [isDraggable, setIsDraggable] = useState(initial);

    const hookDraggable = useCallback(() => {
        setIsDraggable(true);
    })
}