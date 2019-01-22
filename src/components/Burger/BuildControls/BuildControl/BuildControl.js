import React from 'react';
import styles from './BuildControl.module.css';

const BuildControl = (props) => {
    return (
        <div className={styles.BuildControl}>
            <label className={styles.Label}>{props.label}</label>
            <button className={styles.Less} onClick={props.onRemoveIngredient} disabled={props.disabled}>Less</button>
            <button className={styles.More} onClick={props.onAddIngredient}>More</button>
        </div>
    );
}

export default BuildControl;