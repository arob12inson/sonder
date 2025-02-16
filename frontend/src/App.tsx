import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import RecruiterHome from "./pages/RecruiterHome.tsx";
import JobHome from "./pages/JobHome.tsx";
import CreateJob from "./pages/CreateJob.tsx";
import CoffeeChat from "./pages/CoffeeChat/CoffeeChat.tsx";
import EndInterviewPage from "./pages/CoffeeChat/EndInterviewPage";
import AudioCaptureTest from "./pages/CoffeeChat/AudioCaptureTest.tsx";

import './App.css';
import AnalyzeAudio from "./pages/CoffeeChat/AnalyzeAudio.tsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recruiter" element={<RecruiterHome />} />
        <Route path="/recruiter/:jobId" element={<JobHome />} />
        <Route path="/recruiter/job/new" element={<CreateJob />} />
        <Route path="/chat/*" element={<CoffeeChat />} />
        <Route path="/chat/end" element={<EndInterviewPage />} />
        <Route path="/audio-test" element={<AudioCaptureTest />} />
        <Route path="/analyze" element={<AnalyzeAudio />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
