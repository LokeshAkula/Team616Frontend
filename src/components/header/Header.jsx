import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import HeaderButtons from './HeaderButtons';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const useStyles = makeStyles({
  header: {
    background: '', // Light Pink
    height:70,
    
    
  },
  appName: {
    textDecoration: 'none',
    color: '#fffec8', // Dark Gray
    fontSize: 30,
    fontStyle: 'italic',
    marginRight: 40,
    
  },
});

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.header}>
      <Toolbar>
        <Link to="/" className={classes.appName}>
          Lifetime
        </Link>
        <SearchBar />
        <HeaderButtons />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
