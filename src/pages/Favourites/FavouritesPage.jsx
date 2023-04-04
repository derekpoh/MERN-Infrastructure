import { useState, useEffect } from "react";

const FavouritesPage = ({ user }) => {

  const [favouriteBooks, setFavouriteBooks] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch(`/api/users/${user._id}/favourites`);
        const { showFavBooks } = await response.json();   // { showFavBooks } from showFavourites in user controller
        setFavouriteBooks(showFavBooks.favouriteBooks);   // showFavBooks contains everything, .favouriteBooks to access favouriteBook
      } catch (error) {
        console.log('Error fetching favourites:', error);
      }
    };

    fetchFavourites();
  }, [user._id]);  

  //   const handleDelete = async () => {
  //     event.preventDefault();
  //     try {
  //     const response = await fetch(`/api/books/${user._id}/deleteFavouritePage`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   } catch (error) {
  //     console.log('Error deleting favourite:', error);
  //   }
  // };
    
return (
    <div>
      <h1>Your Favourites</h1>
      {favouriteBooks.length > 0 ? (
<ul>
  {favouriteBooks.map((book) => {
    return (
      <li key={book._id}>
        {book.title}<p/>
        
        <img src={book.image} alt="Book cover image" style=
          {{
            display: 'wrap-around',
            margin: 'auto',
            maxWidth: '200px',
            maxHeight: '150px',
          }}
        /> <p/>
        <button>Delete</button>
        <hr/>
      </li>
    );
  })}
</ul>
      ) : (
        <p>No favourites yet</p>
      )}
    </div>
  );
};

export default FavouritesPage; 



