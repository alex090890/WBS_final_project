import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, MailOutlined } from '@ant-design/icons';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";

const RegistrationUa = () => {
  
  const navigate = useNavigate();
  const [state, setState] = useState({
    firstname: '',
    lastname: '',
    login: '',
    password: '',
    passwordHint: '',
    email: '',
    error: null,
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { firstname, lastname, login, password, passwordHint, email } = state;

    const newUser = {
      firstname,
      lastname,
      login,
      password,
      passwordhint: passwordHint,
      email,
    };

    try {
      const response = await axios.post('https://wordweb.vercel.app/newuser', newUser);
      localStorage.setItem('token', response.data.token);
      alert(response.data);
      setState((prevState) => ({ ...prevState, error: null }));

      navigate(`/dashboard/ua/${newUser.login}`);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        setState((prevState) => ({ ...prevState, error: error.response.data }));
      } else {
        console.log(error);
        setState((prevState) => ({ ...prevState, error: 'An unknown error occurred' }));
      }
    }
  };

  return (
    <div className="login-container">
      <div>
        <img  className="login-img" src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
      <div className="reg-form-container">
        <h1>Створити новий обліковий запис</h1>
      <form onSubmit={handleSubmit} className='regform'>
        <label>
          Ім&#39;я:
          <Input
              type="text"
              className='login-input'
            name="firstname"
            value={state.firstname}
            onChange={handleInputChange}
              placeholder="Юлій"
              prefix={<UserOutlined />}
          />
          </label>
          <br />
        <label>
          Прізвище:
          <Input
              type="text"
              className='login-input'
            name="lastname"
            value={state.lastname}
              onChange={handleInputChange}
              placeholder='Цезар'
              prefix={<UserOutlined />}
          />
          </label>
          <br />
        <label>
          Им&#39;я обликовошл запису:
            <Input
              className='login-input'
            type="text"
            name="login"
            value={state.login}
              onChange={handleInputChange}
              placeholder='JohnBlack'
              prefix={<UserOutlined />}
          />
          </label>
          <br />
        <label>
          Пароль:
            <Input.Password
              className='login-input'
            type="password"
            name="password"
            value={state.password}
              onChange={handleInputChange}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              placeholder='Створіть надійний пароль'
              prefix={<RiLockPasswordLine />}
          />
          </label>
          <br />
        <label>
          Електрона пошта:
            <Input
              className='login-input'
            type="email"
            name="email"
            value={state.email}
              onChange={handleInputChange}
              placeholder='john@black.com'
              prefix={<MailOutlined />}
          />
          </label>
          <br />
          <button className="login-btn1" type="submit">Зареєструватися</button>
        <p className='or'>або</p>
        <button className="login-btn1 tologinnav" onClick={() => navigate('/ua/login')}>Увійти</button>
        {state.error && <p>{state.error}</p>}
        </form>
        <Button variant="primary" className="home-btn" onClick={() => navigate('/ua')}><FaHome /></Button>
    </div>
    </div>
  );
};

export default RegistrationUa;
