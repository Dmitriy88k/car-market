import { React } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import MainPage from '../src/pages/mainPage/Main';
import UsedCars from '../src/pages/usedCars/view/UsedCars';
import Login from './pages/login/Login';
import Signup from './pages/signup/signup';
import SellCar from './pages/sellCar/SellCar';
import Header from '../src/components/header/Header'
import './App.css';
import "./firebase";

const App = () => {
  const location = useLocation();

  const hideHeaderPaths = ["/login", "/signup"];


  return (
    <div>
        {!hideHeaderPaths.includes(location.pathname) && <Header/>}

        <Routes>

          <Route exact path="/" element={<MainPage/>}/>
          <Route path="/used-cars" element={<UsedCars/>}/>
          <Route path="/sell-car" element={<SellCar/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>

      </div>
  )
}

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
)

export default WrappedApp;
