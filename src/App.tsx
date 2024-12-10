import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { User } from './types/User';
import { getUsers } from './controller/userController';
import './app.css';

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const users = getUsers();
    console.log('Registered users:', users);
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="container">
        {!user ? (
          <Routes>
            <Route path="/login" element={<Login onLogin={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        ) : (
          <>
            <nav className="navbar">
              <span>Welcome, {user.fullName}</span>
              <button onClick={handleLogout}>Logout</button>
            </nav>
            <Routes>
              <Route path="/home" element={<Dashboard user={user} onLogout={handleLogout} />} />
              <Route path="/activityhistory" element={<Dashboard user={user} onLogout={handleLogout} />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;