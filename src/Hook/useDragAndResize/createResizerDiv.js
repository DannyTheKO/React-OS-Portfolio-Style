
export default function createResizerDiv(componentRef) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const displayDiv = componentRef.current;

    if (!displayDiv) return;

    // Get min-width and min-height of the app
    const computedStyles = window.getComputedStyle(displayDiv);
    const minWidth = parseFloat(computedStyles.minWidth) || 0;
    const minHeight = parseFloat(computedStyles.minHeight) || 0;

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
            zIndex: 10, // TODO: THIS HAS TO CHANGE, maybe not ?
            cursor: getCursor(dir),
            ...getPositionStyle(dir, componentRef),
        });

        resizer.addEventListener('mousedown', initResize(dir, displayDiv));
        displayDiv.appendChild(resizer);
    });

    // Resize Logic
    function initResize(dir, component) {
        return function (e) {
            e.preventDefault();

            const rectComponent = component.getBoundingClientRect();

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
                    newWidth = Math.max(minWidth, startWidth + dx);
                }
                if (dir.includes('S')) {
                    newHeight = Math.max(minHeight, startHeight + dy);
                }
                if (dir.includes('W')) {
                    const candidateWidth = startWidth - dx;
                    if (candidateWidth >= minWidth) {
                        newWidth = candidateWidth;
                        newLeft = startLeft + dx;
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
            case 'N': return 'n-resize';
            case 'NE': return 'ne-resize';
            case 'E': return 'e-resize';
            case 'SE': return 'se-resize';
            case 'S': return 's-resize';
            case 'SW': return 'sw-resize';
            case 'W': return 'w-resize';
            case 'NW': return 'nw-resize';
        }
    }

    // Initialize resizer div style placement
    function getPositionStyle(dir, componentRef) {
        const rectComponent = componentRef.current.getBoundingClientRect();
        const style = {
            position: 'absolute',
            transform: 'translate(-50%, -50%)',  // Center the resizer
            // background: 'red', // DEBUG
        };

        switch (dir) {
            case 'N':
                style.left = `calc(${rectComponent.width / 2}px - 2px)`;
                style.top = `-5px`;
                style.width = `100%`;
                style.height = `5px`
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
                style.width = `5px`;
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
                style.height = `5px`
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
                style.width = `5px`;
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