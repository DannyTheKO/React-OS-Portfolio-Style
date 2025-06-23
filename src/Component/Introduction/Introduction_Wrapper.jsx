import React, {useRef} from 'react'
import {Introduction_App, Introduction_Executable} from './Introduction_App.jsx'
import {useVisibility} from "../../Hook/useVisibility/useVisibility.js";
import {useDragAndResize} from "../../Hook/useDragAndResize/useDragAndResize.js";
import {useDraggableComponent} from "../../Hook/useDragAndResize/useDraggableComponent.js";

export default function Introduction_Wrapper() {
    const appRef = useRef(null)
    const {isVisible, isMounted, onClick_Open, onClick_Close, onClick_Minimize} = useVisibility(appRef);
    useDragAndResize(appRef);

    const iconRef = useRef(null)
    useDraggableComponent(iconRef)

    return (
        <>
            <Introduction_Executable
                ref={iconRef}
                onClick_Open={onClick_Open}
            />

            {/* If "isMounted" is true, it will render Introduction */}
            {isMounted &&
                <Introduction_App
                    ref={appRef}
                    isVisible={isVisible}
                    onClick_Close={onClick_Close}
                    onClick_Minimize={onClick_Minimize}
                />
            }
        </>
    )
}