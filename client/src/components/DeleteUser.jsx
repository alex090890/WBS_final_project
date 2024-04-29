import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

export default function DeleteUser() {
  const { login } = useParams();
  const history = useHistory();

  useEffect(() => {
    const deleteUser = async () => {
      try {
        const response = await axios.delete(`https://wordweb.vercel.app/deleteuser/${login}`);
        alert(response.data);
        history.push('/');
      } catch (error) {
        console.log(error);
        alert('Error deleting user');
      }
    };

    deleteUser();
  }, [login, history]);

  return (
    <div>Goodbye, {login}. Hope to see you back!</div>
  );
}