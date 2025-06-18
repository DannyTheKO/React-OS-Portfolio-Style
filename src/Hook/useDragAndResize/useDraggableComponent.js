import React, {useEffect, useRef, useState} from "react";

export function useDraggableComponent(componentRef) {
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isDraggable, setIsDraggable] = useState(false);

    useEffect(() => {
        if (!componentRef.current) {
            // console.log("Component not found")
            return;
        }

        // Initialize
        const component = componentRef.current;
        let startX, startY, startLeft, startTop;
        let dragging = false;

        const handleMouseDown = (e) => {
            //Only start dragging from the title bar
            if (!e.target.closest('[class$="_Title"]')) return;

            e.preventDefault();
            dragging = true;
            setIsDraggable(true);
            e.target.style.cursor = "grabbing";

            // TODO: Get user screen width and height, to limit the app position

            // Get initial position
            startX = e.clientX;
            startY = e.clientY;

            // Get current component position
            const rect = component.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        const handleMouseMove = (e) => {
            if (!dragging) return;

            // Calculate new position
            const newLeft = startLeft + (e.clientX - startX);
            const newTop = startTop + (e.clientY - startY);

            // Update component position
            component.style.left = `${newLeft}px`;
            component.style.top = `${newTop}px`;

            // Update state
            setPosition({x: newLeft, y: newTop});

            // Debug
            // const rect = component.getBoundingClientRect();
            // console.log("=== DRAGGABLE DETECTION ===");
            // console.log("Component Name: ");
            // console.log(`x: ${rect.x}, y: ${rect.y}`);
            // console.log(`width: ${rect.width}, height: ${rect.height}`)
        }

        const handleMouseUp = (e) => {
            dragging = false;
            setIsDraggable(false);
            e.target.style.cursor = "grab";

            // Save the position of the app
            const rect = component.getBoundingClientRect();
            sessionStorage.setItem("Introduction_App", JSON.stringify(rect))

            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        // Initialize position
        const rect = component.getBoundingClientRect();
        setPosition({ x: rect.left, y: rect.top });

        // Attach listeners
        component.addEventListener('mousedown', handleMouseDown);

        return () => {
            component.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [componentRef.current]);

    return { position, isDraggable };
}