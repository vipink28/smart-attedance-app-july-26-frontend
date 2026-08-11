import { createContext, useEffect, useState } from "react";
import api from "../api/config";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const local = localStorage.getItem("saauser");
    return local ? JSON.parse(local) : null;
  });

  const userStatus = async () => {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data.user);
      localStorage.setItem("saauser", JSON.stringify(response.data.user));
    } catch (error) {
      localStorage.removeItem("saauser");
      localStorage.removeItem("saatoken");
      setUser(null);
    }
  };

  useEffect(() => {
    userStatus();
  }, []);

  const login = async (formData) => {
    const response = await api.post("/auth/login", formData);
    localStorage.setItem("saatoken", response.data.token);
    localStorage.setItem("saauser", JSON.stringify(response.data.user));
    setUser(response.data.user);
    return response.data.user;
  };

  const logout = () => {
    localStorage.removeItem("saatoken");
    localStorage.removeItem("saauser");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
