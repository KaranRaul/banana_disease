import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BananaDiseaseDetection from './pages/BananaDiseaseDetection';
import LandingPage from './pages/landing';
import TensorFlowModel from './pages/TensorFlowModel';
import CropGrading from './pages/CropGrading';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/crop" element={<CropGrading />} />
        <Route path="/detect" element={<BananaDiseaseDetection />} />
      </Routes>
    </Router>
  );
};

export default App;
