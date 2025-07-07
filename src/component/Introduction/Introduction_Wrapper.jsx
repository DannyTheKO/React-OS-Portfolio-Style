import React from 'react'
import {Introduction_App, Introduction_Executable} from './Introduction_App.jsx'
import {useWrapper} from "../../hook/useWrapper/useWrapper.js";

export default function Introduction_Wrapper() {
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
            <Introduction_Executable
                onClick_Open={onClick_Open}
                ref={iconRef}
            />

            {/* If "isMounted" is true, it will render Introduction */}
            {isMounted &&
                <Introduction_App
                    ref={appRef}
                    onClick_Close={onClick_Close}
                    onClick_Minimize={onClick_Minimize}
                    onClick_Maximize={onClick_Maximize}
                />
            }
        </>
    )
}