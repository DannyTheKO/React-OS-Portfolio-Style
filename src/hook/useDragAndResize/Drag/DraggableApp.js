import {useEffect, useState} from "react";
import {useSaveRect} from "../../useSaveRect/useSaveRect.js";
import {useControl} from "../../useControl/useControl.js";
import {MaximizeFunction} from "../../useControl/appDimension/MaximizeFunction.js";

const SELECTOR_APP_TITLE = `[class$="_Title"]`;
const SELECTOR_APP_ACTION = `[class$="_Action"]`;
const SELECTOR_TASKBAR_CONTAINER = `.Taskbar_Container`;

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
        const componentApp_Title = componentApp.querySelector(SELECTOR_APP_TITLE)

        const componentAppStyles = window.getComputedStyle(componentApp);
        const componentAppStyles_border = parseFloat(componentAppStyles.borderWidth) || 0;

        // ComponentTaskbar Height
        const componentTaskbar = document.querySelector(SELECTOR_TASKBAR_CONTAINER)
        const componentTaskbar_Height = parseFloat(window.getComputedStyle(componentTaskbar).height) || 0

        return {
            componentApp,
            componentApp_Title,
            componentAppStyles_border,
            componentTaskbar_Height,
        }
    }

    useEffect(() => {
        if (!componentRef.current) return;

        // Initialize
        const {
            componentApp,
            componentApp_Title,
            componentAppStyles_border,
            componentTaskbar_Height,
        } = initializeDimension(componentRef);

        let startX, startY, startLeft, startTop;
        let viewportWidth, viewportHeight, maxTop, maxLeft;
        let dragging = false;

        const handleMouseDown = (e) => {
            //Only start dragging from the title bar
            if (
                !e.target.closest(SELECTOR_APP_TITLE) ||
                e.target.closest(SELECTOR_APP_ACTION)
            ) return;

            e.preventDefault();
            e.stopPropagation();

            const targetElement = e.target.closest(SELECTOR_APP_TITLE);
            targetElement.style.cursor = "default";
            dragging = true;
            onClick_Focus()

            // Get initial mouse position
            startX = e.clientX;
            startY = e.clientY;

            // Get user screen width and height
            viewportWidth = window.innerWidth;
            viewportHeight = window.innerHeight;

            let rectComponent_Title = componentApp_Title.getBoundingClientRect();
            let {rectDimension} = RectGetter(componentRef)

            // To set limit of the app position
            if (isMaximize(componentRef)) {
                startLeft = e.clientX - (rectDimension.width / 2);
                startTop = e.clientY - (rectComponent_Title.top + rectComponent_Title.height) / 2;

                maxLeft = viewportWidth - (rectDimension.width + componentAppStyles_border * 2);
            } else {
                startLeft = rectComponent_Title.left;
                startTop = rectComponent_Title.top;

                maxLeft = viewportWidth - (rectComponent_Title.width + componentAppStyles_border * 2);
            }

            maxTop = viewportHeight - (rectComponent_Title.height + componentAppStyles_border + componentTaskbar_Height);

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