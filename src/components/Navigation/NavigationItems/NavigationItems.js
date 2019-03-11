import React from "react";
import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  const loginLink = props.tokenId? 
    <NavigationItem link="/logout">Logout</NavigationItem>:
    <NavigationItem link="/auth">Authenticate</NavigationItem>;
  const ordersLink = props.tokenId?
    <NavigationItem link="/orders">Orders</NavigationItem>: null;
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/">
        Burger builder
      </NavigationItem>
      {ordersLink}
      {loginLink}
    </ul>
  );
};

export default NavigationItems;
