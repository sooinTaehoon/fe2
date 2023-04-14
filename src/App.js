import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useEffect, useState} from "react";
import SignUpWrapped from "./components/SignUp";
import Home from "./components/Home";
import LoginWrapped from "./components/Login";
import InfoTestWrapped from "./components/InfoTest";

function App() {
    return (
        <Router>
                <div>
                    <Routes>
                        <Route index element={<Home />} />
                            <Route path="/signup" element={<SignUpWrapped />} />
                            <Route path="/login" element={<LoginWrapped />} />
                            <Route path="/infoTest" element={<InfoTestWrapped />} />
                    </Routes>
                </div>
        </Router>
    );
}

export default App;
