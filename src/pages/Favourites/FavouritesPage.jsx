 import { useState, useEffect } from 'react';
 
const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch('/api/users/account/favourites');
        const favourites = await response.json();
        setFavourites(favourites);
      } catch (error) {
        console.log('Error fetching favourites:', error);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div>
      <h1>Favourites</h1>
      <ul>
        {favourites.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};


export default FavouritesPage; 