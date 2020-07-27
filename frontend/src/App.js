import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Chatbot from './components/chatbot/Chatbot'
import './App.css'
import Signature from './components/Signature/Signature'

const App = () => (
    <div>
        <div>
            <BrowserRouter>
                    <Chatbot />
                    
            </BrowserRouter>
        </div>
        <div style = {{display: 'flex', justifyContent: 'flex-end'}} className = "row signature-row">
        <Signature />
        </div>
    </div>
    )

export default App;