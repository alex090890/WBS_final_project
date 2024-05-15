import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Input, Card, Flex, Spin } from 'antd';

export default function CardListUa() {
  const { login } = useParams();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showUpdate, setShowUpdate] = useState({});
  const [showBack, setShowBack] = useState({});
  const [cardCounts, setCardCounts] = useState({
    mastered: 0,
    good: 0,
    soSo: 0,
    bad: 0,
  });
  
  const gridStyle = {
  width: '100%',
  textAlign: 'center',
};

  useEffect(() => {
    if (!login) return;

    setLoading(true);
    axios.get(`https://wordweb.vercel.app/cards/${login}`)
      .then((response) => {
        if (response.data.length > 0) {
          setCards(response.data);
          updateCardCounts(response.data);
        } else {
          setError('Карток не знайдено');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Виникла помилка при завантаженні карток');
        setLoading(false);
      })
  }, [login]);

  const updateCardCounts = (cards) => {
    const counts = {
      mastered: 0,
      good: 0,
      soSo: 0,
      bad: 0,
    };
    cards.forEach((card) => {
      switch (card.isCardLearned) {
        case '✅':
          counts.mastered++;
          break;
        case '😀':
          counts.good++;
          break;
        case '😐':
          counts.soSo++;
          break;
        case '😒':
          counts.bad++;
          break;
        default:
          break;
      }
    });
    setCardCounts(counts);
  };

  const handleDelete = (id) => {
    axios.delete(`https://wordweb.vercel.app/deletecard/${id}`)
      .then(() => {
        setCards(cards.filter((card) => card._id !== id));
        updateCardCounts(cards);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError('Помилка видалення картки');
      })
  };

  const handleUpdate = (id) => {
    setShowUpdate({ ...showUpdate, [id]: true });
  };

  const handleSaveUpdate = (id, front, back, isCardLearned) => {
    axios.patch(`https://wordweb.vercel.app/update-card/${id}`, { front, back, isCardLearned })
      .then(() => {
        const updatedCard = cards.find((card) => card._id === id);
        updatedCard.front = front;
        updatedCard.back = back;
        updatedCard.isCardLearned = isCardLearned;
        setCards([...cards]);
        setShowUpdate({ ...showUpdate, [id]: false });
        updateCardCounts(cards);
      })
      .catch((error) => {
        console.log(error);
        setError('Помилка оновлення картки');
      })
  };

  const handleCancelUpdate = (id) => {
    setShowUpdate({ ...showUpdate, [id]: false });
  };


  const toggleCardSide = (id) => {
    setShowBack((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isCardLearned = (id, learned) => {
    axios.patch(`https://wordweb.vercel.app/update-card/${id}`, { isCardLearned: learned })
      .then(()=> {
        const updatedCard = cards.find((card) => card._id === id);
        updatedCard.isCardLearned = learned;
        setCards([...cards]);
        updateCardCounts(cards);
      })
      .catch((error) => {
        console.log(error);
        setError('Помилка оновлення картки');
      });
  };

  if (loading) {
    return (
      <Flex align="center" gap="middle">
    <Spin size="large" />
  </Flex>
    );
  } else if (error) {
    return <p>{error}</p>;
  } else if (cards.length === 0) {
    return <p>Карток не знайдено</p>;
  } else {
    return (
      <div className="cards">
        <Card title="Ваша статистика:" className="cards">
          <div className="statistics">
                <Card style={gridStyle}>Опановано: <br /> {cardCounts.mastered}</Card>
    <Card style={gridStyle} className="stats-item">Добре: <br />{cardCounts.good}</Card>
    <Card style={gridStyle} className="stats-item">Невпевнено: <br />{cardCounts.soSo}</Card>
    <Card style={gridStyle} className="stats-item">Не вивчено: <br />{cardCounts.bad}</Card>
          </div>
        </Card>
        <div>
          <Card title="Перелік карток:">
            <p>У Вас {cards.length} карток</p>
        <ul className="cards-list">
          {cards.map((card) => (
            <li key={card._id}
              onClick={() => { toggleCardSide(card._id) }}
              style={{ cursor: 'pointer' }}
              className="flashcard-item"
              title={`Added on ${card.creationdate}`}
            >
              <div>
                {showBack[card._id] ? (
                  <div className={"back-side"}>{card.back} {card.isCardLearned}
                    <div>
                      <button className="flash-btn" onClick={() => handleDelete(card._id)} title="Delete">🗑</button>
                      <button className="flash-btn" onClick={() => handleUpdate(card._id)} title="Update">🖊</button>
                      <button className="flash-btn" onClick={() => isCardLearned(card._id, "😒")} title="Bad">😒</button>
                      <button className="flash-btn" onClick={() => isCardLearned(card._id, "😐")} title="So-so">😐</button>
                      <button className="flash-btn" onClick={() => isCardLearned(card._id, "😀")} title="Good">😀</button>
                      <button className="flash-btn" onClick={() => isCardLearned(card._id, "✅")} title="I have mastered it!">✅</button>
                    </div>
                  </div>
                ) : (
                    <div className={"front-side"}>{card.front} {card.isCardLearned}
                      <div>
                        <button className="flash-btn" onClick={() => handleDelete(card._id)} title="Delete">🗑</button>
                        <button className="flash-btn" onClick={() => handleUpdate(card._id)} title="Update">🖊</button>
                      <button className="flash-btn" onClick={() => isCardLearned(card._id, "😒")} title="Bad">😒</button>
                      <button className="flash-btn" onClick={() => isCardLearned(card._id, "😐")} title="So-so">😐</button>
                      <button className="flash-btn" onClick={() => isCardLearned(card._id, "😀")} title="Good">😀</button>
                      <button className="flash-btn" onClick={() => isCardLearned(card._id, "✅")} title="I have mastered it!">✅</button>
                      </div>
                    </div>
                )}
              </div>
              {showUpdate[card._id] && (
                <form>
                  <label>Front:</label>
                  <Input type="text" defaultValue={card.front} />
                  <br />
                  <label>Back:</label>
                  <Input type="text" defaultValue={card.back} />
                  <br />
                  <button onClick={(e) => {
                    e.preventDefault();
                    const front = e.target.form[0].value;
                    const back = e.target.form[1].value;
                    handleSaveUpdate(card._id, front, back, card.isCardLearned);
                  }} className="card-update-btn">Save</button>
                  <button onClick={() => handleCancelUpdate(card._id)} className="card-update-btn">Cancel</button>
                </form>
              )}
            </li>
          ))}
        </ul>
          </Card>
        </div>
      </div>
    );
  }
}