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
        <div id="Taskbar-Setting" className="Taskbar-Container">

            {/* Logo */}
            <div className="Taskbar-Logo-Container">
                <div className="Taskbar-Logo-Display">
                    <img src={DannyOS_SVG} alt="logo"/>
                </div>
                <span>DANNY'S OS</span>
            </div>

            <div>
                Something will show here...
            </div>

            {/*Date and Time*/}
            <div className="Taskbar-DateTime-Container">
                <div>{time}</div>
                <div>{date}</div>
            </div>
        </div>
    )
}

export default Taskbar;