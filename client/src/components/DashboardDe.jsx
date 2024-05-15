import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './styles/Dashboard.css';
import AddCard from "./AddCard";
import CardsList from "./CardsList";
import RemoveAllCards from "./RemoveAllCards";
import CurrentDate from "./CurrentDate";
import Search from "./Search";
import Footer from "./Footer";
import { Card } from 'antd';

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
        <Tabs
      defaultActiveKey="your-cards"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
          <Tab eventKey="your-cards" title="Your Cards">
            <div className="instructions">
              <Card title="Instructions" bordered={false}>
        <p>How to use the app: </p>
            <ul>
              <li>Click on the card to see the translation</li>
              <li>Click on the trash icon to delete the card</li>
              <li>Click on the pencil icon to edit the card</li>
              <li>You will see four icons: 😀, 😐, 😒 and ✅. After you review the word, choose one of the emotions. When you are sure that you have mastered the word, click on ✅</li>
              </ul>
      </Card>
      <Card title="Add a new card" bordered={false}>
        <AddCard />
      </Card>
              <Card title="Find your card" bordered={false}>
                            <CurrentDate />
        <Search />
      </Card>
      </div>
          <CardsList />
          </Tab>
                    <Tab eventKey="profile" title="Your Account">

            <div className="dashboard-container">
            <div className="account">
                
                <Card title="Your Account" className="dashboard-item">
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
                </Card>
                <Card title="Danger Zone" className="dashboard-item">
                  <p>Delete all your cards.</p>
          <RemoveAllCards />
                                <p>Delete your account</p>
          <p className="notice">This process is unreversable. All the account information and the flashcards will be deleted.</p>
          <button onClick={deleteUser} className="delete-btn">Delete account</button>
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