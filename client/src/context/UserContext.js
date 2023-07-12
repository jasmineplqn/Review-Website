import { createContext, useState } from "react";

// for setting the current user
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = sessionStorage.getItem("currentUser");
    if (user) {
      return user;
    } else {
      return null;
    }
  });

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </UserContext.Provider>
  );
};
