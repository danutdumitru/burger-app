import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = props => {
  const drawerStyles = [ styles.SideDrawer];
  drawerStyles.push ( props.isDisplayed? styles.Open : styles.Close);  
  return (
    <>
      <Backdrop show={props.isDisplayed} onBackdropClick={props.onClose} />
      <div className ={ drawerStyles.join(' ')}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
