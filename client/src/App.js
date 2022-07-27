
import React from 'react';
import LogReg from "./views/LogReg";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
            <Routes>
                <Route element={<LogReg />} path="/" />

            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;