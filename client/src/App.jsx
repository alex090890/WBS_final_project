import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import HomeEN from './components/Home-EN';
import HomeDe from './components/Home-De';
import HomeUA from './components/Home-UA';
import AboutEN from './components/About-EN';
import AboutDe from './components/About-DE';
import AboutUA from './components/About-UA';
import LoginEN from './components/LoginEN';
import LoginDe from './components/LoginDe';
import LoginUa from './components/LoginUa';
import RegistrationEn from './components/RegistrationEn';
import RegistrationDe from './components/RegistrationDe';
import RegistrationUa from './components/RegistrationUa';
import Dashboard from "./components/Dashboard";
import DashboardUa from './components/DashboardUa';
import DashboardDe from './components/DashboardDe';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import "react-tabs/style/react-tabs.css";

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" />;
};


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
        <Route path='/de/login' element={<LoginDe />} />
        <Route path='/ua/login' element={<LoginUa />} />
        <Route path='/register' element={<RegistrationEn />} />
        <Route path='/de/register' element={<RegistrationDe />} />
        <Route path='/ua/register' element={<RegistrationUa />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/:login" element={<Dashboard />} />
          <Route path="/dashboard/ua/:login" element={<DashboardUa />} />
          <Route path="/dashboard/de/:login" element={<DashboardDe />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  )
}