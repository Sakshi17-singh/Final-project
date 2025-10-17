import './App.css';
import Home from './Pages/Home';
import About from './Pages/About'; 
import NotFound from './Pages/NotFound';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import Navbar from './components/Navbar'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const isAdmin = false;

  return (
    <div className="App">
      <BrowserRouter>
        {/* Navbar will show on all pages */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* If you want separate About page remove below */}
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/home" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
