import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationEn = () => {
  
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
      alert(response.data); // handle the response data
      setState((prevState) => ({ ...prevState, error: null }));

      // Navigate to the user page after successful registration
      navigate(`/dashboard/${newUser.login}`);

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={state.firstname}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={state.lastname}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Login:
          <input
            type="text"
            name="login"
            value={state.login}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password Hint:
          <input
            type="text"
            name="passwordHint"
            value={state.passwordHint}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Register</button>
        {state.error && <p>{state.error}</p>}
      </form>
    </div>
  );
};

export default RegistrationEn;
