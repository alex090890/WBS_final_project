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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}



export default function Dashboard() {
  const { login } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
    const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {
    if (!login) return;

    axios.get(`https://wordweb.vercel.app/userinfo/${login}`)
     .then((response) => {
        if (response.data) {
          setUser(response.data)
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
      })
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

  if (!user) {
    return <p>Loading...</p>
  } else if (user === 'not found') {
    return <p>User is not found</p>
  } else {
    return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100vh' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Dashboard" {...a11yProps(0)} />
        <Tab label="Danger Zone" {...a11yProps(1)} />
        <Tab label="New Card" {...a11yProps(2)} />
        <Tab label="Your cards" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div>
            <h1>Welcome, {user.firstname} {user.lastname}</h1>
            <CurrentDate />
        <p>Login: {user.login}</p>
        <p>Email: {user.email}</p>
        
        <button className="regbutton" onClick={() => navigate('/')}>Logout</button>
      </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h2>Are xou sure you want to delete your account?</h2>
          <button onClick={deleteUser}>Delete account</button>
          <RemoveAllCards />
      </TabPanel>
      <TabPanel value={value} index={2}>
          <h2>Add a new card</h2>
          <Box><AddCard /></Box>
      </TabPanel>
      <TabPanel value={value} index={3}>
          <h2>View your cards</h2>
          <CardsList />
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
  }
}