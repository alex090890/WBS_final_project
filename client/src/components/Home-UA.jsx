import Footer from "./Footer";
import Button from 'react-bootstrap/Button';

export default function HomeEN() {
    return (
        <div>
            <div className='languageswitcher'>
                <a href="/" className='lang'><img src='/united-states-of-america.png' className="langimg" /></a>
                <a href="/de" className='lang'><img src='/germany.png' className='langimg' /></a>
                <a href="/ua" className='lang'><img src='/ukraine.png' className='langimg' /></a>
            </div>
            <div className="header">
                <div>
                    <a href="/" className="headerbutton">Головна</a>
                    <a href="/about" className="headerbutton">Про мене</a>
                </div>
                <div className="logincomponent">
                    <Button variant="primary" className="regbutton">Увійти</Button>
                    <Button variant="primary" className="regbutton">Зареєструватися</Button>
                </div>
            </div>
            <div className="hero">
                <h1>WordWeb</h1>
                <h2>Легкий безкоштовний сервіс для вивчення нових слів</h2>
            </div>
            <div className="main">
                <h1>Ласкаво просимо до WordWeb!</h1>
                <p>Ви шукаєте безкоштовний сервіс для вивчення мови?</p>
                <p>Що ж, ви можете видихнути спокійно, оскільки ваш пошук дійшов до кінця!</p>
                <h3>Основні переваги:</h3>
                <ul>
                    <li>Абсолютно <b>безкоштовний</b>;</li>
                    <li>100% <b>без реклами</b>;</li>
                    <li>Легкий у використанні;</li>
                    <li>Додавайте, змінюйте та видаляйте картки без проблем</li>
                    <li>Лічильник, який нагадує вам про екзамен</li>
                    <li>Можливість зберегти слова, які ви вивчили</li>
                </ul>
                <div className="logincomponent">
                    <Button variant="primary" className="regbutton">Увійти</Button>
                    <Button variant="primary" className="regbutton">Зареєструватися</Button>
                </div>
            </div>
            <Footer />
        </div>
    )
}