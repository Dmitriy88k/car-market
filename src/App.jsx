import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../src/pages/mainPage/Main'
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
