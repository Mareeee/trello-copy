import { WebSocketProvider } from "./contexts/WebSocketContext";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <WebSocketProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <Home />
    </WebSocketProvider>
  );
}

export default App;
