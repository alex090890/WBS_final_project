import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './styles/Dashboard.css';
import AddCardUa from "./AddCardUa";
import CardsListUa from "./CardsListUa";
import RemoveAllCards from "./RemoveAllCards";
import CurrentDate from "./CurrentDate";
import SearchUa from "./SearchUa";
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

function DashboardUa() {
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
          setUser('Не знайдено');
        }
      })
     .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 404) {
          setUser('Не знайдено');
        } else {
          setUser(null);
          console.error('Непередбачувана помилка', error);
        }
      });
  }, [login]);

  const deleteUser = async () => {
    try {
      const response = await axios.delete(`https://wordweb.vercel.app/delete/${login}`);
      alert(response.data);
      navigate('/ua');
    } catch (error) {
      console.log(error);
      alert('Користувача не знайдено');
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
        setError('Помилка при оновленні даних користувача');
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
    return <p>Користувача не знайдено</p>;
  } else {
    return (
      <div className="dashboard">
        <h1>Ласкаво просимо до WordWeb, {user.login}! </h1>
        <Tabs
      defaultActiveKey="your-cards"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
          <Tab eventKey="your-cards" title="Картки">
            <div className="instructions">
              <Card title="Инструкції" bordered={false}>
        <p>Як вікористовувати застосунок: </p>
            <ul>
              <li>Натисніть або кликніть на картку, щоб побачити переклад.</li>
              <li>Натисніть або клікніть на кощік, щоб відалити картку. </li>
              <li>Натиснить або кликніть на олівець, щоб зминити картку</li>
              <li>Ви побачите чотири значки: 😀, 😐, 😒 і ✅. Переглянувши слово, виберіть одну з емоцій. Коли ви впевнені, що вивчили слово, натисніть ✅.</li>
              </ul>
      </Card>
      <Card title="Додати нову картку" bordered={false}>
                <AddCardUa />
      </Card>
              <Card title="Знайдіть свою картку" bordered={false}>
                            <CurrentDate />
        <SearchUa user={user} />
      </Card>
      </div>
          <CardsListUa />
          </Tab>
                    <Tab eventKey="profile" title="Обліковий запис">

            <div className="dashboard-container">
            <div className="account">
                
                <Card title="Ваш обліковий запис" className="dashboard-item">
                  <p>Ім&#39;я: {user.firstname} {user.lastname}</p>
            <p>Логін: {user.login}</p>
            <p>Електрона адреса: {user.email}</p>
            <button onClick={() => navigate('/ua')} className="update-btn">Вийти</button>
            <button onClick={handleUpdate} className="update-btn">Змінити</button>
            {isUpdating && (
              <form>
                <label>Ім&#39;я:</label>
                <Input type="text" defaultValue={user.firstname} />
                <br />
                <label>Прізвище:</label>
                <Input type="text" defaultValue={user.lastname} />
                <br />
                <label>Електрона адреса</label>
                <Input type="text" defaultValue={user.email} />
                <br />
                <button onClick={(e) => {
                  e.preventDefault();
                  const firstname = e.target.form[0].value;
                  handleSaveUpdate(firstname, user.lastname, user.password, user.email);
                }} className="update-btn">Зберегти</button>
                <button onClick={handleCancelUpdate} className="update-btn">Відміна</button>
              </form>
                )}
                </Card>
                <Card title="Налаштування" className="dashboard-item">
                  <p>Видалити усі картки:</p>
          <RemoveAllCards />
                                <p>Видалити Ваш обліковий запис:</p>
          <p className="notice">Цей процес необоротний. Уся інформація облікового запису та картки буде видалено.</p>
          <button onClick={deleteUser} className="delete-btn">Видалити обликовий запис</button>
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

export default DashboardUa;