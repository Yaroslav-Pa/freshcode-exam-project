import Rating from 'react-rating';
import CONSTANTS from '../../../constants';
import styles from './OfferUserInfo.module.sass';
function OfferUserInfo({ data }) {
  const { avatar, firstName, lastName, email, rating } = data?.User;

  return (
    <div className={styles.userInfo}>
      <div className={styles.creativeInfoContainer}>
        <img
          src={
            avatar === 'anon.png'
              ? CONSTANTS.ANONYM_IMAGE_PATH
              : `${CONSTANTS.PUBLIC_IMAGES_URL}${avatar}`
          }
          alt="user"
        />
        <div className={styles.nameAndEmail}>
          <span>{`${firstName} ${lastName}`}</span>
          <span>{email}</span>
        </div>
      </div>
      <div className={styles.creativeRating}>
        <p className={styles.userScoreLabel}>Creative Rating </p>
        <Rating
          initialRating={rating}
          fractions={2}
          fullSymbol={
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />
          }
          placeholderSymbol={
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />
          }
          emptySymbol={
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
              alt="star-outline"
            />
          }
          readonly
        />
      </div>
    </div>
  );
}

export default OfferUserInfo;
