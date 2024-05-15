import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function RemoveAllCardsDe () {
  const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    
    const { login } = useParams();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(`https://wordweb.vercel.app/deleteallcards/${login}`);
      if (response.status === 200) {
        setIsDeleting(false);
        alert('Karten erfolgreich gelöscht!');
      } else {
        setDeleteError('Fehler beim Löschen der Karten');
      }
    } catch (error) {
      setDeleteError('Fehler beim Löschen der Karten');
      setIsDeleting(false);
    }
  };

  return (
    <div>
      {isDeleting? (
        <p>Deleting cards...</p>
      ) : (
        <button onClick={handleDelete} className="delete-btn">Löschen</button>
      )}
      {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
    </div>
  );
}
