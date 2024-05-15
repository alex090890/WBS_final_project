import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './styles/Dashboard.css';
import AddCardDe from "./AddCardDe";
import CardsListDe from "./CardsListDe";
import RemoveAllCardsDe from "./RemoveAllCardsDe";
import CurrentDate from "./CurrentDate";
import SearchDe from "./SearchDe";
import Footer from "./Footer";
import { Card, Flex, Spin, Input } from 'antd';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value!== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function DashboardDe() {
  const { login } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!login) return;

    axios.get(`https://wordweb.vercel.app/userinfo/${login}`)
     .then((response) => {
        if (response.data) {
          setUser(response.data);
        } else {
          setUser('not found');
        }
      })
     .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 404) {
          setUser('not found');
        } else {
          setUser(null);
          console.error('Unexpected error:', error);
        }
      });
  }, [login]);

  const deleteUser = async () => {
    try {
      const response = await axios.delete(`https://wordweb.vercel.app/delete/${login}`);
      alert(response.data);
      navigate('/de');
    } catch (error) {
      console.log(error);
      alert('Error deleting user');
    }
  };

  const handleUpdate = () => {
    setIsUpdating(true);
  };

  const handleSaveUpdate = (firstname, lastname, password, email) => {
    axios.patch(`https://wordweb.vercel.app/update/${login}`, { login, firstname, lastname, password, email })
     .then(() => {
        setUser({...user, firstname, lastname, password, email });
        setIsUpdating(false);
      })
     .catch((error) => {
        console.log(error);
        setError('Error updating card');
      });
  };

  const handleCancelUpdate = () => {
    setIsUpdating(false);
  };

  if (!user) {
    return (
      <Flex align="center" gap="middle">
    <Spin size="large" />
  </Flex>
    );
  } else if (error) {
    return <p>Benutzer wurde nicht gefunden</p>;
  } else {
    return (
      <div className="dashboard">
        <h1>Willkommen zu WordWeb, {user.login}! </h1>
        <Tabs
      defaultActiveKey="your-cards"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
          <Tab eventKey="your-cards" title="Karten">
            <div className="instructions">
              <Card title="Anweisungen" bordered={false}>
        <p>So nutzen Sie die App: </p>
            <ul>
              <li>Klicken Sie auf die Karte, um die Übersetzung anzuzeigen.</li>
              <li>Klicken Sie auf das Papierkorbsymbol, um die Karte zu löschen.</li>
              <li>Klicken Sie auf das Stiftsymbol, um die Karte zu bearbeiten.</li>
              <li>Sie sehen vier Symbole: 😀, 😐, 😒 und ✅. Nachdem Sie das Wort wiederholt haben, wählen Sie eine der Emotionen aus. Wenn Sie sicher sind, dass Sie das Wort beherrschen, klicken Sie auf ✅.</li>
              </ul>
      </Card>
      <Card title="Neue Karte" bordered={false}>
        <AddCardDe />
      </Card>
              <Card title="Suchen Sie Ihre Karte" bordered={false}>
                            <CurrentDate />
        <SearchDe />
      </Card>
      </div>
            <CardsListDe />
          </Tab>
                    <Tab eventKey="profile" title="Konto">

            <div className="dashboard-container">
            <div className="account">
                
                <Card title="Ihr Konto" className="dashboard-item">
                  <p>Name: {user.firstname} {user.lastname}</p>
            <p>Benutzername: {user.login}</p>
            <p>E-Mail: {user.email}</p>
            <button onClick={() => navigate('/')} className="update-btn">Abmelden</button>
            <button onClick={handleUpdate} className="update-btn">Aktualisieren</button>
            {isUpdating && (
              <form>
                <label>Vorname:</label>
                <Input type="text" defaultValue={user.firstname} />
                <br />
                <label>Nachname:</label>
                <Input type="text" defaultValue={user.lastname} />
                <br />
                <label>E-Mail</label>
                <Input type="text" defaultValue={user.email} />
                <br />
                <button onClick={(e) => {
                  e.preventDefault();
                  const firstname = e.target.form[0].value;
                  handleSaveUpdate(firstname, user.lastname, user.password, user.email);
                }} className="update-btn">Speichern</button>
                <button onClick={handleCancelUpdate} className="update-btn">Cancel</button>
              </form>
                )}
                </Card>
                <Card title="Gefahrenzone" className="dashboard-item">
                  <p>Ihre Karten löschen:</p>
          <RemoveAllCardsDe />
                                <p>Ihr Konto löschen</p>
          <p className="notice">Dieser Vorgang ist unumkehrbar. Alle Kontoinformationen und Lernkarten werden gelöscht.</p>
          <button onClick={deleteUser} className="delete-btn">Konto löschen</button>
                </Card>
              </div>
              <div className="emoji-dashboard">
                <img className="dashboard-img" src="https://res.cloudinary.com/dosvnb1kk/image/upload/v1715636618/Flowers_kr6faw.jpg" />
              </div>
            </div>
      </Tab>
        </Tabs>
        <Footer />
      </div>
    );
  }
}

export default DashboardDe;