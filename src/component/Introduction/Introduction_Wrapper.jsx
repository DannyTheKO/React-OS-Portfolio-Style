import React, {memo, useRef} from 'react'
import {Introduction_App, Introduction_Executable} from './Introduction_App.jsx'
import {useVisibility} from "../../hook/useVisibility/useVisibility.js";
import {useDragAndResize} from "../../hook/useDragAndResize/useDragAndResize.js";
import {useDraggableAppComponent} from "../../hook/useDragAndResize/useDraggableAppComponent.js";
import {useDraggableIconComponent} from "../../hook/useDragAndResize/useDraggableIconComponent.js";

export default function Introduction_Wrapper() {
    const appRef = useRef(null)
    const iconRef = useRef(null)
    const {
        visibleClass,
        isMounted,
        onClick_Open,
        onClick_Close,
        onClick_Minimize
    } = useVisibility(appRef);
    const {componentState: appState} = useDragAndResize(appRef);
    useDraggableIconComponent(iconRef)


    return (
        <>
            <Introduction_Executable
                onClick_Open={onClick_Open}
                ref={iconRef}
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