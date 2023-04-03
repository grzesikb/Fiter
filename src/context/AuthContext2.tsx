import { Dispatch, SetStateAction, createContext, useState } from "react";

export type User = {
  username: string;
  password: string;
};

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<Partial<UserContextInterface>>({});
function UserProvider() {
  // const [user, setUser] = useState<User>();
  // return (
  //     <UserContext.Provider value={{user, setUser}}>
  //         {children}
  //     </UserContext.Provider>
  // );
}
