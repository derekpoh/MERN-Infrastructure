import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const FavouritesPage = ({ user }) => {
  const {id} = useParams();
  const [favouriteBooks, setFavouriteBooks] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch('/api/users/account/favourites');
        const favourites = await response.json();
        setFavouriteBooks(favourites);
      } catch (error) {
        console.log('Error fetching favourites:', error);
      }
    };

    fetchFavourites();
  }, []);  

  return (
    <><p>hi</p></>
    // <div>
    //   <h1>Favourites</h1>
    //   <ul>
    //     {favourites.map((book) => (
          
    //     ))}
    //   </ul>
    // </div>
  );
};


export default FavouritesPage; 