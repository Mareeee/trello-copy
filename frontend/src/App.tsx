import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Home/>
    </>
  )
}

export default App;
