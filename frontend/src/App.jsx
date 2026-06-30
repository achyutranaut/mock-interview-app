import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Interview from './pages/Interview'
import Feedback from './pages/Feedback'
import PrivateRoute from './components/PrivateRoute'
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/interview' element={<Interview />} />
          <Route path='/feedback' element={<Feedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;


