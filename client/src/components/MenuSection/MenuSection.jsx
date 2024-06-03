import styles from './MenuSection.module.sass';
import CONSTANTS from '../../constants';
import classnames from 'classnames';

function MenuSection({ menuName, pagesList }) {
  const linkStyle = (index) =>
    classnames(styles.listForMenu, {
      [styles.last]: index === pagesList.length - 1,
    });

  return (
    <li>
      <h2 className={styles.listName}>{menuName.toUpperCase()}</h2>
      <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
      <ul>
        {pagesList.map(({ url, name }, index) => (
          <a href={url} className={styles.menuLink} key={name}>
            <li className={linkStyle(index)}>{name.toUpperCase()}</li>
          </a>
        ))}
      </ul>
    </li>
  );
}

export default MenuSection;
