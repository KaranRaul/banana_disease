import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BananaDiseaseDetection from './pages/BananaDiseaseDetection';
import LandingPage from './pages/landing';
import TensorFlowModel from './pages/TensorFlowModel';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<TensorFlowModel />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/detect" element={<BananaDiseaseDetection />} />
      </Routes>
    </Router>
  );
};

export default App;
