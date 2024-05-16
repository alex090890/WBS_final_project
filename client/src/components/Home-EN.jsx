import Footer from "./Footer";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export default function HomeEN() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="content">
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
                <div className="welcome-div">
                    <div className="welcome-container">
                    <div className="main">
                            <h1 className="welcome-header">Welcome to WordWeb!</h1>
                            <img src="https://res.cloudinary.com/dosvnb1kk/image/upload/v1715880929/Main_Features_1_rk7zzv.png" className="welcome-img" />
                    
                <p className="welcome-text">Are you looking for a free website that can become an important tool in learning a language?</p>
                    <p className="welcome-text">Well, you can breathe easily as your long search is over!</p>
                </div>
                </div>
                </div>
            </div>
           <Footer />
        </div>
    )
}