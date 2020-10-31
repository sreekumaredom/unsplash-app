import React from 'react';
import { connect } from 'react-redux';

//CSS
import styles from './ImageCard.module.css';

//Actions

const ImageCard = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardOverlay}></div>
      <img className={styles.cardImg} src={props.imgSrc} alt="" />

      <div className={styles.cardDelete}>
        <div className={styles.deleteBtn}>Delete</div>
      </div>
      <div className={styles.cardTitle}>
        <p>{props.title}</p>
      </div>
    </div>
  );
};

export default ImageCard;
