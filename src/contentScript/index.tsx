import React from "react";
import { createRoot } from 'react-dom/client';
import '../assets/tailwind.css';
import ContentScript from './contentScript';
import * as ReactDOM from 'react-dom';

setTimeout(() => {
    const appContainer = document.createElement("div");
    document.body.appendChild(appContainer);
    const root = createRoot(appContainer);
    root.render(<ContentScript />);
}, 2500)

