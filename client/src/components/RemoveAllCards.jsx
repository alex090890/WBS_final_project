import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function RemoveAllCards () {
  const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    
    const { login } = useParams();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(`https://wordweb.vercel.app/deleteallcards/${login}`);
      if (response.status === 200) {
        setIsDeleting(false);
        alert('Cards deleted successfully!');
      } else {
        setDeleteError('Error deleting cards');
      }
    } catch (error) {
      setDeleteError('Error deleting cards');
      setIsDeleting(false);
    }
  };

  return (
    <div>
      {isDeleting? (
        <p>Deleting cards...</p>
      ) : (
        <button onClick={handleDelete} className="delete-btn">Delete all cards</button>
      )}
      {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
    </div>
  );
}
