import { createContext, useState } from "react";
export const UserStateContext = createContext({});

function UserState({ children }) {
  const [user, setUser] = useState({
    email: "",
  });

  return (
    <UserStateContext.Provider value={[user, setUser]}>
      {children}
    </UserStateContext.Provider>
  );
}

export default UserState;
