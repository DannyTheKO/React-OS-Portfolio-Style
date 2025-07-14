import {useEffect, useState} from "react";
import {useSaveRect} from "../../useSaveRect/useSaveRect.js";
import {useControl} from "../../useControl/useControl.js";
import {MaximizeFunction} from "../../useControl/appDimension/MaximizeFunction.js";

const CONTROL_DIMENSION_DATA = "app-control-dimension";
const CONTROL_DIMENSION_ANIMATION = "STATE_TRANSITION";
const CONTROL_DIMENSION_ORIGINAL = "ORIGINAL";

export function draggableApp(componentRef) {
    const [position, setPosition] = useState({x: 0, y: 0});

    const {onClick_Focus, onClick_Maximize} = useControl(componentRef);
    const {RectSetter, RectGetter} = useSaveRect()
    const {isMaximize} = MaximizeFunction();

    const initializeDimension = (componentRef) => {
        // Get Component App
        const componentApp = componentRef.current;
        const componentApp_Title = componentApp.querySelector(`[class$="_Title"]`)
        const componentAppStyles = window.getComputedStyle(componentApp);
        const componentAppStyles_borderWidth = parseFloat(componentAppStyles.border) * 2 || 0;

        // ComponentTaskbar Height
        const componentTaskbar = document.querySelector(`.Taskbar_Container`)
        const componentTaskbar_Height = parseFloat(window.getComputedStyle(componentTaskbar).height) || 0

        return {
            componentApp,
            componentApp_Title,
            componentAppStyles_borderWidth,
            componentTaskbar_Height,
        }
    }

    useEffect(() => {
        if (!componentRef.current) return;

        // Initialize
        const {
            componentApp,
            componentApp_Title,
            componentAppStyles_borderWidth,
            componentTaskbar_Height,
        } = initializeDimension(componentRef);

        let startX, startY, startLeft, startTop;
        let viewportWidth, viewportHeight, maxTop, maxLeft;
        let dragging = false;

        const handleMouseDown = (e) => {
            //Only start dragging from the title bar
            if (
                !e.target.closest('[class$="_Title"]') ||
                e.target.closest('[class$="_Action"]')
            ) return;

            e.preventDefault();
            e.stopPropagation();

            const targetElement = e.target.closest('[class$="_Title"]');
            targetElement.style.cursor = "default";
            dragging = true;
            onClick_Focus()

            // Get initial mouse position
            startX = e.clientX;
            startY = e.clientY;

            // Get user screen width and height
            viewportWidth = window.innerWidth;
            viewportHeight = window.innerHeight;

            // To set limit of the app position
            if (isMaximize(componentRef)) {
                let rectComponent_Title = componentApp_Title.getBoundingClientRect();
                let {rectDimension} = RectGetter(componentRef)

                startLeft = e.clientX - (rectDimension.width / 2);
                startTop = e.clientY - (rectComponent_Title.top + rectComponent_Title.height) / 2;

                maxTop = viewportHeight - (rectDimension.height + componentAppStyles_borderWidth + componentTaskbar_Height);
                maxLeft = viewportWidth - (rectDimension.width + componentAppStyles_borderWidth);
            } else {
                let rectComponent = componentApp.getBoundingClientRect();

                startLeft = rectComponent.left;
                startTop = rectComponent.top;

                maxTop = viewportHeight - (rectComponent.height + componentAppStyles_borderWidth + componentTaskbar_Height);
                maxLeft = viewportWidth - (rectComponent.width + componentAppStyles_borderWidth);
            }

            // console.group("Mouse Down Action Log")
            // console.log(`Is Maximize?: ${isMaximize(componentRef)}`);
            // console.log(`startLeft: ${startLeft}, startTop: ${startTop}`);
            // console.log(`maxLeft: ${maxLeft}, maxTop: ${maxTop}`);
            // console.groupEnd()

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        const handleMouseMove = (e) => {
            if (!dragging) return;

            e.preventDefault();
            componentApp_Title.style.cursor = "grabbing";

            // Calculate new position
            let newLeft = startLeft + (e.clientX - startX);
            let newTop = startTop + (e.clientY - startY);

            // Update componentApp position
            newLeft = Math.max(0, Math.min(newLeft, maxLeft));
            newTop = Math.max(0, Math.min(newTop, maxTop));

            if (isMaximize(componentRef)) {
                componentApp.classList.remove(CONTROL_DIMENSION_ANIMATION);
                const {rectDimension} = RectGetter(componentRef);

                componentApp.setAttribute(CONTROL_DIMENSION_DATA, CONTROL_DIMENSION_ORIGINAL);

                componentApp.style.left = `${newLeft}px`;
                componentApp.style.top = `${newTop}px`;
                componentApp.style.width = `${rectDimension.width}px`
                componentApp.style.height = `${rectDimension.height}px`
            } else {
                componentApp.style.left = `${newLeft}px`;
                componentApp.style.top = `${newTop}px`;
            }

            // console.group("Mouse Move Action Log")
            // console.log(`Is Maximize?: ${isMaximize(componentRef)}`);
            // console.log(`newLeft: ${newLeft}, newTop: ${newTop}`);
            // console.groupEnd()
        }

        const handleMouseUp = (e) => {
            dragging = false;

            e.preventDefault()
            e.stopPropagation()
            componentApp_Title.style.cursor = "default";

            // Save the position of the app
            RectSetter(componentRef)

            // For debug
            const {rectDimension} = RectGetter(componentRef);
            setPosition({x: rectDimension.left, y: rectDimension.top});

            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        // Attach listeners
        componentApp.addEventListener('mousedown', handleMouseDown);

        // Double click will change app state to maximize by the `title bar`
        componentApp_Title.addEventListener("dblclick", onClick_Maximize)

        return () => {
            componentApp.removeEventListener('mousedown', handleMouseDown);
            componentApp_Title.removeEventListener("dblclick", onClick_Maximize);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [componentRef.current]);

    return {position};
}