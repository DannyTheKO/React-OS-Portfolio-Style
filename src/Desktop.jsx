import React from 'react'
import './Desktop.css'
import Taskbar from './application/Taskbar/Taskbar.jsx';
import Introduction_Wrapper from "./application/Introduction/Introduction_Wrapper.jsx";
import Contact_Wrapper from "./application/Contact/Contact_Wrapper.jsx";
import Note_Wrapper from "./application/Note/Note_Wrapper.jsx";
import initializeDB from "./db/initializeDB.js";


export default function Desktop() {

    initializeDB();

    // new Promise((resolve, reject) => {
    //
    // })

    return (
        <div id="Desktop_Container">
            <Taskbar/>

            <Introduction_Wrapper />
            <Contact_Wrapper />
            <Note_Wrapper/>
        </div>
    )
}