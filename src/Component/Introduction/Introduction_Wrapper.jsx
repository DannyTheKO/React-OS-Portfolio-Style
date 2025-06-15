import React from 'react'
import {useState, useEffect} from 'react'
import {Introduction, Introduction_Icon} from './Introduction.jsx'
import {useVisibility} from "../../Hook/useVisibility.js";

export default function Introduction_Wrapper() {
    const { isVisible, isMounted, onClick_Open, onClick_Close } = useVisibility();

    return (
        <>
            <Introduction_Icon onClick_Open={onClick_Open}/>

            {/* If "isMounted" is true, it will render Introduction */}
            {isMounted && <Introduction isVisible={isVisible} onClick_Close={onClick_Close}/>}
        </>
    )
}