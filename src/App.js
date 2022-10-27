import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Createorders from "./components/CreateOrder";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Jumporders from "./Jumporders";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/createorders" element={<Createorders />} />
        <Route exact path="/order" element={<Jumporders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
