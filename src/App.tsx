import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {TopBar} from "./Components/TopBar";
import {Home} from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import BookPage from "./Components/BookPage";
import ProfilePage from "./Components/ProfilePage";
import NewBookPage from "./Components/NewBookPage";

const serverIp: string = '10.0.0.24';
const serverPort: number = 5238;

function App() {

  return (
      <div>
          <Router>
              <TopBar/>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/signup" element={<SignUp/>} />
                  <Route path="/book/:id" element={<BookPage/>} />
                  <Route path="/profile" element={<ProfilePage/>} />
                  <Route path="/newBook" element={<NewBookPage/>} />
              </Routes>
        </Router>
      </div>
  );
}

export {serverIp, serverPort};
export default App;
