import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Components/Login';


function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* <Route path='/' element={<HomeMain />} />
          <Route path='/signup' element={<Signup />} /> */}
          <Route path='/' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
