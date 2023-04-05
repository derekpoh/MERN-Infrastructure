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
});

const ContentWrapper = styled(CardContent)({
  paddingBottom: '0px !important',
});

const ActionsWrapper = styled(CardActions)({
  position: 'absolute',
  bottom: '0px',
  paddingBottom: '16px !important',
});

export default function BookCard({ book }) {
  const [expanded, setExpanded] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
        {!isMobile ? (
        <Link to={`/books/${book._id}`} style={{textDecoration: "none"}}>
        <CardWrapper sx={{ maxWidth: 350, minHeight: 540, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <CardMedia
          component="img"
          height="350"
          image={book.image}
          alt={book.title}
          sx={{
            top: 0,
            left: 0,
            width: '100%',
            height: '350px',
            objectFit: 'scale-down',
          }}
        />
        <ContentWrapper>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: 'small' }}>
            {book.author.name}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ fontSize: 'medium' }}>
            {book.title}
          </Typography>
        </ContentWrapper>
        <ActionsWrapper disableSpacing>
          <CustomTooltip title={<Typography variant="body2">{book.description}</Typography>} placement="top-start">
            <IconButton aria-label="show book description">
              <InfoOutlinedIcon />
            </IconButton>
          </CustomTooltip>
          </ActionsWrapper>
          </CardWrapper>
          </Link>
        ) : (         
        <Link to={`/books/${book._id}`} style={{textDecoration: "none"}}> 
        <CardWrapper sx={{ maxWidth: 180, maxHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <CardMedia
          component="img"
          height="150"
          image={book.image}
          alt={book.title}
          sx={{
            top: 0,
            left: 0,
            width: '100%',
            height: '150px',
            objectFit: 'scale-down',
          }}
        />
        <ContentWrapper>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: 'small' }}>
            {book.author.name}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ fontSize: 'small' }}>
            {book.title}
          </Typography>
        </ContentWrapper>
        </CardWrapper>
        </Link>
        )}
      </ThemeProvider>
)};
