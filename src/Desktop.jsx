import React from 'react'
import './Desktop.css'
import Taskbar from './component/Taskbar/Taskbar.jsx';
import Introduction_Wrapper from "./component/Introduction/Introduction_Wrapper.jsx";
import Contact_Wrapper from "./component/Contact/Contact_Wrapper.jsx";
import Note_Wrapper from "./component/Note/Note_Wrapper.jsx";

export default function Desktop() {

    // new Promise((resolve, reject) => {
    //
    // })

    return (
        <div className="Desktop-Container">
            <Taskbar/>

            <Introduction_Wrapper />
            <Contact_Wrapper />
            <Note_Wrapper/>
        </div>
    )
}