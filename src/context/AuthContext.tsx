import React, { createContext, useState } from "react";
import axios from "axios";

interface User {
  username: string;
  password: string;
  role: "user" | "admin";
}

interface AuthContextInterface {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface>({
  user: null,
  login: async () => {},
  logout: () => {},
});

export default AuthContext;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  console.log("eLo");
  const login = async (username: string, password: string) => {
    try {
      const { data: users } = await axios.get<User[]>("../users.json");

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        setUser(user);
      } else {
        console.log("Nieprawidłowa nazwa użytkownika lub hasło");
      }
    } catch (error) {
      console.log("Błąd podczas pobierania danych użytkowników", error);
    }
  };

  const logout = () => {
    // Usuń dane użytkownika z kontekstu autoryzacji
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
