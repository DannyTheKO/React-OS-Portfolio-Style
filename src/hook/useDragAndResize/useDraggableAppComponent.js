import {useEffect, useState} from "react";
import {useSaveRect} from "../useSaveRect/useSaveRect.js";
import {useControl} from "../useControl/useControl.js";

export function useDraggableAppComponent(componentRef) {
    const [position, setPosition] = useState({x: 0, y: 0});
    const {onClick_Focus, onClick_Maximize} = useControl(componentRef);
    const {RectSetter, RectGetter} = useSaveRect()

    useEffect(() => {
        if (!componentRef.current) return;

        // Get Component App
        const componentApp = componentRef.current;
        const componentApp_Title = componentApp.querySelector(`[class$="_Title"]`)

        // Component Border
        const componentApp_Styles = window.getComputedStyle(componentApp);
        const componentApp_borderWidth = parseFloat(componentApp_Styles.border) * 2 || 0;

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
            e.stopPropagation();

            const targetElement = e.target.closest('[class$="_Title"]');
            targetElement.style.cursor = "default";
            dragging = true;
            onClick_Focus()

            const rectComponent = componentApp.getBoundingClientRect();
            const rectComponentTitle = componentApp_Title.getBoundingClientRect();

            // Get user screen width and height
            viewportWidth = window.innerWidth;
            viewportHeight = window.innerHeight;

            // Get current componentApp position
            startLeft = rectComponent.left;
            startTop = rectComponent.top;

            // To set limit of the app position
            maxTop = viewportHeight - (rectComponentTitle.height + Taskbar_height + componentApp_borderWidth);
            maxLeft = viewportWidth - (rectComponentTitle.width + componentApp_borderWidth);

            // Get initial mouse position
            startX = e.clientX;
            startY = e.clientY;

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        const handleMouseMove = (e) => {
            if (!dragging) return;

            e.preventDefault();
            e.preventDefault();

            componentApp_Title.style.cursor = "grabbing";

            // Calculate new position
            let newTop = startTop + (e.clientY - startY);
            let newLeft = startLeft + (e.clientX - startX);

            // Calculate the limit of the app
            newTop = Math.max(0, Math.min(newTop, maxTop));
            newLeft = Math.max(0, Math.min(newLeft, maxLeft));

            // Update componentApp position
            componentApp.style.left = `${newLeft}px`;
            componentApp.style.top = `${newTop}px`;
        }

        const handleMouseUp = (e) => {
            dragging = false;

            e.preventDefault()
            e.stopPropagation()
            componentApp_Title.style.cursor = "default";

            // Initialize position
            const {rectDimension} = RectGetter(componentRef);
            setPosition({x: rectDimension.left, y: rectDimension.top});

            // Save the position of the app
            RectSetter(componentRef)

            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        // Attach listeners
        componentApp.addEventListener('mousedown', handleMouseDown);

        // Double click will change app state to maximize by the `title bar`
        componentApp_Title.addEventListener("dblclick", onClick_Maximize)

        return () => {
            componentApp.removeEventListener('mousedown', handleMouseDown);
            componentApp_Title.addEventListener("dblclick", onClick_Maximize);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [componentRef.current]);

    return {position};
}