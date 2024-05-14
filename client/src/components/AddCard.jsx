import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Input } from 'antd';

export default function AddCard() {
  const { login } = useParams();
  const [state, setState] = useState({
    frontside: "",
    backside: "",
    error: null,
    success: null
  });

  const handleInputChange = (event) => { 
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setState((prevState) => ({...prevState, [name]: value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { frontside, backside } = state;

    if (!frontside &&!backside) {
      setState((prevState) => ({...prevState, error: "Please fill in both sides of the card" }));
      return;
    }

    const card = {
        front: frontside,
        back: backside,
        login
    };

    try {
      const response = await axios.post("https://wordweb.vercel.app/newcard", card);
      setState((prevState) => ({...prevState, error: null, success: "The card was added succesfully!", frontside: "", backside: "" }));
      console.log(response);
      setTimeout(() => {
        setState((prevState) => ({...prevState, success: null }));
      }, 1000);
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
      <div>
        <form onSubmit={handleSubmit}>
        <label>
          Front Side:
          <Input
            type="text"
            name="frontside"
            value={state.frontside}
              onChange={handleInputChange}
              className="input-card"
          />
          </label>
          <br />
              <label>
          Back Side:
          <Input
            type="text"
            name="backside"
            value={state.backside}
              onChange={handleInputChange}
              className="input-card"
          />
              </label>
              <br />
          <button type="submit" className="save-cards">💾</button>
          
      </form>
      </div>
          {state.error && <p>{state.error}</p>}
          {state.success && <p style={{ color: 'green' }}>{state.success}</p>}
    </div>
  );
}