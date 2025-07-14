import React from 'react'
import {Note_App, Note_Executable} from './Note_App.jsx'
import {useWrapper} from "../../hook/useWrapper/useWrapper.js";

export default function Note_Wrapper() {
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
            <Note_Executable
                onClick_Open={onClick_Open}
                ref={iconRef}
            />

            {/* If "isMounted" is true, it will render Note */}
            {isMounted &&
                <Note_App
                    ref={appRef}
                    onClick_Close={onClick_Close}
                    onClick_Minimize={onClick_Minimize}
                    onClick_Maximize={onClick_Maximize}
                />
            }
        </>
    )
}