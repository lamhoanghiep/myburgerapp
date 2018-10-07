import React from 'react';
import classes from './Logo.css';
import burgerlogo from '../../assets/images/burger-logo.png';
const logo = (props) => {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={burgerlogo} alt="My Burger"/>
        </div>
    );
};

export default logo;