import { createContext, useEffect, useState } from "react";
// calling Auth provider
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setAuth] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setAuth(user);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setAuth(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setAuth(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
