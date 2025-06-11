import React from 'react'
import {useEffect, useState} from "react";
import DannyOS_SVG from "../../Assets/SVG/OS_Icon.svg"
import './Taskbar.css'

export function Taskbar () {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        })

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

            {/* TODO: Application Open Dynamic */}
            <div>

            </div>

            {/*Date and Time*/}
            <div className="Taskbar-DateTime-Container">
                <div>{time}</div>
                <div>{date}</div>
            </div>
        </div>
    )
}