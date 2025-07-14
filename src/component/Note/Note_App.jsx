import React, {forwardRef} from "react";

import {FiX} from "react-icons/fi";
import {FaWindowMinimize} from "react-icons/fa6";
import {MdFullscreen} from "react-icons/md";
import "./Note.css"

const APPLICATION_NAME = "Note"

export const Note_Executable = forwardRef(({onClick_Open}, iconRef) => {
    const Note_Icon_Image = "./Assets/Image/Icons/hewwo.png"

    return (
        // Note Executable
        <div
            id="Global_Executable_Setting"
            className="Note_Executable"
            ref={iconRef}
            onDoubleClick={onClick_Open}
        >
            <div className="Note_ImageIcon">
                <img src={Note_Icon_Image} alt="Note Icon"/>
            </div>
            <p>{APPLICATION_NAME}</p>
        </div>
    )
})

export const Note_App = forwardRef(
    ({onClick_Close, onClick_Minimize, onClick_Maximize}, appRef) => {

        return (
            <div
                id="Global_App_Setting"
                className={`Note_App`}
                ref={appRef}
            >
                {/* Title */}
                <div className="Note_Title">
                    <div className="Note_Title_Name">
                        <p>[ {APPLICATION_NAME} ]</p>
                    </div>
                    <div className="Note_Title_Action">
                        <FaWindowMinimize className="action_minimize" onClick={onClick_Minimize} alt="Minimize"/>
                        <MdFullscreen className="action_maximize" onClick={onClick_Maximize} alt="Fullscreen"/>
                        <FiX className="action_close" onClick={onClick_Close} alt="Close"/>
                    </div>
                </div>

                {/* Display */}
                <div className="Introduction_Display">

                </div>
            </div>
        )
    })