import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Upload from '../pages/Upload';
import Results from '../pages/Results';

function Main() {

  const [code, setcode] = useState("");
  const [load, setload] = useState(false);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload load={load} setcode={setcode} setload={setload} />} />
        <Route path="/results" element={<Results code={code} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
