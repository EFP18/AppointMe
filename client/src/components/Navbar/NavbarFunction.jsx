import React from 'react';
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { colors } from '../theme';


export const useStyles = makeStyles({
  link: {
    color: colors.primary,
    textDecoration: 'none',
    marginLeft: '10px',
    marginBottom: '16px',
    pointerEvents: 'auto',
    fontSize: 19,
    transition: 'color 0.2s, font-size 0.3s',
    '&:hover': {
      color: colors.contrast,
    },
  },
  typography: {
    color: colors.primary,
    marginBottom: '20px',
    fontFamily: 'League Spartan',
    fontWeight: 'bolder',
    fontSize: 45,
    transition: 'font-size 0.3s',
  },
});

export const CustomIconButton = ({ icon, altText, linkPath, linkText, isHovered, onClick }) => {
  const classes = useStyles();

  // allows for the CustomIconButton to properly utilize onClick events
  const handleClick = (event) => {
    event.preventDefault();
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <IconButton
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: isHovered ? '150px' : 'auto',
        pointerEvents: 'none'
      }}
      onClick={handleClick}
    >
      <img
        src={icon}
        alt={altText}
        style={{ marginBottom: '16px', width: '24px', height: '24px', pointerEvents: 'auto' }}
      />
      {isHovered && (
        <Link to={linkPath} className={classes.link}>
          {linkText}
        </Link>
      )}
    </IconButton>
  );
};
