import React from 'react'
import {useState, useEffect} from 'react'

import CloseBtn from "../../Assets/SVG/close-btn.svg"
import ProfilePicture from "../../Assets/Image/Icons/Hewwo.png"

import IntroductionIcon from '../../Assets/Image/Icons/Introduction_Icon.jpg'

import "./Introduction.css"

export function Introduction() {
    const [loading, setLoading] = useState(true)

    const openWindow = () => {
        const introductionContainer = document.querySelector(".Introduction_Container")
        introductionContainer.style.display = "flex"
    }

    const closeWindow = () => {
        const introductionContainer = document.querySelector(".Introduction_Container")
        introductionContainer.style.display = "none"
    }

    return (
        <>
            {/*Introduction Icon*/}
            <div className="Introduction_Icon" onClick={openWindow}>
                <div className="IconImage">
                    <img src={IntroductionIcon} alt="introductionIcon"/>
                </div>
                <p>About Me</p>
            </div>

            {/*Introduction Container*/}
            <div id="Introduction_Setting" className="Introduction_Container">

                {/* Title */}
                <div className="Introduction_Title">
                    <div className="Introduction_Title_Name">
                        [ About Me ]
                    </div>
                    <div className="Introduction_Title_Action">
                        <img className="Introduction_Btn_Close" src={CloseBtn} onClick={closeWindow} alt="Close"/>
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
                        <p>After many attempt making my own landing page, but failed to do so because is either unmotivated,
                            burnout halfway or feel like a mess doing project and got me to abandoned my past project,
                            although i'm still determined to sit down and create another.</p>
                        <p>Starting this project is a tough one for me, I find that is hard to start a new page with a blank
                            project is really exhausting, the reason that I keep going is that the journey of learning along
                            the way and I had learning a lot over few weeks.</p>
                        <p>Hope you like what i'm showing! and if you are then head over to my project repo and give it a
                            star! so it motivate me to keep going ^^.</p>
                        <p><i><strong>P/S:</strong> The repo of this project is public so if anyone want to learn, feel free
                            to check it out!</i></p>
                    </div>

                    <div className="container_links">
                        <a href="https://github.com/DannyTheKO/WebOS_Portfolio" target="_blank">WebOS_Portfolio</a>
                    </div>
                </div>
            </div>
        </>
    )
}