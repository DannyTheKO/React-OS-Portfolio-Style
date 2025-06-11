import React from 'react'
import './Desktop.css'
import {Taskbar} from './Component/Taskbar/Taskbar.jsx';
import {Introduction} from "./Component/Introduction/Introduction.jsx";

const Desktop = () => {


    return (
        <div className="Desktop-Container">
            {/*Load this first*/}
            <Taskbar/>
            <Introduction/>
        </div>
    )
}

export default Desktop;