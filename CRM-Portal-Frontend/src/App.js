import React, { useState } from 'react';
import './Global.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard } from './component/Dashboard';
import { Contact } from './component/Contact';
import { Bugs } from './component/Bugs';
import { CheckInOut } from './component/CheckInOut';
import { Holidays } from './component/Holidays';
import { Feedback } from './component/Feedback';
import { Performance } from './component/Performance';
import { Mainlayout } from './Mainlayout';
import Login from './Login';
import { ProtectedRoute } from './Login';
import { NewUser } from './component/NewUser';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Mainlayout><Dashboard /></Mainlayout></ProtectedRoute>} />
          <Route path="/bugs" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Mainlayout><Bugs /></Mainlayout></ProtectedRoute>} />
          <Route path="/performance" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Mainlayout><Performance /></Mainlayout></ProtectedRoute>} />
          <Route path="/check-in-out" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Mainlayout><CheckInOut /></Mainlayout></ProtectedRoute>} />
          <Route path="/holidays" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Mainlayout><Holidays /></Mainlayout></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Mainlayout><Feedback /></Mainlayout></ProtectedRoute>} />
          <Route path="/contact-us" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Mainlayout><Contact /></Mainlayout></ProtectedRoute>} />
          <Route path="/new-user" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Mainlayout><NewUser /></Mainlayout></ProtectedRoute>} />
          <Route path="*" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Mainlayout><Dashboard /></Mainlayout></ProtectedRoute>} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
