import Footer from "./Footer";
import Button from 'react-bootstrap/Button';
import { Card, Space } from 'antd';
const { Meta } = Card;
import { FaLinkedin, FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function AboutDe() {
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
                    <a href="/" className="headerbutton">Startenseite</a>
                    <a href="/about" className="headerbutton">Uber mich</a>
                </div>
                <div className="logincomponent">
                    <Button variant="primary" className="regbutton" onClick={() => navigate('/de/login')}>Anmelden</Button>
                    <Button variant="primary" className="regbutton" onClick={() => navigate('/de/register')}>Registrieren</Button>
                </div>
            </div>
            <div className="hero">
                <h1>WordWeb</h1>
                <h2>Eine kostenlose, einfache Website, auf der Sie sich alles merken können!</h2>
            </div>
            <div className="main">
                <h1></h1>
                <div className="introcard">
                    <Card hoverable cover={<img alt="example" src="/Bewerbungsbild.jpg" />}>
                        <Meta title="Oleksandr Lazurenko" description="www.alexprof.site" />
                    </Card>
                    <Space direction="vertical" size={16}>
                        <Card title="Über mich" className="about-desc">
                            <p>Ich bin ein Full-Stack-Entwickler, der gerne Dienstleistungen bei der Erstellung von Web-Apps, einschließlich Frontend und Backend, erbringen kann</p>
                            <p>Mein Hauptstack ist MERN (MongoDB, Express, React, Node.js)</p>
                            <p>Bitte zögern Sie nicht, mir zu folgen und mir zu schreiben, wenn Sie Fragen haben.</p>
                        </Card>
                    </Space>
                    <Space direction="vertical" size={16}>
                        <Card title="Kontakt" style={{width: 300,}}>
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