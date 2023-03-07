import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import Signup from './Components/Signup';
import Home from './Components/Home';


function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/register' element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
