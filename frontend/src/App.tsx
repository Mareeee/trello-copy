import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Home />
    </>
  );
}

export default App;
