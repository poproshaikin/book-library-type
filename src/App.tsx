import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {TopBar} from "./Components/TopBar";
import {Home} from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import BookPage from "./Components/BookPage";
import ProfilePage from "./Components/ProfilePage";
import NewBookPage from "./Components/NewBookPage";
import NotFound from "./Components/NotFound";

const serverIp: string = '10.0.0.24';
const serverPort: number = 5238;

function App() {

    const [seed, setSeed] = useState(0);

    function reload() {
        setSeed(seed + 1);
    }

    return (
    <Router>
        <TopBar/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login reloadTopBar={reload}/>} />
            <Route path="/signup" element={<SignUp reloadTopBar={reload}/>} />
            <Route path="/book/:id" element={<BookPage reloadBookPage={reload}/>} />
            <Route path="/profile" element={<ProfilePage/>} />
            <Route path="/newBook" element={<NewBookPage/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    </Router>
    );
}

export {serverIp, serverPort};
export default App;
