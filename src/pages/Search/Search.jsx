import { Link } from "react-router-dom";
import { Box, Typography, Grid, Button, useMediaQuery, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { styled } from '@mui/material/styles';

const theme = createTheme();


const SearchTitle = styled('div')(({ theme }) => ({
    fontSize: '2rem',
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));
  
const SearchBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    display: "flex",
    alignItems: "flex-start",
}));

const DescriptionBox = styled(Box)(({ theme }) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}));

const Description = ({ text, query }) => {
    const [expanded, setExpanded] = useState(false);
    const regex = new RegExp(query, "gi");

  
    const handleToggle = () => {
      setExpanded(!expanded);
    };
  
    return (
      <>
        <DescriptionBox>
          <Typography variant="subtitle2" gutterBottom>
            {expanded ? (
              query ? (
                <span dangerouslySetInnerHTML={{
                  __html: text.replace(regex, match => `<mark>${match}</mark>`)
                }} />
              ) : (
                text
              )
            ) : (
              query ? (
                <span dangerouslySetInnerHTML={{
                  __html: text.substring(0, 100).replace(regex, match => `<mark>${match}</mark>`) + "..."
                }} />
              ) : (
                text.substring(0, 100) + "..."
              )
            )}
          </Typography>
        </DescriptionBox>
        {text.length > 100 && (
          <Button size="small" onClick={handleToggle}>
            {expanded ? "Read less" : "Read more"}
          </Button>
        )}
      </>
    );
};

export default function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const query = searchParams.get("q");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const regex = new RegExp(query, "gi")

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
      <SearchTitle><Typography variant="h4">Search Results for "{query}"</Typography></SearchTitle>
      <Grid container spacing={1}>
      {results.map((book) => (
  <Grid item xs={12} key={book._id}>
    <SearchBox>
      <Box pr={2} sx={{height: 200, '&:hover': {opacity: [0.9, 0.8, 0.7],}}}>
        <Link to={`/books/${book._id}`}>
          <img src={book.image} alt={book.title} style={{height: "200px", width: "140px", verticalAlign: "top" }} />
        </Link>
      </Box>
      <Box>
        <Typography variant="h5" gutterBottom>
          {query && book.title.toLowerCase().includes(query.toLowerCase()) ? (
            <span dangerouslySetInnerHTML={{
              __html: book.title.replace(regex, match => `<mark>${match}</mark>`)
            }}></span>
          ) : (
            book.title
          )}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          By {query && book.author.name.toLowerCase().includes(query.toLowerCase()) ? (
            <span dangerouslySetInnerHTML={{
              __html: book.author.name.replace(regex, match => `<mark>${match}</mark>`)
            }}></span>
          ) : (
            book.author.name
          )}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Genre: {query && book.genre.join(", ").toLowerCase().includes(query.toLowerCase()) ? (
            <span dangerouslySetInnerHTML={{
              __html: book.genre.join(", ").replace(regex, match => `<mark>${match}</mark>`)
            }}></span>
          ) : (
            book.genre.join(", ")
          )}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Category: {query && book.category.toLowerCase().includes(query.toLowerCase()) ? (
            <span dangerouslySetInnerHTML={{
              __html: book.category.replace(regex, match => `<mark>${match}</mark>`)
            }}></span>
          ) : (
            book.category
          )}
        </Typography>
        {isMobile ? null :(
          <>
            <Typography variant="body2" gutterBottom>
              Publisher: {query && book.publisher.toLowerCase().includes(query.toLowerCase()) ? (
                <span dangerouslySetInnerHTML={{
                  __html: book.publisher.replace(regex, match => `<mark>${match}</mark>`)
                }}></span>
              ) : (
                book.publisher
              )}
            </Typography>
            <Typography variant="body2" gutterBottom>
              ISBN: {query && book.isbn.toLowerCase().includes(query.toLowerCase()) ? (
                <span dangerouslySetInnerHTML={{
                  __html: book.isbn.replace(regex, match => `<mark>${match}</mark>`)
                }}></span>
              ) : (
                book.isbn
              )}
            </Typography>
          </>
        )}
        <Description text={book.description} query={query}/>
      </Box>
    </SearchBox>
  </Grid>
))}
</Grid>

    </>
  );
}
