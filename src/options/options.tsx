import React from 'react';
import '../assets/tailwind.css'
import { createRoot } from 'react-dom/client'

const test = (
    <h1 className="">
        Hello Option!
    </h1>
)

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(test)
