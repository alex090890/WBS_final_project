import './App.css'
import "react-tabs/style/react-tabs.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeEN from './components/Home-EN';
import HomeDe from './components/Home-De';
import HomeUA from './components/Home-UA';
import AboutEN from './components/About-EN';
import AboutDe from './components/About-DE';
import AboutUA from './components/About-UA';
import LoginEN from './components/LoginEN';
import RegistrationEn from './components/RegistrationEn';
import UserInfo from "./components/UserInfo"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeEN />} />
        <Route path='/de' element={<HomeDe />} />
        <Route path='/ua' element={<HomeUA />} />
        <Route path='/about' element={<AboutEN />} />
        <Route path='/de/about' element={<AboutDe />} />
        <Route path='/ua/about' element={<AboutUA />} />
        <Route path='/login' element={<LoginEN />} />
        <Route path='/register' element={<RegistrationEn />} />
        <Route path="/user/:id" element={<UserInfo />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  )
}