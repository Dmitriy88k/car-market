import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../src/pages/mainPage/Main'
import UsedCars from '../src/pages/usedCars/UsedCars'
import './App.css'

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<MainPage/>}></Route>
          <Route path="/used-cars" element={<UsedCars/>}/>
        </Routes>
    </Router>
  )
}

export default App;
