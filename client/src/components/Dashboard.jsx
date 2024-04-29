import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { login } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) return;

    axios.get(`https://wordweb.vercel.app/userinfo/${login}`)
     .then((response) => {
        if (response.data) {
          setUser(response.data)
        } else {
          setUser('not found');
        }
      })
     .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 404) {
          setUser('not found');
        } else {
          setUser(null);
          console.error('Unexpected error:', error);
        }
      })
  }, [login]);

  const deleteUser = async () => {
    try {
      const response = await axios.delete(`https://wordweb.vercel.app/delete/${login}`);
      alert(response.data);
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('Error deleting user');
    }
  };


  if (!user) {
    return <p>Loading...</p>
  } else if (user === 'not found') {
    return <p>User is not found</p>
  } else {
    return (
      <div>
        <h1>{user.firstname} {user.lastname}</h1>
        <p>{user.login}</p>
        <p>{user.email}</p>
        <button onClick={deleteUser}>Delete account</button>
      </div>
    )
  }
}