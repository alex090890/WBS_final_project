import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginEN() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    login: "",
    emaol: "",
    password: "",
    error: null,
  });

  const handleInputChange = (event) => { 
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { login, email, password } = state;

    const user = {
      login,
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:3400/login", user);
      alert(response.data); // handle the response data
      setState((prevState) => ({ ...prevState, error: null }));

      // Navigate to the user page after successful login
      navigate(`/dashboard/${user.login}`);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        setState((prevState) => ({ ...prevState, error: error.response.data }));
      } else {
        console.log(error);
        setState((prevState) => ({ ...prevState, error: "An unknown error occurred" }));
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          Email:
          <input
            type="text"
            name="email"
            value={state.email}
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
        <button type="submit">Login</button>
      </form>
      {state.error && <p>{state.error}</p>}
    </div>
  );
}