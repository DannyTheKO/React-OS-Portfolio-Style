import React, {useState, useEffect} from 'react'
import {Introduction_App, Introduction_Icon} from './Introduction_App.jsx'
import {useVisibility} from "../../Hook/useVisibility.js";
import {useDraggableComponent} from "../../Hook/useDraggableComponent.js";
import {useDraggableResize} from "../../Hook/useDraggableResize.js";

export default function Introduction_Wrapper() {
    const {isVisible, isMounted, onClick_Open, onClick_Close} = useVisibility();
    const {componentRef, componentState} = useDraggableResize();

    // useEffect(() => {
    //     console.log("Component State Update:", componentState);
    // }, [componentState.position, componentState.dimensions]);

    return (
        <>
            <Introduction_Icon onClick_Open={onClick_Open}/>

            {/* If "isMounted" is true, it will render Introduction */}
            {isMounted &&
                <Introduction_App
                    ref={componentRef}
                    isVisible={isVisible}
                    onClick_Close={onClick_Close}
                />
            }
        </>
    )
}