import Footer from "./Footer";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export default function HomeEN() {
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
            <div className="main">
                <h1>Willkommen zu WordWeb!</h1>
                <p>Suchen Sie nach einer kostenlosen Website, die ein wichtiges Hilfsmittel beim Erlernen einer Sprache sein kann?</p>
                <p>Nun, Sie können beruhigt aufatmen, denn Ihre lange Suche hat ein Ende!</p>
                <h3>Hier sind die wichtigsten Funktionen:</h3>
                <ul>
                    <li>Ganz <b>kostenlos</b>;</li>
                    <li>100% <b>Werbung-frei</b>;</li>
                    <li>Einfach zu nutzen;</li>
                    <li>Sie können Karteikarten jederzeit hinzufügen, bearbeiten oder löschen</li>
                    <li>Benutzerfreundliches Design</li>
                </ul>
                <div className="logincomponent">
                    <Button variant="primary" className="regbutton" onClick={() => navigate('/de/login')}>Anmelden</Button>
                    <Button variant="primary" className="regbutton" onClick={() => navigate('/de/register')}>Registrieren</Button>
                </div>
            </div>
            <Footer />
        </div>
    )
}