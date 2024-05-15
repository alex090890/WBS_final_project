import Footer from "./Footer";
import Button from 'react-bootstrap/Button';
import { Card, Space } from 'antd';
const { Meta } = Card;
import { FaLinkedin, FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function AboutUA() {
    const navigate = useNavigate();

    return (
        <div>
            <div className='languageswitcher'>
                <a href="/" className='lang'><img src='/united-states-of-america.png' className="langimg" /></a>
                <a href="/de" className='lang'><img src='/germany.png' className='langimg' /></a>
                <a href="/ua" className='lang'><img src='/ukraine.png' className='langimg' /></a>
            </div>
            <div className="header">
                <div>
                    <a href="/ua" className="headerbutton">Home</a>
                    <a href="/ua/about" className="headerbutton">About</a>
                </div>
                <div className="logincomponent">
                    <Button variant="primary" className="regbutton" onClick={() => navigate('/ua/login')}>Увійти</Button>
                    <Button variant="primary" className="regbutton" onClick={() => navigate('/ua/register')}>Зареєструватися</Button>
                </div>
            </div>
            <div className="hero">
                <h1>WordWeb</h1>
                <h2>Легкий безкоштовний сервіс для вивчення нових слів</h2>
            </div>
            <div className="main">
                <h1>Про мене</h1>
                <div className="introcard">
                    <Card hoverable cover={<img alt="example" src="/Bewerbungsbild.jpg" />}>
                        <Meta title="Oleksandr Lazurenko" description="www.alexprof.site" />
                    </Card>
                    <Space direction="vertical" size={16}>
                        <Card title="Основна інформація" className="about-desc">
                            <p>Я Fullstack-розробник, який із задоволенням може надає зі створення веб-додатків, зокрема інтерфейсу та серверної частини</p>
                            <p>Мій основний стек MERN (MongoDB, Express, React, Node.js)</p>
                            <p>Слідкуйте за мною у соцмережах за мною та пішіть мені, якщо у вас виникнуть запитання.</p>
                        </Card>
                    </Space>
                    <Space direction="vertical" size={16}>
                        <Card title="Контакти" style={{width: 300,}}>
                            <p>E-Mail: <a href="mailto:alexprofteach@gmail.com" target="_blank">alexprofteach@gmail.com</a></p>
                            <a href="https://www.linkedin.com/in/alex090890/" target="_blank"><FaLinkedin className="social-icon" /></a>
                            <a href="https://www.facebook.com/OleksandrLazurenkoUA" target="_blank"><FaFacebook className="social-icon" /></a>
                            <a href="https://www.instagram.com/oleksandrlazurenkoua/" target="_blank"><FaInstagramSquare className="social-icon"  /></a>
                            <a href="https://twitter.com/AlexL090890" target="_blank"><FaXTwitter className="social-icon"  /></a>
                        </Card>
                    </Space>
                </div>
            </div>
            <Footer />
        </div>
    )
}