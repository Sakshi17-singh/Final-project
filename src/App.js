import logo from './logo.svg';
import './App.css';
import Home from'./Pages/Home';
import Event from'./Pages/Event';
import About from'./Pages/About';
import NotFound from'./Pages/NotFound';
import Signup from'./Pages/Signup';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Admin from'./Pages/Admin';
import { Navigate } from 'react-router-dom';
function App() {
  const isAdmin= false;
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/event' element={<Event/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<NotFound/>}/> 
        <Route path='/admin' element={isAdmin?<Admin/>:<Navigate to={"/home"}/>}/>
        <Route path='/signup?' element={<Signup page/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
