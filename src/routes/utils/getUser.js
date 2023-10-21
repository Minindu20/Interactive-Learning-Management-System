import axios from "axios";
const getUser = async () => {
    let id, role, username;
    try {
      const response = await axios.get("http://localhost:4000/auth-status");
      if (response.data.auth) {
        username = response.data.username;
        id = response.data.id;
        role = response.data.role;
        return { id, role, username };
      } else {
        console.log("User not authenticated");
        return null;
      }
    } catch (error) {
      console.log("Error fetching user:", error);
      return null;
    }
  };
  
  export default getUser;

