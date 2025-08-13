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
import { useSelector } from 'react-redux';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {
  // Correctly get the loading state from the loaders slice
  const { globalLoader } = useSelector((state) => state.loaders);

  return (
    <div>
      {globalLoader && (
        <div className='loader-parent'>
          <div className="loader"></div>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          {/* ProtectedRoute will now handle its own data fetching */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;