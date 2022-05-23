import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import AddNewParts from './pages/AddNewParts/AddNewParts';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/add-new-part' element={<AddNewParts></AddNewParts>}></Route>
      </Routes>
    </div>
  );
}

export default App;
