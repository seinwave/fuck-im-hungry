import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Chatbot from './components/chatbot/Chatbot'
import './App.css'

const App = () => (
        <div>
            <BrowserRouter>
                    <Chatbot />
            </BrowserRouter>
        </div>
        
    )

export default App;