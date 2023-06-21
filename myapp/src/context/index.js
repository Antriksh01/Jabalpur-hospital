import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: "",
    token: "",
  });

  // default axios

  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      // console.log(parseData[0]);
      const userData = parseData[0];
      // console.log(JSON.stringify(userData));

      setAuth({
        ...auth,
        user: userData,
        token: data.token,
      });
    }
  }, []);
  // console.log(auth.user);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hooks

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
