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
import GenresPage from "../Genres/GenresPage"
import FavouritesPage from "../Favourites/FavouritesPage"
import HistoryPage from "../History/HistoryPage"
import BookDetails from "../BookDetails/BookDetails";
import BorrowBook from "../BorrowBook/BorrowBook";
import ReturnBook from "../ReturnBook/ReturnBook"
import UserAccountPage from "../UserAccount/UserAccountPage";
import Preferences from "../Preferences/Preferences";
import Search from "../Search/Search";


export default function App() {
  const [user,setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<HomePage user={user} />}></Route>
        <Route path="/users/login" element={<LoginPage setUser={setUser}/>}></Route>
        <Route path="/users/register" element={<RegisterPage setUser={setUser}/>}></Route>
        <Route path="/users/account" element={<UserAccountPage />}/>
        <Route path="/users/account/preferences" element={<Preferences user={user} setUser={setUser}/>} />
        <Route path="/users/account/loans" element={<LoansPage />} />
        <Route path="/users/account/favourites" element={<FavouritesPage />} />
        <Route path="/users/account/history" element={<HistoryPage />} />
        <Route path="/books/featured" element={<FeaturedPage />} />
        <Route path="/books/genres" element={<GenresPage />} />
        <Route path="/books/recommended" element={<RecommendedPage />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/books/search" element={<Search />} />
        {/* <Route path="/books/:id/borrow" element={<BorrowBook />} />
        <Route path="/books/:id/return" element={<ReturnBook />} /> */}
      </Routes>
    </main>
  )
}
