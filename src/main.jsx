import React from 'react'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import Desktop from "./Desktop.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Desktop/>
    </StrictMode>,
)
