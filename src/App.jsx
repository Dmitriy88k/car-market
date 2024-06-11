import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../src/pages/mainPage/Main';
import UsedCars from '../src/pages/usedCars/view/UsedCars';
import Login from './pages/login/Login';
import './App.css';
import "./firebase";


const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<MainPage/>}></Route>
          <Route path="/used-cars" element={<UsedCars/>}/>
          <Route path="/login" element={<Login/>}/>

          
        </Routes>
    </Router>
  )
}

export default App;
