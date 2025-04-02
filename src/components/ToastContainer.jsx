import { ToastContainer } from "react-toastify";
import { UserContext } from "./UserContext";
import { useContext } from "react";

function Toast() {
  const { mode } = useContext(UserContext);
  console.log(mode, "mode----------");
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={8000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={mode}
    />
  );
}
export default Toast;
