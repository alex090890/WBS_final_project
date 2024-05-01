import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CardsList() {
    const { login } = useParams();
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showDelete, setShowDelete] = useState({});

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

    function handleDelete (id) {
        axios.delete(`https://wordweb.vercel.app/deletecard/${id}`)
            .then(() => {
                setCards(cards.filter((card) => card._id !== id));
                setError(null);
            })
            .catch((error) => {
                console.log(error);
                setError('Error deleting card');
            })
    }

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
                <ul>
                    {cards.map((card) => (
                        <li key={card._id}
                            onMouseOver={() => setShowDelete({ ...showDelete, [card._id]: true })}
                            onMouseOut={() => setShowDelete({ ...showDelete, [card._id]: false })}>
                            <p>{card.front}</p>
                            <p>{card.back}</p>
                            <p>{card.creationdate}</p>
                            {showDelete[card._id] && (
                                <button onClick={() => handleDelete(card._id)}>Delete</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}