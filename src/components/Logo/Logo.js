import React from 'react';
import styles from './Logo.module.css';

import burgerLogo from '../../assets/images/burger-logo.png';

const Logo = (props) => {
    return (
        <div className={styles.Logo} styles={{height: props.height}}>
            <img src={burgerLogo} alt="burger logo"/>
        </div>
    );
}

export default Logo;