import { useColorScheme } from "@mui/joy";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

//create context to hold values
export const UserContext = createContext();

//component to provide values that are in context to it's children
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { mode, systemMode } = useColorScheme();
  const toastSuccess = (message) =>
    //to accept jsx
    //toast.success(typeof message === "string" ? message : message, {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      //use light or dark as the theme
      theme: mode === "system" ? systemMode : mode,
    });
  const toastError = (error) =>
    toast.error(error, {
      position: "bottom-right",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: mode === "system" ? systemMode : mode,
    });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        modalOpen,
        setModalOpen,
        searchQuery,
        setSearchQuery,
        mode: mode === "system" ? systemMode : mode, //set mode to be either light or dark
        toastSuccess,
        toastError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
