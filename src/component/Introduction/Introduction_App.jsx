import React, {forwardRef} from "react";

import {FiX} from "react-icons/fi";
import {FaWindowMinimize} from "react-icons/fa6";
import {MdFullscreen} from "react-icons/md";
import "./Introduction.css"

const ProfilePicture = "./Assets/Image/Icons/Hewwo.png"
const Introduction_Icon_Image = "./Assets/Image/Icons/Introduction_Icon.jpg"

const APPLICATION_NAME = "Introduction"

export const Introduction_Executable = forwardRef(({onClick_Open}, iconRef) => {

    return (
        // Introduction Icon
        <div
            id="Global_Executable_Setting"
            className="Introduction_Icon"
            ref={iconRef}
            onClick={onClick_Open}
        >
            <div className="Introduction_ImageIcon">
                <img src={Introduction_Icon_Image} alt="introductionIcon"/>
            </div>
            <p>{APPLICATION_NAME}</p>
        </div>
    )
});

export const Introduction_App = forwardRef(({visibleClass, onClick_Close, onClick_Minimize}, componentRef) => {

    return (
        // Introduction Container
        <div
            id="Global_App_Setting"
            className={`Introduction_App ${visibleClass}`}
            ref={componentRef}
        >

            {/* Title */}
            <div className="Introduction_Title">
                <div className="Introduction_Title_Name">
                    <p>[ {APPLICATION_NAME} ]</p>
                </div>
                <div className="Introduction_Title_Action">
                    <FaWindowMinimize className="action_minimize" onClick={onClick_Minimize} alt="Minimize"/>
                    <MdFullscreen className="action_maximize" alt="Fullscreen"/>
                    <FiX className="action_close" onClick={onClick_Close} alt="Close"/>
                </div>
            </div>

            {/* Display */}
            <div className="Introduction_Display">
                <div className="container_pfp">
                    <img className="profile_picture" src={ProfilePicture} alt="Danny's Profile Image"/>
                    <h2>DANNY</h2>
                </div>
                <hr/>

                <div className="container_paragraph">
                    <p>Hi, my name is Danny.</p>
                    <p>I'm a software engineer, currently studied in Saigon University.</p>
                    <p>Starting this project is a tough one for me, I find that is hard to start a new page with a blank
                        project is really exhausting, the reason that I keep going is that the journey of learning
                        along the way and I had learning a lot over few weeks.</p>
                    <p>After many attempt making my own landing page, but failed to do so because is either
                        unmotivated, burnout halfway or feel like a mess doing project and got me to abandoned my past
                        project,
                        although i'm still determined to sit down and create another.</p>
                    <p>Hope you like what i'm showing! and if you are then head over to my project repo and give it
                        a star! so it motivate me to keep going ^^.</p>
                    <p><i><strong>P/S:</strong> The repo of this project is public so if anyone want to learn, feel free
                        to check it out!</i></p>
                </div>

                <div className="container_links">
                    <a href="https://github.com/DannyTheKO/React-OS-Portfolio-Style"
                       target="_blank">React-OS-Portfolio-Style</a>
                </div>
            </div>
        </div>
    )
})