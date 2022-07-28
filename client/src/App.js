
import React from 'react';
import LogReg from "./views/LogReg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from './components/Profile';
import ProfileTwo from './components/ProfileTwo';
import Display from './components/Display';
import NewMovie from './components/New';
import Edit from './components/Edit';
import View from './components/View';


function App() {

    return (
        <div className="App">
            <BrowserRouter>
            <Routes>
                <Route element={<LogReg />} path="/" />
                <Route element={<Profile />} path="/user/profile/:firstName" />
                <Route element={<ProfileTwo />} path="/user/profiletwo/:firstName" />
                <Route element={<Display />} path="/movies" />
                <Route element={<NewMovie />} path="/new/movies" />
                <Route element={<Edit />} path="/edit/movies/:id" />
                <Route element={<View />} path="/movies/:id" />
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;