import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import RecruiterHome from "./pages/RecruiterHome.tsx";
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recruiter" element={<RecruiterHome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
