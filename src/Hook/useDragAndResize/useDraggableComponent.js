import React, {useEffect, useState} from "react";

export function useDraggableComponent(componentRef) {
    const [position, setPosition] = useState({x: 0, y: 0});

    useEffect(() => {
        if (!componentRef.current) {
            // console.log("Component not found")
            return;
        }

        // Get Component App
        const component = componentRef.current;
        const componentTitle = component.querySelector(`[class$="_Title"]`)
        const computedStyles = window.getComputedStyle(component);

        // Initialize
        const borderWidth = Math.ceil(parseFloat(computedStyles.border) + 1) || 0;
        let startX, startY, startLeft, startTop;
        let viewportWidth, viewportHeight, maxTop, maxLeft;
        let dragging = false;

        const handleMouseDown = (e) => {
            //Only start dragging from the title bar
            if (!e.target.closest('[class$="_Title"]')) return;

            e.preventDefault();
            dragging = true;
            e.target.style.cursor = "grabbing";

            const rectComponent = component.getBoundingClientRect();
            const rectComponentTitle = componentTitle.getBoundingClientRect();

            // Get user screen width and height
            viewportWidth = window.innerWidth;
            viewportHeight = window.innerHeight;
            console.log(window.innerWidth)

            // To set limit of the app position
            maxTop = viewportHeight - (rectComponentTitle.height + borderWidth);
            maxLeft = viewportWidth - (rectComponentTitle.width + borderWidth);

            // Get initial position
            startX = e.clientX;
            startY = e.clientY;

            // Get current component position
            startLeft = rectComponent.left;
            startTop = rectComponent.top;

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        const handleMouseMove = (e) => {
            if (!dragging) return;

            // Calculate new position
            let newTop = startTop + (e.clientY - startY);
            let newLeft = startLeft + (e.clientX - startX);

            // Calculate the limit of the app
            newTop = Math.max(0, Math.min(newTop, maxTop));
            newLeft = Math.max(0, Math.min(newLeft, maxLeft));

            // Update component position
            component.style.left = `${newLeft}px`;
            component.style.top = `${newTop}px`;

            // Update state
            setPosition({x: newLeft, y: newTop});
        }

        const handleMouseUp = (e) => {
            dragging = false;
            e.target.style.cursor = "grab";

            // Save the position of the app
            const rect = component.getBoundingClientRect();
            sessionStorage.setItem("Introduction_App", JSON.stringify(rect))

            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        // Initialize position
        const rect = component.getBoundingClientRect();
        setPosition({x: rect.left, y: rect.top});

        // Attach listeners
        component.addEventListener('mousedown', handleMouseDown);

        return () => {
            component.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [componentRef.current]);

    return {position};
}