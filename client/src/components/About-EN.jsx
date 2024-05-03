import Footer from "./Footer";
import Button from 'react-bootstrap/Button';
import { Card, Space } from 'antd';
const { Meta } = Card;
import { FaLinkedin, FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function AboutEN() {
    return (
        <div>
            <div className='languageswitcher'>
                <a href="/" className='lang'><img src='/united-states-of-america.png' className="langimg" /></a>
                <a href="/de" className='lang'><img src='/germany.png' className='langimg' /></a>
                <a href="/ua" className='lang'><img src='/ukraine.png' className='langimg' /></a>
            </div>
            <div className="header">
                <div>
                    <a href="/" className="headerbutton">Home</a>
                    <a href="/about" className="headerbutton">About</a>
                </div>
                <div className="logincomponent">
                    <Button variant="primary" className="regbutton">Login</Button>
                    <Button variant="primary" className="regbutton">Register</Button>
                </div>
            </div>
            <div className="hero">
                <h1>WordWeb</h1>
                <h2>A free easy website to make flashcards!</h2>
            </div>
            <div className="main">
                <h1>About me</h1>
                <div className="introcard">
                    <Card hoverable style={{ width: 240, }} cover={<img alt="example" src="/Bewerbungsbild.jpg" />}>
                        <Meta title="Oleksandr Lazurenko" description="www.alexprof.site" />
                    </Card>
                    <Space direction="vertical" size={16}>
                        <Card title="About me" style={{width: 600,}}>
                            <p>I am a fullstack developer who can gladly provide services in creaing web apps, including frontend and backend</p>
                            <p>My main stack is MERN (MongoDB, Express, React, Node.js)</p>
                            <p>Please feel free to follow me and write to me if you feel any questions.</p>
                        </Card>
                    </Space>
                    <Space direction="vertical" size={16}>
                        <Card title="Contact me" style={{width: 300,}}>
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