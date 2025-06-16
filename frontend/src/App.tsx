import { BrowserRouter } from "react-router-dom"; // ✅
import { WebSocketProvider } from "./contexts/WebSocketContext";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import TaskCalendar from "./components/Calendar";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <WebSocketProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<TaskCalendar />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </WebSocketProvider>
    </BrowserRouter>
  );
}

export default App;
