import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";


export default function LoginEN() {
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
      setState((prevState) => ({...prevState, error: "Login is required" }));
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
      alert(`Welcome back, ${user.login}!`); // handle the response
      setState((prevState) => ({...prevState, error: null }));
      console.log(response);
      // Navigate to the user page after successful login
      navigate(`/dashboard/${login}`);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        setState((prevState) => ({...prevState, error: error.response.data }));
      } else {
        console.log(error);
        setState((prevState) => ({...prevState, error: "An unknown error occurred" }));
      }
    }
  };
  
  return (
    <div className="login-container">
      <div>
        <img  className="login-img" src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
      <div className="login-form-container">
        <h1>Login to your account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Login:
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your username"
            type="text"
            name="login"
            value={state.login}
              onChange={handleInputChange}
              className="login-input"
          />
        </label>
        <br />
        <label>
          Password:
            <Input.Password
              placeholder="Enter your password"
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
          <button className="login-btn1">Login</button>
      </form>
        {state.error && <p>{state.error}</p>}
        <p>* Forgot your password? Send an email to <a href="mailto: alexprof_web.de" target="_blank">alex_prof@web.de</a></p>
        <hr />
        <p>Don&#39;t have an account?</p>
        <button className="login-btn1" onClick={() => navigate('/register')}>Sign Up</button>
      </div>
      <Button variant="primary" className="home-btn" onClick={() => navigate('/')}><FaHome /></Button>
    </div>
  );
}