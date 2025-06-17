import React, {forwardRef} from "react";
import {useState, useEffect} from 'react'

import {FiXSquare} from "react-icons/fi";
import "./Introduction.css"

export const Introduction_Icon = ({onClick_Open}) => {
    const Introduction_Icon_Image = "../src/Assets/Image/Icons/Introduction_Icon.jpg"

    return (
        // Introduction Icon
        <div id="Global_Icon_Setting" onClick={onClick_Open}>
            <div className="Introduction_ImageIcon">
                <img src={Introduction_Icon_Image} alt="introductionIcon"/>
            </div>
            <p>About Me</p>
        </div>
    )
}

export const Introduction_App = forwardRef(({
                                                isVisible,
                                                onClick_Close
                                            }, ref) => {
    const ProfilePicture = "../src/Assets/Image/Icons/Hewwo.png"
    const [visibleClass, setVisibleClass] = useState("")
    // console.log(typeof componentRef)

    useEffect(() => {
        if (isVisible) {
            // Delay needed to trigger CSS transition
            setTimeout(() => setVisibleClass("SHOW"), 10);
        } else {
            setVisibleClass("HIDE");
        }
    }, [isVisible]);

    return (
        // Introduction Container
        <div
            id="Global_App_Setting"
            className={`Introduction_App ${visibleClass}`}
            ref={ref}
        >

            {/* Title */}
            <div className="Introduction_Title">
                <div className="Introduction_Title_Name">
                    <p>[ About Me ]</p>
                </div>
                <div className="Introduction_Title_Action">
                    <FiXSquare onClick={onClick_Close} alt="Close"/>
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
                    <p>After many attempt making my own landing page, but failed to do so because is either
                        unmotivated,
                        burnout halfway or feel like a mess doing project and got me to abandoned my past project,
                        although i'm still determined to sit down and create another.</p>
                    <p>Starting this project is a tough one for me, I find that is hard to start a new page with a
                        blank
                        project is really exhausting, the reason that I keep going is that the journey of learning
                        along
                        the way and I had learning a lot over few weeks.</p>
                    <p>Hope you like what i'm showing! and if you are then head over to my project repo and give it
                        a
                        star! so it motivate me to keep going ^^.</p>
                    <p><i><strong>P/S:</strong> The repo of this project is public so if anyone want to learn, feel
                        free
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