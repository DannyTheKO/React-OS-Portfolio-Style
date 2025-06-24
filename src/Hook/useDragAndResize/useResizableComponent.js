import React, {useState, useEffect} from 'react'

export function useResizableComponent(componentRef) {
    const [dimensions, setDimensions] = useState({width: 0, height: 0})

    useEffect(() => {
        if (!componentRef.current) {
            return;
        }

        const saveDimensions = () => {
            // Save the updated dimensions
            const rect = componentRef.current.getBoundingClientRect();
            sessionStorage.setItem("Introduction_App", JSON.stringify(rect))
        }

        const updateDimensions = () => {
            const rect = componentRef.current.getBoundingClientRect();
            setDimensions({
                width: rect.width,
                height: rect.height,
            });
        }

        // Initialize the Dimensions
        updateDimensions();

        // Create an observer to observe the resize change of the app
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.target === componentRef.current) {
                    updateDimensions();
                    createResizerDiv(componentRef)
                    debounce(saveDimensions, 300);

                    // Debug
                    // console.log("Resized Detected");
                }
            }
        });

        // Start Observe
        resizeObserver.observe(componentRef.current);

        // Clean Up
        return () => {
            // When the App close, we check if the ref is still there, if yes than we unobserve
            if (componentRef.current) {
                resizeObserver.unobserve(componentRef.current);
            }

            // Force disconnect observer
            resizeObserver.disconnect();
        }

    }, [componentRef.current]);

    function debounce(callback, msDelay) {
        let timeout
        return (...args) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => callback(...args), msDelay)
        }
    }

    // Resizer Logic
    function createResizerDiv(componentRef) {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const displayDiv = componentRef.current;

        if (!displayDiv) return;

        // Get min-width and min-height of the app
        const computedStyles = window.getComputedStyle(displayDiv);
        const minWidth = parseFloat(computedStyles.minWidth) || 0;
        const minHeight = parseFloat(computedStyles.minHeight) || 0;

        // Get Taskbar Height
        const Taskbar = document.querySelector(`.Taskbar-Container`)
        const TaskbarHeight = parseFloat(window.getComputedStyle(Taskbar).height) || 0

        // Get window.innerWidth and window.innerHeight limit
        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;

        // console.log(displayDiv);
        displayDiv.style.position = 'relative';

        // Clean up any existing resizer
        const existingResizer = displayDiv.querySelectorAll('.resizer');
        existingResizer.forEach(resizer => resizer.remove());

        // Create Div base on directions arrays
        directions.forEach(dir => {
            const resizer = document.createElement("div");
            resizer.classList.add('resizer', `resizer-${dir}`);
            Object.assign(resizer.style, {
                position: 'absolute',
                zIndex: 10,
                cursor: getCursor(dir),
                ...getPositionStyle(dir, componentRef),
            });

            resizer.addEventListener('mousedown', initResize(dir, displayDiv));
            displayDiv.appendChild(resizer);
        });

        // Create Resizer Logic
        function initResize(dir, component) {
            return function (e) {
                e.preventDefault();

                const rectComponent = component.getBoundingClientRect();

                // Initialize, (refresh const if resize already done)
                const startX = e.clientX;
                const startY = e.clientY;

                const startWidth = rectComponent.width;
                const startHeight = rectComponent.height;

                const startLeft = rectComponent.left;
                const startTop = rectComponent.top;

                function onMouseMove(e) {
                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;

                    // new values for limit width and height
                    let newWidth = startWidth;
                    let newHeight = startHeight;
                    let newLeft = startLeft;
                    let newTop = startTop;

                    if (dir.includes('E')) {
                        newWidth = Math.min(
                            // Limit right edge to window width
                            Math.max(minWidth, startWidth + dx),
                            maxWidth - startLeft
                        );
                    }
                    if (dir.includes('S')) {
                        newHeight = Math.min(
                            // Limit bottom edge to window height minus taskbar
                            Math.max(minHeight, startHeight + dy),
                            maxHeight - TaskbarHeight - startTop
                        );
                    }
                    if (dir.includes('W')) {
                        const candidateWidth = startWidth - dx;
                        if (candidateWidth >= minWidth) {
                            newWidth = candidateWidth;
                            newLeft = startLeft + dx;

                            // Make sure left edge doesn't go beyond left screen edge
                            if (newLeft < 0) {
                                newLeft = 0
                                newWidth = startWidth + startLeft
                            }
                        } else {
                            newWidth = minWidth;
                            newLeft = startLeft + (startWidth - minWidth); // lock position
                        }
                    }
                    if (dir.includes('N')) {
                        const candidateHeight = startHeight - dy;
                        if (candidateHeight >= minHeight) {
                            newHeight = candidateHeight;
                            newTop = startTop + dy;

                            // Make sure top edge doesn't go beyond top screen edge
                            if (newTop < 0) {
                                newTop = 0;
                                newHeight = startHeight + startTop;
                            }
                        } else {
                            newHeight = minHeight;
                            newTop = startTop + (startHeight - minHeight); // lock position
                        }
                    }

                    component.style.width = `${newWidth}px`;
                    component.style.height = `${newHeight}px`;
                    component.style.left = `${newLeft}px`;
                    component.style.top = `${newTop}px`;
                }

                // In case user get drag stuck
                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            };
        }

        // Get cursor style base on user position
        function getCursor(dir) {
            switch (dir) {
                case 'N':
                    return 'n-resize';
                case 'NE':
                    return 'ne-resize';
                case 'E':
                    return 'e-resize';
                case 'SE':
                    return 'se-resize';
                case 'S':
                    return 's-resize';
                case 'SW':
                    return 'sw-resize';
                case 'W':
                    return 'w-resize';
                case 'NW':
                    return 'nw-resize';
            }
        }

        // Initialize resizer div style placement
        function getPositionStyle(dir, componentRef) {
            const rectComponent = componentRef.current.getBoundingClientRect();
            const style = {
                transform: 'translate(-50%, -50%)',  // Center the resizer
                // background: 'red', // DEBUG
            };

            switch (dir) {
                case 'N':
                    style.left = `calc(${rectComponent.width / 2}px - 2px)`;
                    style.top = `-5px`;
                    style.width = `100%`;
                    style.height = `10px`
                    break;
                case 'NE':
                    style.left = `calc(${rectComponent.width}px - 3px)`;
                    style.top = `-5px`;
                    style.width = `12px`
                    style.height = `12px`
                    break;
                case 'E':
                    style.left = `calc(${rectComponent.width}px - 3px)`;
                    style.top = `calc(${rectComponent.height / 2}px  - 3px)`;
                    style.height = `100%`;
                    style.width = `10px`;
                    break;
                case 'SE':
                    style.left = `calc(${rectComponent.width}px - 3px)`;
                    style.top = `calc(${rectComponent.height}px - 6px)`;
                    style.width = `12px`
                    style.height = `12px`
                    break;
                case 'S':
                    style.left = `${rectComponent.width / 2}px`;
                    style.top = `calc(${rectComponent.height}px - 6px)`;
                    style.width = `100%`;
                    style.height = `10px`
                    break;
                case 'SW':
                    style.left = `0px`;
                    style.top = `calc(${rectComponent.height}px - 6px)`;
                    style.width = `12px`
                    style.height = `12px`
                    break;
                case 'W':
                    style.left = `0px`;
                    style.top = `calc(${rectComponent.height / 2}px - 6px)`;
                    style.height = `100%`;
                    style.width = `10px`;
                    break;
                case 'NW':
                    style.left = `0px`;
                    style.top = `-6px`;
                    style.width = `12px`
                    style.height = `12px`
                    break;
            }

            return style;
        }

    }

    return {dimensions};
}