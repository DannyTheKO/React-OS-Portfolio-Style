import React from 'react'
import {useEffect, useState} from "react";
import './Taskbar.css'

const DannyOS_SVG = "./Assets/SVG/OS_Icon.svg"

const Taskbar = () => {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const formatDateTime = (dateTime) => {
        let date = dateTime.toLocaleDateString("en-GB");
        let time = dateTime.toLocaleTimeString("en-GB");

        return [date, time];
    }

    const [date, time] = formatDateTime(dateTime);


    return (
        <div id="Taskbar_Setting" className="Taskbar_Container">

            {/* Logo */}
            <div className="Taskbar_Logo_Container">
                <div className="Taskbar_Logo_Display">
                    <img src={DannyOS_SVG} alt="logo"/>
                </div>
                <span>DANNY'S OS</span>
            </div>

            {/*TODO: WAT?*/}
            <div style={{width: `100%`}}>
                Opened app will show here...
            </div>

            {/*Date and Time*/}
            <div className="Taskbar_DateTime_Container">
                <div>{time}</div>
                <div>{date}</div>
            </div>
        </div>
    )
}

export default Taskbar;