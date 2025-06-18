import React, {useState, useEffect} from "react";

export default function useDragAndResize(elementRef) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const displayDiv = elementRef.current;
    if (!displayDiv) return;

    displayDiv.style.position = 'relative';

    // Clean up any existing resizer
    const existingResizer = displayDiv.querySelectorAll('.resizer');
    existingResizer.forEach(resizer => resizer.remove());

    directions.forEach(dir => {
        const resizer = document.createElement("div");
        resizer.classList.add('resizer', `resizer-${dir}`);
        Object.assign(resizer.style, {
            position: 'absolute',
            width: '10px',
            height: '10px',
            zIndex: 10, // TODO: THIS HAS TO CHANGE
            cursor: getCursor(dir),
            ...getPositionStyle(dir, elementRef),
        });

        resizer.addEventListener('mousedown', initResize(dir, displayDiv));
        displayDiv.appendChild(resizer);
    });

    function initResize(dir, element) {
        return function (e) {
            e.preventDefault();

            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = element.offsetWidth;
            const startHeight = element.offsetHeight;
            const startTop = element.offsetTop;
            const startLeft = element.offsetLeft;

            function onMouseMove(e) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                if (dir.includes('E')) {
                    element.style.width = `${startWidth + dx}px`;
                }
                if (dir.includes('S')) {
                    element.style.height = `${startHeight + dy}px`;
                }
                if (dir.includes('W')) {
                    element.style.width = `${startWidth - dx}px`;
                    element.style.left = `${startLeft + dx}px`;
                }
                if (dir.includes('N')) {
                    element.style.height = `${startHeight - dy}px`;
                    element.style.top = `${startTop + dy}px`;
                }
            }

            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
    }

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

    function getPositionStyle(dir, elementRef) {
        const rect = elementRef.current.getBoundingClientRect();
        const style = {
            position: 'absolute',
            transform: 'translate(-50%, -50%)'  // Center the resizer
        };

        switch (dir) {
            case 'N':
                style.left = `calc(${rect.width / 2}px - 2px)`;
                style.top = `-5px`;
                style.width = `100%`;
                style.height = `5px`
                break;
            case 'NE':
                style.left = `calc(${rect.width}px - 3px)`;
                style.top = `-5px`;
                style.width = `12px`
                style.height = `12px`
                break;
            case 'E':
                style.left = `calc(${rect.width}px - 3px)`;
                style.top = `calc(${rect.height / 2}px  - 3px)`;
                style.height = `100%`;
                style.width = `5px`;
                break;
            case 'SE':
                style.left = `calc(${rect.width}px - 3px)`;
                style.top = `calc(${rect.height}px - 6px)`;
                style.width = `12px`
                style.height = `12px`
                break;
            case 'S':
                style.left = `${rect.width / 2}px`;
                style.top = `calc(${rect.height}px - 6px)`;
                style.width = `100%`;
                style.height = `5px`
                break;
            case 'SW':
                style.left = `0px`;
                style.top = `calc(${rect.height}px - 6px)`;
                style.width = `12px`
                style.height = `12px`
                break;
            case 'W':
                style.left = `0px`;
                style.top = `calc(${rect.height / 2}px - 6px)`;
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