
import React from 'react';
import LogReg from "./views/LogReg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import NewMovie from './components/New';

function App() {

    return (
        <div className="App">
            <BrowserRouter>
            <Routes>
                <Route element={<LogReg />} path="/" />
                <Route element={<Dashboard />} path="/movies" />
                <Route element={<NewMovie />} path="/new" />

            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;