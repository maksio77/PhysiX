import { createContext, useState, useEffect, useCallback } from "react";
import usePhysixService from "../../services/PhysixService";
export const UserContext = createContext();

const UserProvider = (props) => {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState([]);
  const { getCurrentUser, loading } = usePhysixService();

  const getUser = useCallback(async () => {
    try {
      const res = await getCurrentUser(token);
      setUser(res);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
