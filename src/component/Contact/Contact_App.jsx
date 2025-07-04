import React, {forwardRef, useRef} from "react";

import {FiX} from "react-icons/fi";
import {FaWindowMinimize} from "react-icons/fa6";
import {MdFullscreen} from "react-icons/md";
import "./Contact.css"
import {useDragAndResize} from "../../hook/useDragAndResize/useDragAndResize.js";

const APPLICATION_NAME = "Contact Me"

export const Contact_Executable = forwardRef(({onClick_Open}, iconRef) => {
    const Contact_Icon_Image = "./Assets/Image/Icons/contact.jpeg"

    return (
        // Contact Executable
        <div
            id="Global_Executable_Setting"
            className="Contact_Executable"
            ref={iconRef}
            onDoubleClick={onClick_Open}
        >
            <div className="Contact_ImageIcon">
                <img src={Contact_Icon_Image} alt="ContactIcon"/>
            </div>
            <p>{APPLICATION_NAME}</p>
        </div>
    )
});

export const Contact_App = forwardRef(({visibleClass, onClick_Close, onClick_Minimize}, componentRef) => {
    const Contact_Icon_Image = "./Assets/Image/Icons/Toast.png"
    const SVG_EMAIL = "./Assets/SVG/email.svg"

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
                    <p>[ {APPLICATION_NAME} ]</p>
                </div>
                <div className="Contact_Title_Action">
                    <FaWindowMinimize className="action_minimize" onClick={onClick_Minimize} alt="Minimize"/>
                    <MdFullscreen className="action_maximize" alt="Fullscreen"/>
                    <FiX className="action_close" onClick={onClick_Close} alt="Close"/>
                </div>
            </div>

            {/* Display */}
            <div className="Contact_Display">
                <div className="wrapperHeader">
                    <img className="pfp" src={Contact_Icon_Image} alt="Profile Image"/>
                    <h2>Danny's Social Links</h2>
                    <p><i>Here are the places you can find me online!</i></p>
                </div>

                <div className="wrapperIcon">
                    <a href="mailto:someone@mail.com">
                        <img src={SVG_EMAIL} alt="Email Icon"/>
                        <p>thanhan1100@gmail.com</p>
                    </a>
                </div>

                <div className="wrapperLinks">
                    <a className="button" href="https://github.com/DannyTheKO" target="_blank">
                        GitHub
                    </a>
                    <a className="button" href="https://www.linkedin.com/in/danh-ti%E1%BA%BFn-bb2024237/"
                       target="_blank">
                        LinkedIn
                    </a>
                    <a className="button" href="https://stats.fm/DannyTheKO" target="_blank">
                        Stats.fm
                    </a>
                </div>
            </div>
        </div>
    )
})
