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
                    <a href="/ua" className="headerbutton">Головна</a>
                    <a href="/ua/about" className="headerbutton">Про мене</a>
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
            {/*<div className="main">
                <h1>Ласкаво просимо до WordWeb!</h1>
                <p>Ви шукаєте безкоштовний сервіс для вивчення мови?</p>
                <p>Що ж, ви можете видихнути спокійно, оскільки ваш пошук дійшов до кінця!</p>
                <h3>Основні переваги:</h3>
                <ul>
                    <li>Абсолютно <b>безкоштовний</b>;</li>
                    <li>100% <b>без реклами</b>;</li>
                    <li>Легкий у використанні;</li>
                    <li>Додавайте, змінюйте та видаляйте картки без проблем</li>
                    <li>Можливість зберегти слова, які ви вивчили</li>
                </ul>
                <div className="logincomponent">
                    <Button variant="primary" className="regbutton" onClick={() => navigate('/ua/login')}>Увійти</Button>
                    <Button variant="primary" className="regbutton" onClick={() => navigate('/ua/register')}>Зареєструватися</Button>
                </div>
    </div>*/}
                            <div className="welcome-div">
                    <div className="welcome-container">
                    <div className="main">
                            <h1 className="welcome-header">Ласкаво просимо до WordWeb!</h1>
                            <img src="https://res.cloudinary.com/dosvnb1kk/image/upload/v1715884259/Main_Features_3_wmf92p.png" className="welcome-img" />
                <p className="welcome-text">Ви шукаєте безкоштовний сервіс для вивчення мови?</p>
                <p className="welcome-text">Що ж, ви можете видихнути спокійно, оскільки ваш пошук добіг до кінця!</p>
                </div>
                </div>
                </div>
            <Footer />
        </div>
    )
}