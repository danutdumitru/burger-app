import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import MenuButton from "../MenuButton/MenuButton";

const Toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <MenuButton onButtonClick={props.onMenuButtonClick}/>
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems tokenId={props.tokenId}/>
      </nav>
    </header>
  );
};

export default Toolbar;
