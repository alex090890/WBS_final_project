import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UserInfo() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) {
      return; // or navigate to an error page
    }

    axios.get(`http://localhost:3400/user/${id}`)
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
          // handle unexpected errors
          console.error('Unexpected error:', error);
        }
      })
  }, [id]);
    
    if (!user) {
        return <p>Loading...</p>
    } else if (user === 'not found') {
        return <p>User is not found</p>
    } else {
        return (
            <div>
                <p>First name: {user.firstname}</p>
                <p>Last name: {user.lastname}</p>
                <p>Email: {user.email}</p>
            </div>
        )
    }
}
