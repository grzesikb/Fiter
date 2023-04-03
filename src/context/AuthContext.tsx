import React, { createContext, useState } from "react";
import { getDocs } from "firebase/firestore";
import { dbUsers } from "../firebaseConfig";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const login = async (username: string, password: string) => {
    getDocs(dbUsers)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data() as User);
        const user = data.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          setUser(user);
          history.push({
            pathname: "/home",
            state: { user },
          });
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
