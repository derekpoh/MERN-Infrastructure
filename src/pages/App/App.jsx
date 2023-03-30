import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from "../HomePage/HomePage";
import RegisterPage from "../RegisterPage/RegisterPage";
import LoginPage from "../LoginPage/LoginPage";
import { getUser } from '../../utilities/users-service';


export default function App() {
  const [user,setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/users/login" element={<LoginPage setUser={setUser}/>}></Route>
        <Route path="/users/register" element={<RegisterPage setUser={setUser}/>}></Route>
      </Routes>
    </main>
  )
}
