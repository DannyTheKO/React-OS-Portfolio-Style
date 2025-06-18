import React from 'react'
import './Desktop.css'
import Taskbar from './Component/Taskbar/Taskbar.jsx';
import Introduction_Wrapper from "./Component/Introduction/Introduction_Wrapper.jsx";

const Desktop = () => {
    // TODO: Make Z-Index simulate app focus

    // TODO: Make "OS Bootup Simulation" (using Async/Await)

    // TODO: Note App (with create, delete and update function)
    // TODO: Weather App (use API)
    // TODO: Project Timeline
    // TODO: Project List

    return (
        <div className="Desktop-Container">
            <Taskbar/>

            <Introduction_Wrapper />
        </div>
    )
}

export default Desktop;