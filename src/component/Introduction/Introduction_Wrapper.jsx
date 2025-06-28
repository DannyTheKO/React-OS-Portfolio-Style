import React, {memo, useRef} from 'react'
import {Introduction_App, Introduction_Executable} from './Introduction_App.jsx'
import {useVisibility} from "../../hook/useVisibility/useVisibility.js";
import {useDragAndResize} from "../../hook/useDragAndResize/useDragAndResize.js";
import {useFocus} from "../../hook/useFocus/useFocus.js";

export default function Introduction_Wrapper() {
    const appRef = useRef(null)
    const {visibleClass, isMounted, onClick_Open, onClick_Close, onClick_Minimize} = useVisibility(appRef);
    const {componentState} = useDragAndResize(appRef);

    // const iconRef = useRef(null)
    // useDraggableComponent(iconRef)

    return (
        <>
            <Introduction_Executable
                onClick_Open={onClick_Open}
            />

            {/* If "isMounted" is true, it will render Introduction */}
            {isMounted &&
                <Introduction_App
                    ref={appRef}
                    visibleClass={visibleClass}
                    onClick_Close={onClick_Close}
                    onClick_Minimize={onClick_Minimize}
                />
            }
        </>
    )
}