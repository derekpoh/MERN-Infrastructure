import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from "../HomePage/HomePage";
import RegisterPage from "../RegisterPage/RegisterPage";
import LoginPage from "../LoginPage/LoginPage";
import { getUser } from '../../utilities/users-service';
import LoansPage from "../Loans/LoansPage"
import RecommendedPage from "../Recommended/RecommendedPage";
import FeaturedPage from "../Featured/FeaturedPage";
import CategoriesPage from "../Categories/CategoriesPage"
import FavouritesPage from "../Favourites/FavouritesPage"
import HistoryPage from "../History/HistoryPage"
import BookDetails from "../BookDetails/BookDetails";
import BorrowBook from "../BorrowBook/BorrowBook";
import ReturnBook from "../ReturnBook/ReturnBook"
import UserAccountPage from "../UserAccount/UserAccountPage";


export default function App() {
  const [user,setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<HomePage user={user} />}></Route>
        <Route path="/users/login" element={<LoginPage setUser={setUser}/>}></Route>
        <Route path="/users/register" element={<RegisterPage setUser={setUser}/>}></Route>
        <Route path="/pages/:id/Loans" element={<LoansPage />} />
        <Route path="/pages/:id/Recommended" element={<RecommendedPage />} />
        <Route path="/pages/:id/Favourites" element={<FavouritesPage />} />
        <Route path="/pages/:id/History" element={<HistoryPage />} />
        <Route path="/pages/:id/UserAccount" element={<UserAccountPage />} />
        <Route path="/pages/Featured" element={<FeaturedPage />} />
        <Route path="/pages/Categories" element={<CategoriesPage />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/books/:id/borrow" element={<BorrowBook />} />
        <Route path="/books/:id/return" element={<ReturnBook />} />
      </Routes>
    </main>
  )
}
