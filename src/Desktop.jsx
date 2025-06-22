import React from 'react'
import './Desktop.css'
import Taskbar from './Component/Taskbar/Taskbar.jsx';
import Introduction_Wrapper from "./Component/Introduction/Introduction_Wrapper.jsx";

const Desktop = () => {

    return (
        <div className="Desktop-Container">
            <Taskbar/>

            <Introduction_Wrapper />
        </div>
    )
}

export default Desktop;