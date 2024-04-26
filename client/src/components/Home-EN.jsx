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
                    <a href="/" className="headerbutton">Home</a>
                    <a href="/about" className="headerbutton">About</a>
                </div>
                <div className="logincomponent">
                    <Button variant="primary" className="regbutton" onClick={() => navigate('/login')}>Login</Button>
                    <Button variant="primary" className="regbutton" onClick={() => navigate('/register')}>Register</Button>
                </div>
            </div>
            <div className="hero">
                <h1>WordWeb</h1>
                <h2>A free easy website to make flashcards!</h2>
            </div>
            <div className="main">
                <h1>Welcome to WordWeb!</h1>
                <p>Are you looking for a free website that can become an important tool in learning a language?</p>
                <p>Well, you can breathe easily as your long search is over!</p>
                <h3>Here are the key features:</h3>
                <ul>
                    <li>Completely <b>cost-free</b>;</li>
                    <li>100% <b>ad-free</b>;</li>
                    <li>Easy to use;</li>
                    <li>Add, edit, delete flashcards anytime you wish</li>
                    <li>An exam countdown that is a good reminder and motivator</li>
                </ul>
                <div className="logincomponent">
                    <Button variant="primary" className="regbutton">Login</Button>
                    <Button variant="primary" className="regbutton">Register</Button>
                </div>
            </div>
            <Footer />
        </div>
    )
}