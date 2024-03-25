import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUpPage from './components/pages/sign-up-page/signUpPage';
import LoginPage from './components/pages/login-page/loginPage';
import Home from './components/pages/home/Home';
import { ToastContainer } from 'react-toastify';
import AddMovie from './components/pages/AddMoviePage/AddMovie';
import Users from './components/pages/users/Users';
import CreateAdmin from './components/pages/createAdmin/CreateAdmin';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/add-movie' element={<AddMovie/>} />
        <Route path='/all-users' element={<Users/>} />
        <Route path='/create-admin' element={<CreateAdmin/>} />
      </Routes>
    </>
  );
}

export default App;
