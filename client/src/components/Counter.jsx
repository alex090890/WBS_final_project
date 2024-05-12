import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Counter() {
  const { login } = useParams();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cardCounts, setCardCounts] = useState({
    mastered: 0,
    good: 0,
    soSo: 0,
    bad: 0,
  });

  useEffect(() => {
    if (!login) return;

    setLoading(true);
    axios.get(`https://wordweb.vercel.app/cards/${login}`)
      .then((response) => {
        if (response.data.length > 0) {
          setCards(response.data);
          updateCardCounts(response.data);
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







  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>{error}</p>;
  } else if (cards.length === 0) {
    return <p>No cards found</p>;
  } else {
    return (
      <div>
        <h3>Your statistics:</h3>
        <p>You have {cards.length + 1} cards</p>
                  <p>Mastered: {cardCounts.mastered}</p>
          <p>Good: {cardCounts.good}</p>
          <p>So-so: {cardCounts.soSo}</p>
          <p>Bad: {cardCounts.bad}</p>
      </div>
    );
  }
}