import React, {useState, useEffect, useRef} from 'react'
import createResizerDiv from './createResizerDiv.js'

export function useResizableComponent() {
    const [dimensions, setDimensions] = useState({width: 0, height: 0})
    const elementRef = useRef(null)

    useEffect(() => {
        if (!elementRef.current) {
            // console.error("Couldn't find the component");
            return;
        }

        const updateDimensions = () => {
            const rect = elementRef.current.getBoundingClientRect();
            setDimensions({
                width: rect.width,
                height: rect.height,
            });
        }

        const saveDimensions = () => {
            // Save the updated dimensions
            const rect = elementRef.current.getBoundingClientRect();
            sessionStorage.setItem("Introduction_App", JSON.stringify(rect))
        }

        const saveDimensionsDebound = debounce(saveDimensions, 100)

        // Initialize the Dimensions
        updateDimensions();


        // Create an observer to observe the resize change of the app
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.target === elementRef.current) {
                    updateDimensions();
                    createResizerDiv(elementRef)

                    saveDimensionsDebound();

                    // Debug
                    // const rect = elementRef.current.getBoundingClientRect();
                    // console.log("=== RESIZED DETECTION ===");
                    // console.log("Component Name: ");
                    // console.log(`x: ${rect.x}, y: ${rect.y}`);
                    // console.log(`width: ${rect.width}, height: ${rect.height}`)
                }
            }
        });


        // Start Observe
        resizeObserver.observe(elementRef.current);

        // Clean Up
        return () => {
            // When the App close, we check if the ref is still there, if yes than we unobserve
            if (elementRef.current) {
                resizeObserver.unobserve(elementRef.current);
            }

            // Force disconnect observer
            resizeObserver.disconnect();
        }

    }, [elementRef.current]);

    function debounce(callback, msDelay) {
        let timeout
        return (...args) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => callback(...args), msDelay)
        }
    }

    return { elementRef, dimensions };
}