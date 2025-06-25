import React, {forwardRef, useRef} from "react";

import {FiX} from "react-icons/fi";
import {FaWindowMinimize} from "react-icons/fa6";
import {MdFullscreen} from "react-icons/md";
import "./Contact.css"
import {useDragAndResize} from "../../Hook/useDragAndResize/useDragAndResize.js";

const Contact_Icon_Image = "./Assets/Image/Icons/contact.jpeg"

export const Contact_Executable = forwardRef(({onClick_Open}, iconRef) => {

    return (
        // Contact Icon
        <div
            id="Global_Executable_Setting"
            className="Contact_Icon"
            ref={iconRef}
            onClick={onClick_Open}
        >
            <div className="Contact_ImageIcon">
                <img src={Contact_Icon_Image} alt="ContactIcon"/>
            </div>
            <p>Contact</p>
        </div>
    )
});

export const Contact_App = forwardRef(({visibleClass, onClick_Close, onClick_Minimize}, componentRef) => {

    return (
        // Contact Container
        <div
            id="Global_App_Setting"
            className={`Contact_App ${visibleClass}`}
            ref={componentRef}
        >

            {/* Title */}
            <div className="Contact_Title">
                <div className="Contact_Title_Name">
                    <p>[ About Me ]</p>
                </div>
                <div className="Contact_Title_Action">
                    <FaWindowMinimize className="action_minimize" onClick={onClick_Minimize} alt="Minimize"/>
                    <MdFullscreen className="action_maximize" alt="Fullscreen"/>
                    <FiX className="action_close" onClick={onClick_Close} alt="Close"/>
                </div>
            </div>

            {/* Display */}
            <div className="Contact_Display">

            </div>
        </div>
    )
})
