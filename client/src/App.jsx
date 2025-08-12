import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import "./stylesheets/alignments.css";
import "./stylesheets/custom.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/sizes.css";
import "./stylesheets/theme.css";
import ProtectedRoute from './components/ProtectedRoute';
import { GetCurrentUser } from './apicalls/users';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const { loading } = useSelector((state) => state.users);
  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        setUser(response.data);
      } else {
        // If the token is invalid, we clear it and the user state
        localStorage.removeItem('token');
        setUser(null);
      }
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
      console.error("Token validation failed:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      validateToken();
    }
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <div className='loader-parent'>
          <div className="loader"></div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<ProtectedRoute user={user}><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;