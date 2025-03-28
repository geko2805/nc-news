import { createContext, useState } from "react";

//create context to hold values
export const UserContext = createContext();

//component to provide values that are in context to it's children
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        modalOpen,
        setModalOpen,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
