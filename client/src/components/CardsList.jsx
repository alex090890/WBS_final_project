import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CardsList() {
  const { login } = useParams();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState({});
  const [showUpdate, setShowUpdate] = useState({});
  const [showBack, setShowBack] = useState({});

  useEffect(() => {
    if (!login) return;

    setLoading(true);
    axios.get(`https://wordweb.vercel.app/cards/${login}`)
     .then((response) => {
        if (response.data.length > 0) {
          setCards(response.data);
        } else {
          setError('No cards found');
        }
        setLoading(false);
      })
     .catch((error) => {
        console.error(error);
        setError('Unexpected error');
        setLoading(false);
      })
  }, [login]);

  function handleDelete(id) {
    axios.delete(`https://wordweb.vercel.app/deletecard/${id}`)
     .then(() => {
        setCards(cards.filter((card) => card._id!== id));
        setError(null);
      })
     .catch((error) => {
        console.log(error);
        setError('Error deleting card');
      })
  }

  function handleUpdate(id) {
    setShowUpdate({...showUpdate, [id]: true });
  }

  function handleSaveUpdate(id, front, back) {
    axios.patch(`https://wordweb.vercel.app/update-card/${id}`, { front, back })
     .then(() => {
        const updatedCard = cards.find((card) => card._id === id);
        updatedCard.front = front;
        updatedCard.back = back;
        setCards([...cards]);
        setShowUpdate({...showUpdate, [id]: false });
      })
     .catch((error) => {
        console.log(error);
        setError('Error updating card');
      })
  }

  function handleCancelUpdate(id) {
    setShowUpdate({...showUpdate, [id]: false });
  }

  function getCardAge(creationdate) {
    const currentDate = new Date();
    const currentDateFormatted = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const [day, month, year] = creationdate.split('-');
    const cardDate = new Date(`${year}-${month}-${day}`);
    const cardDateFormatted = `${cardDate.getDate()}-${cardDate.getMonth() + 1}-${cardDate.getFullYear()}`;
    const diffInDays = Math.ceil((currentDate - cardDate) / (1000 * 60 * 60 * 24));
    console.log(`The current date is ${currentDateFormatted}`)
    console.log(`The card date is ${cardDateFormatted}`)
    console.log(diffInDays)
    return { diffInDays, currentDateFormatted, cardDateFormatted };
  }

  const toggleCardSide = (id) => {
    setShowBack(prev => ({...prev, [id]:!prev[id] }));
  };

  const isCardLearned = (id, learned) => {
    axios.patch(`https://wordweb.vercel.app/update-card/${id}`, { isCardLearned: learned })
     .then(() => {
        const updatedCard = cards.find((card) => card._id === id);
        updatedCard.isCardLearned = learned;
        setCards([...cards]);
      })
     .catch((error) => {
        console.log(error);
        setError('Error updating card learned status');
      })
  };

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>{error}</p>
  } else if (cards.length === 0) {
    return <p>No cards found</p>
  } else {
    return (
      <div>
        <h1>{login}&#39;s Cards</h1>
        <ul className="cards-list">
          {cards.map((card) => (
            <li key={card._id}
              onMouseOver={() => setShowDelete({...showDelete, [card._id]: true })}
              onMouseOut={() => setShowDelete({...showDelete, [card._id]: false })}
              onClick={() => toggleCardSide(card._id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="flashcard-item">
                {showBack[card._id] ? (

                    <p className="front-side">{card.front} { card.isCardLearned}<div className="reviewTime" style={{
                backgroundColor: getCardAge(card.creationdate).diffInDays >= 3? 'red' :
                              getCardAge(card.creationdate).diffInDays >= 2? 'yellow' :
                        getCardAge(card.creationdate).diffInDays >= 1? 'grey' :
                            getCardAge(card.creationdate).diffInDays >= 0? 'blue' :
                              'white'
              }}></div></p>
                ) : (
                    <p className="back-side">{card.back} { card.isCardLearned}<div className="reviewTime" style={{
                backgroundColor: getCardAge(card.creationdate).diffInDays >= 3? 'red' :
                              getCardAge(card.creationdate).diffInDays >= 2? 'yellow' :
                        getCardAge(card.creationdate).diffInDays >= 1? 'grey' :
                            getCardAge(card.creationdate).diffInDays >= 0? 'blue' :
                              'white'
              }}></div></p>
                )}
                
              </div>
              {showDelete[card._id] && (
                <div>
                  <p>Added on {card.creationdate}</p>
                  <button className="login-btn1" onClick={() => handleDelete(card._id)}>🗑</button>
                  <button className="login-btn1" onClick={() => handleUpdate(card._id)}>🖊</button>
                  <button className="login-btn1" onClick={() => isCardLearned(card._id, "😀")}>😀</button>
                  <button className="login-btn1" onClick={() => isCardLearned(card._id, "😐")}>😐</button>
                  <button className="login-btn1" onClick={() => isCardLearned(card._id, "😒")}>😒</button>
                  <button className="login-btn1" onClick={() => isCardLearned(card._id, "✅")}>✅</button>
                </div>
              )}
              {showUpdate[card._id] && (
                <form>
                  <label>Front:</label>
                  <input type="text" defaultValue={card.front} />
                  <br />
                  <label>Back:</label>
                  <input type="text" defaultValue={card.back} />
                  <br />
                  <button onClick={(e) => {
                    e.preventDefault();
                    const front = e.target.form[0].value;
                    const back = e.target.form[1].value;
                    handleSaveUpdate(card._id, front, back);
                  }}>Save</button>
                  <button onClick={() => handleCancelUpdate(card._id)}>Cancel</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}