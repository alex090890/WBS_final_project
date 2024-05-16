import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Input } from 'antd';

const { TextArea } = Input;

const initialState = {
  frontside: "",
  backside: "",
  error: null,
  success: null
};

const updateState = (prevState, updates) => ({ ...prevState, ...updates });

export default function AddCardDe() {
  const { login } = useParams();
  const [state, setState] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState(updateState(state, { [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { frontside, backside } = state;

    if (!frontside || !backside) {
      setState(updateState(state, { error: "Bitte füllen Sie beide Seiten der Karte aus" }));
      return;
    }

    const card = { front: frontside, back: backside, login };

    try {
      const response = await axios.post("https://wordweb.vercel.app/newcard", card);
      setState(updateState(state, { error: null, success: "Die Karte wurde erfolgreich hinzugefügt!", frontside: "", backside: "" }));
      console.log(response);
      setTimeout(() => {
        setState(updateState(state, { success: null }));
      }, 1000);
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setState(updateState(state, { error: error.response.data }));
      } else {
        console.log(error);
        setState(updateState(state, { error: "Ein unbekannter Fehler ist aufgetreten" }));
      }
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Vorderseite:
            <TextArea
              rows={4}
              type="text"
              name="frontside"
              value={state.frontside}
              onChange={handleInputChange}
              className="input-card"
              placeholder="go"
            />
          </label>
          <br />
          <label>
            Rückseite:
            <TextArea
              rows={4}
              type="text"
              name="backside"
              value={state.backside}
              onChange={handleInputChange}
              className="input-card"
              placeholder="去"
            />
          </label>
          <br />
          <button type="submit" className="save-cards">Speichern</button>
        </form>
      </div>
      {state.error && <p>{state.error}</p>}
      {state.success && <p style={{ color: 'green' }}>{state.success}</p>}
    </div>
  );
}