import React from 'react'
import {Contact_App, Contact_Executable} from './Contact_App.jsx'
import {useWrapper} from "../../hook/useWrapper/useWrapper.js";

export default function Contact_Wrapper() {
    const {
        appRef,
        iconRef,
        isMounted,
        onClick_Open,
        onClick_Close,
        onClick_Minimize,
        onClick_Maximize,
    } = useWrapper();

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
                    onClick_Close={onClick_Close}
                    onClick_Minimize={onClick_Minimize}
                    onClick_Maximize={onClick_Maximize}
                />
            }
        </>
    )
}