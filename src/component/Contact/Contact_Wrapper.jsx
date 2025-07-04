import React, {memo, useRef} from 'react'
import {Contact_App, Contact_Executable} from './Contact_App.jsx'
import {useVisibility} from "../../hook/useVisibility/useVisibility.js";
import {useDragAndResize} from "../../hook/useDragAndResize/useDragAndResize.js";
import {useDraggableIconComponent} from "../../hook/useDragAndResize/useDraggableIconComponent.js";

export default function Contact_Wrapper() {
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
            <Contact_Executable
                ref={iconRef}
                onClick_Open={onClick_Open}
            />

            {/* If "isMounted" is true, it will render Contact */}
            {isMounted &&
                <Contact_App
                    ref={appRef}
                    visibleClass={visibleClass}
                    onClick_Close={onClick_Close}
                    onClick_Minimize={onClick_Minimize}
                />
            }
        </>
    )
}