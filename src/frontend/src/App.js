import './App.css';
import React from 'react';
import Client from './pages/client'
import StudentState from "./Context/Student/StudentState";

function App() {
    return (
        <>
            <StudentState>
                <Client/>
            </StudentState>
        </>
    );
}

export default App;