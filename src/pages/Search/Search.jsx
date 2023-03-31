import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";



export default function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data);
      } else {
        setResults([]);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <>
      <h1>Search Results for "{query}"</h1>
      <Grid container spacing={2}>
        {results.map((book) => (
            <Grid item xs={12} key={book._id}>
            <Box display="flex" alignItems="center">
                <Box pr={2}>
                    <Link to={`/books/${book._id}`}>
                        <img src={book.image} alt={book.title} style={{ height: "200px" }} />
                    </Link>
                </Box>
                <Box>
                <Typography variant="h5" gutterBottom>
                    {book.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    By {book.author.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Genre: {book.genre.join(", ")}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Language: {book.language}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Publisher: {book.publisher}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    ISBN: {book.isbn}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Published Date: {new Date(book.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </Typography>
                </Box>
            </Box>
            <hr />
            </Grid>
        ))}
        </Grid>

    </>
  );
}
