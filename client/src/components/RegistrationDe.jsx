import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, MailOutlined } from '@ant-design/icons';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";

const RegistrationDe = () => {
  
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

      navigate(`/dashboard/de/${newUser.login}`);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        setState((prevState) => ({ ...prevState, error: error.response.data }));
      } else {
        console.log(error);
        setState((prevState) => ({ ...prevState, error: 'Eine Anmeldung ist erforderlich' }));
      }
    }
  };

  return (
    <div className="login-container">
      <div>
        <img  className="login-img" src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
      <div className="reg-form-container">
        <h1>Neues Konto erstellen</h1>
      <form onSubmit={handleSubmit} className='regform'>
        <label>
          Vorname
          <Input
              type="text"
              className='login-input'
            name="firstname"
            value={state.firstname}
            onChange={handleInputChange}
              placeholder="John"
              prefix={<UserOutlined />}
          />
          </label>
          <br />
        <label>
          Nachname:
          <Input
              type="text"
              className='login-input'
            name="lastname"
            value={state.lastname}
              onChange={handleInputChange}
              placeholder='Black'
              prefix={<UserOutlined />}
          />
          </label>
          <br />
        <label>
          Benutzername:
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
          Passwort:
            <Input.Password
              className='login-input'
            type="password"
            name="password"
            value={state.password}
              onChange={handleInputChange}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              placeholder='Erstellen Sie ein sicheres Passwort'
              prefix={<RiLockPasswordLine />}
          />
          </label>
          <br />
        <label>
          E-Mail:
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
          <button className="login-btn1" type="submit">Registrieren</button>
        <p className='or'>or</p>
        <button className="login-btn1 tologinnav" onClick={() => navigate('/de/login')}>Anmelden</button>
        {state.error && <p>{state.error}</p>}
        </form>
        <Button variant="primary" className="home-btn" onClick={() => navigate('/de')}><FaHome /></Button>
    </div>
    </div>
  );
};

export default RegistrationDe;
