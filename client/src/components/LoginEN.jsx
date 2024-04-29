import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      alert('Logged in successfully'); // handle the response
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
    <div>
      <h1>Login to your account</h1>
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