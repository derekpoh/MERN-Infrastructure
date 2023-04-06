import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Tooltip, useMediaQuery } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link } from 'react-router-dom';


const theme = createTheme();

const CustomTooltip = styled(Tooltip)(({ theme }) => ({
  fontSize: 30,
  borderRadius: 4,
  sx: {
    '&& .MuiTooltip-tooltip': {
      backgroundColor: theme.palette.grey[700],
      fontSize: 30,
    },
  },
}));

const CardWrapper = styled(Card)({
  position: 'relative',
  height: '100%',
  margin: '0px 0px 0px 20px',
  padding: '5px',
  bottom: '100px',
  padding: '5px',
  boxShadow: '5px 5px 5px 8px #ece9e9',
  borderRadius: '20px',
  '&:hover': {
  backgroundColor: '#ece9e9'
  }
});

const ContentWrapper = styled(CardContent)({
  paddingBottom: '0px !important',

});

const ActionsWrapper = styled(CardActions)({
  position: 'absolute',
  bottom: '0px',
  paddingBottom: '10px !important',

});

export default function BookCard({ book }) {
  const [expanded, setExpanded] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
        {!isMobile ? (
        <Link to={`/books/${book._id}`} style={{textDecoration: "none"}}>
        <CardWrapper sx={{ width: 250, minHeight: 420, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <CardMedia
          component="img"
          height="320"
          image={book.image}
          alt={book.title}
          sx={{
            top: 0,
            left: 0,
            width: '200px',
            height: '300px',
            margin: '0 auto',
            borderRadius: "5px",
            padding: '5px'
          }}
        />
        <ContentWrapper>
          <Typography variant="h6" color="primary" sx={{ fontFamily: 'Poppins, sans-serif', color: '#595959', fontSize: '18px', textAlign: 'center', textOverflow: 'ellipsis', overflow: 'clip', whiteSpace: 'nowrap', width: '220px' }}>
            <strong>{book.title}</strong>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontFamily: 'Poppins, sans-serif', color: '#595959e8', fontSize: '15px', textAlign: 'center', textOverflow: 'ellipsis', overflow: 'clip', whiteSpace: 'nowrap', width: '220px' }}>
            {book.author.name}
          </Typography>
        </ContentWrapper>
        <ActionsWrapper disableSpacing >
          <CustomTooltip title={<Typography variant="body">{book.description}</Typography>} placement="top-start">
            <IconButton aria-label="show book description">
              <InfoOutlinedIcon />
            </IconButton>
          </CustomTooltip>
          </ActionsWrapper>
          </CardWrapper>
          </Link>
        ) : (         
        <Link to={`/books/${book._id}`} style={{textDecoration: "none"}}> 
        <CardWrapper sx={{ width: 125, minHeight: 200, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <CardMedia
          component="img"
          image={book.image}
          alt={book.title}
          sx={{
            width: '110px',
            height: '170px',
            margin: '0 auto',       
          }}
          
        />
        <ContentWrapper>
          <Typography variant="h6" color="primary" sx={{ fontFamily: 'Poppins, sans-serif', color: '#595959', fontSize: '10px', textOverflow: 'ellipsis', overflow: 'clip', whiteSpace: 'nowrap', marginTop: "-5px" }}>
            <strong>{book.title}</strong>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontFamily: 'Poppins, sans-serif', color: '#595959e8', fontSize: '8px', marginTop: "4px", marginBottom: "-4px" }}>
            {book.author.name}
          </Typography>
        </ContentWrapper>
        </CardWrapper>
        </Link>
        )}
      </ThemeProvider>
)}
