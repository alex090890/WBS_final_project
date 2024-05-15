import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";


export default function LoginUa() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    login: "",
    email: "",
    password: "",
    error: null,
  });

  const handleInputChange = (event) => { 
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setState((prevState) => ({...prevState, [name]: value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { login, email, password } = state;

    if (!login) {
      setState((prevState) => ({...prevState, error: "Потрібно увійти" }));
      return;
    }

    const user = {
      login,
      email,
      password,
    };

    try {
      const response = await axios.post("https://wordweb.vercel.app/login", user);
      localStorage.setItem('token', response.data.token);
      alert(`Welcome back, ${user.login}!`);
      setState((prevState) => ({...prevState, error: null }));
      console.log(response);
      navigate(`/dashboard/ua/${login}`);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        setState((prevState) => ({...prevState, error: error.response.data }));
      } else {
        console.log(error);
        setState((prevState) => ({...prevState, error: "Виникла помилка" }));
      }
    }
  };
  
  return (
    <div className="login-container">
      <div>
        <img  className="login-img" src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
      <div className="login-form-container">
        <h1>Увійдіть до свого облікового запису</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Логін:
            <Input
              prefix={<UserOutlined />}
              placeholder="Введіть свій логін"
            type="text"
            name="login"
            value={state.login}
              onChange={handleInputChange}
              className="login-input"
          />
        </label>
        <br />
        <label>
          Пароль:
            <Input.Password
              placeholder="Введіть свій пароль"
              prefix={<RiLockPasswordLine />}
            type="password"
            name="password"
            value={state.password}
              onChange={handleInputChange}
              className="login-input"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </label>
          <br />
          <button className="login-btn1">Увійти</button>
      </form>
        {state.error && <p>{state.error}</p>}
        <p>* Забулі свий пароль або логин? Напішіть мені на адресу <a href="mailto: alexprof_web.de" target="_blank">alex_prof@web.de</a></p>
        <hr />
        <p>Ще не маєте обликового запису?</p>
        <button className="login-btn1" onClick={() => navigate('/ua/register')}>Sign Up</button>
      </div>
      <Button variant="primary" className="home-btn" onClick={() => navigate('/ua')}><FaHome /></Button>
    </div>
  );
}