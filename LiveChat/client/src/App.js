import './App.css';
import Chat from './Pages/Chat';
import Login from './Pages/Login';
import Register from './Pages/Register';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SetAvatar from './Pages/SetAvatar';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Chat/>}/> 
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/setavatar" element={<SetAvatar/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
