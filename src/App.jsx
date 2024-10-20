import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import MainPage from '../src/pages/mainPage/main';
import UsedCars from '../src/pages/usedCars/view/usedCars';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import SellCar from './pages/sellCar/sellCar';
import CarDetails from './pages/carDetails/carDetails'
import Header from '../src/components/header/header'
import ProfileSettings from './pages/profileSettings/profileSettings'
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
          <Route path="/car-details/:id" element={<CarDetails/>}/>
          <Route path="/profile-settings" element={<ProfileSettings/>}/>
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
