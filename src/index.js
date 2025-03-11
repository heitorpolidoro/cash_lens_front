import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {GoogleOAuthProvider} from "@react-oauth/google"
import { clientId } from './config';

ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={clientId}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </GoogleOAuthProvider>
)

