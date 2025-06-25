import React from 'react'
import './Desktop.css'
import Taskbar from './Component/Taskbar/Taskbar.jsx';
import Introduction_Wrapper from "./Component/Introduction/Introduction_Wrapper.jsx";
import Contact_Wrapper from "./Component/Contact/Contact_Wrapper.jsx";

const Desktop = () => {

    // new Promise((resolve, reject) => {
    //
    // })

    return (
        <div className="Desktop-Container">
            <Taskbar/>

            <Introduction_Wrapper />
            <Contact_Wrapper />
        </div>
    )
}

export default Desktop;