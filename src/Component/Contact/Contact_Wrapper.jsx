import React, {memo, useRef} from 'react'
import {Contact_App, Contact_Executable} from './Contact_App.jsx'
import {useVisibility} from "../../Hook/useVisibility/useVisibility.js";
import {useDragAndResize} from "../../Hook/useDragAndResize/useDragAndResize.js";
import {useFocus} from "../../Hook/useFocus/useFocus.js";

const MemorizedExecutable = memo(({onClick_Open}) => {

    return (
        <Contact_Executable
            onClick_Open={onClick_Open}
        />
    )
})


export default function Contact_Wrapper() {
    const appRef = useRef(null)
    const {visibleClass, isMounted, onClick_Open, onClick_Close, onClick_Minimize} = useVisibility(appRef);
    const {componentState} = useDragAndResize(appRef);
    const {onClick_Focus} = useFocus(appRef)

    // const iconRef = useRef(null)
    // useDraggableComponent(iconRef)

    return (
        <>
            <MemorizedExecutable onClick_Open={onClick_Open}/>

            {/* If "isMounted" is true, it will render Contact */}
            {isMounted &&
                <Contact_App
                    ref={appRef}
                    visibleClass={visibleClass}
                    onClick_Focus={onClick_Focus}
                    onClick_Close={onClick_Close}
                    onClick_Minimize={onClick_Minimize}
                />
            }
        </>
    )
}