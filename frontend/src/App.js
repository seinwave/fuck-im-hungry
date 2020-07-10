import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Chatbot from './components/chatbot/Chatbot'

const App = () => (
        <div>
            <BrowserRouter>
                <div className = "container">
                    <Chatbot />
                </div>
            </BrowserRouter>
        </div>
        
    )

export default App;