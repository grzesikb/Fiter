import React, { createContext, useContext, useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { dbUsers } from "../firebaseConfig";

interface User {
  username: string;
  password: string;
  userID: string;
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
  const login = async (username: string, password: string) => {
    getDocs(dbUsers)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data() as User);
        const user = data.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          setUser(user);
          console.log("Propawna");
          //window.location.href = "/home";
        } else {
          console.log("Nieprawidłowa nazwa użytkownika lub hasło");
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
