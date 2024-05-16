import Footer from "./Footer";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export default function HomeEN() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className='languageswitcher'>
                <a href="/" className='lang'><img src='/united-states-of-america.png' className="langimg" /></a>
                <a href="/de" className='lang'><img src='/germany.png' className='langimg' /></a>
                <a href="/ua" className='lang'><img src='/ukraine.png' className='langimg' /></a>
            </div>
            <div className="header">
                <div>
                    <a href="/de" className="headerbutton">Startenseite</a>
                    <a href="/de/about" className="headerbutton">Über mich</a>
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
        <div className="welcome-div">
                    <div className="welcome-container">
                    <div className="main">
                            <h1 className="welcome-header">Willkommen zu WordWeb!</h1>
                            <img src="https://res.cloudinary.com/dosvnb1kk/image/upload/v1715882574/Main_Features_2_eiyzso.png" className="welcome-img" />
                    
                <p className="welcome-text">Suchen Sie nach einer kostenlosen Website, die ein wichtiges Hilfsmittel beim Erlernen einer Sprache sein kann?</p>
                    <p className="welcome-text">Nun, Sie können beruhigt aufatmen, denn Ihre lange Suche hat ein Ende!</p>
                </div>
                </div>
                </div>
            <Footer />
        </div>
    )
}