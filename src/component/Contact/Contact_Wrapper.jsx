import React, {memo, useRef} from 'react'
import {Contact_App, Contact_Executable} from './Contact_App.jsx'
import {useVisibility} from "../../hook/useVisibility/useVisibility.js";
import {useDragAndResize} from "../../hook/useDragAndResize/useDragAndResize.js";

export default function Contact_Wrapper() {
    const appRef = useRef(null)
    const {visibleClass, isMounted, onClick_Open, onClick_Close, onClick_Minimize} = useVisibility(appRef);
    const {componentState} = useDragAndResize(appRef);

    // const iconRef = useRef(null)
    // useDraggableComponent(iconRef)

    return (
        <>
            <Contact_Executable
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