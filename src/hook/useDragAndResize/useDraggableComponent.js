import {useEffect, useState} from "react";

export function useDraggableComponent(componentRef) {
    const [position, setPosition] = useState({x: 0, y: 0});

    useEffect(() => {
        if (!componentRef.current) {
            // console.log("Component not found")
            return;
        }

        // Get Component App
        const componentApp = componentRef.current;
        const componentApp_Title = componentApp.querySelector(`[class$="_Title"]`)

        // Component Border
        const componentApp_Styles = window.getComputedStyle(componentApp);
        const componentApp_borderWidth = Math.ceil(parseFloat(componentApp_Styles.border) + 1) || 0;

        // Taskbar Height
        const Taskbar = document.querySelector(`.Taskbar_Container`)
        const Taskbar_height = parseFloat(window.getComputedStyle(Taskbar).height) || 0

        // Initialize
        let startX, startY, startLeft, startTop;
        let viewportWidth, viewportHeight, maxTop, maxLeft;
        let dragging = false;


        const handleMouseDown = (e) => {
            //Only start dragging from the title bar
            if (!e.target.closest('[class$="_Title"]')) return;

            e.preventDefault();
            dragging = true;
            e.target.style.cursor = "grabbing";

            const rectComponent = componentApp.getBoundingClientRect();
            const rectComponentTitle = componentApp_Title.getBoundingClientRect();

            // Get user screen width and height
            viewportWidth = window.innerWidth;
            viewportHeight = window.innerHeight;

            // To set limit of the app position
            maxTop = viewportHeight - (rectComponentTitle.height + Taskbar_height + componentApp_borderWidth);
            maxLeft = viewportWidth - (rectComponentTitle.width + componentApp_borderWidth);

            // Get initial position
            startX = e.clientX;
            startY = e.clientY;

            // Get current componentApp position
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

            // Update componentApp position
            componentApp.style.left = `${newLeft}px`;
            componentApp.style.top = `${newTop}px`;

            // Update state
            setPosition({x: newLeft, y: newTop});
        }

        const handleMouseUp = (e) => {
            dragging = false;
            e.target.style.cursor = "grab";

            // Save the position of the app
            const rect = componentApp.getBoundingClientRect();
            sessionStorage.setItem("Introduction_App", JSON.stringify(rect))

            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        // Initialize position
        const rect = componentApp.getBoundingClientRect();
        setPosition({x: rect.left, y: rect.top});

        // Attach listeners
        componentApp.addEventListener('mousedown', handleMouseDown);

        return () => {
            componentApp.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [componentRef.current]);

    return {position};
}