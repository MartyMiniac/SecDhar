import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import App from './App';
// import Test from './pages/qrScanner'
// import Qrcode from './pages/qrGenerator'
// import Logs from './pages/logs'
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
        {/* <Test/> */}
        {/* <Qrcode/> */}
        {/* <Logs/> */}
    </React.StrictMode>
);

serviceWorkerRegistration.register();
