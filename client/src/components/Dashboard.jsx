import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AddCard from "./AddCard";
import CardsList from "./CardsList";
import RemoveAllCards from "./RemoveAllCards";
import CurrentDate from "./CurrentDate";
import './styles/Dashboard.css';

function TabPanel(props) {
  const { children, value, index,...other } = props;

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

function Dashboard() {
  const { login } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [value, setValue] = useState(0);
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
      navigate('/');
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
    return <p>Loading...</p>;
  } else if (error) {
    return <p>User is not found</p>;
  } else {
    return (
      <div className="dashboard">
            <h1>Welcome to WordWeb, {user.login}! </h1>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100vh' }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Dashboard" />
          <Tab label="Danger Zone" />
          <Tab label="New Card" />
          <Tab label="Your cards" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div className="dashboard-container">
            <div>

              <CurrentDate />
              <p>Name: {user.firstname} {user.lastname}</p>
            <p>Login: {user.login}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => navigate('/')} className="update-btn">Logout</button>
            <button onClick={handleUpdate} className="update-btn">Update</button>
            {isUpdating && (
              <form>
                <label>First Name:</label>
                <input type="text" defaultValue={user.firstname} />
                <br />
                <label>Last Name</label>
                <input type="text" defaultValue={user.lastname} />
                <br />
                <label>Email</label>
                <input type="text" defaultValue={user.email} />
                <br />
                <button onClick={(e) => {
                  e.preventDefault();
                  const firstname = e.target.form[0].value;
                  handleSaveUpdate(firstname, user.lastname, user.password, user.email);
                }} className="update-btn">Save</button>
                <button onClick={handleCancelUpdate} className="update-btn">Cancel</button>
              </form>
            )}
              </div>
              <div className="emoji-dashboard">👨‍🦱</div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h2>Delete your account</h2>
          <p>This process is unreversable. </p>
          <button onClick={deleteUser} className="delete-btn">Delete account</button>
          <h2>Delete all your cards</h2>
          <RemoveAllCards />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h2>Add a new card</h2>
          <Box><AddCard /></Box>
        </TabPanel>
        <TabPanel value={value} index={3} className="cards-container">
          <h2>View your cards</h2>
            <p>How to use the app: </p>
            <ul>
              <li>Click on the card to see the translation</li>
              <li>Click on the trash icon to delete the card</li>
              <li>Click on the pencil icon to edit the card</li>
              <li>You will see four icons: 😀, 😐, 😒 and ✅. After you review the word, choose one of the emotions. When you are sure that you have mastered the word, click on ✅</li>
            </ul>
          <CardsList />
        </TabPanel>
        </Box>
        </div>
    );
  }
}

export default Dashboard;