import {useEffect} from "react";

export function useDraggableIconComponent(componentRef) {

    useEffect(() => {
        if (!componentRef.current) return;

        const componentIcon = componentRef.current;

        // Taskbar Height
        const Taskbar = document.querySelector(`.Taskbar_Container`)
        const Taskbar_height = parseFloat(window.getComputedStyle(Taskbar).height) || 0

        // Initialize
        let startX, startY, startLeft, startTop;
        let viewportWidth, viewportHeight, maxTop, maxLeft;
        let dragging = false;

        const handleMouseDown = (e) => {
            if (!e.target.parentElement.closest(`[class$="_Executable"]`)) return;

            e.preventDefault();
            dragging = true;
            e.target.style.cursor = "default";
            const rectComponentIcon = componentIcon.getBoundingClientRect();

            // Get user screen width and height
            viewportWidth = window.innerWidth;
            viewportHeight = window.innerHeight;

            // Get current componentApp position
            startLeft = rectComponentIcon.left;
            startTop = rectComponentIcon.top;

            // To set limit of the app position
            maxTop = viewportHeight - (rectComponentIcon.height + Taskbar_height);
            maxLeft = viewportWidth - (rectComponentIcon.width);

            // Get initial mouse position
            startX = e.clientX;
            startY = e.clientY;

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
            componentIcon.style.left = `${newLeft}px`;
            componentIcon.style.top = `${newTop}px`;
        }

        const handleMouseUp = (e) => {
            dragging = false;
            e.target.style.cursor = "default";

            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Attach listeners
        componentIcon.addEventListener('mousedown', handleMouseDown);

        return () => {
            componentIcon.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [componentRef.current]);

}