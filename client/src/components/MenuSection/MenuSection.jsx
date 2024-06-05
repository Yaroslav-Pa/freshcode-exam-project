import styles from './MenuSection.module.sass';
import CONSTANTS from '../../constants';
import classnames from 'classnames';

function MenuSection({ menuName, pagesList, role = null }) {
  const linkStyle = (index) =>
    classnames(styles.menuLinkText, {
      [styles.last]: index === pagesList.length - 1,
    });
  const menuListStyle = classnames(styles.menuList, {
    [styles.menuListToLeft]: !role || role !== CONSTANTS.CUSTOMER,
  });

  return (
    <li className={styles.navItem}>
      <section className={styles.listNameContainer}>
        <h2 className={styles.listName}>{menuName.toUpperCase()}</h2>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
      </section>
      <ul className={menuListStyle}>
        {pagesList.map(({ url, name }, index) => (
          <a href={url} className={styles.menuLink} key={name + url}>
            <p className={linkStyle(index)}>{name.toUpperCase()}</p>
          </a>
        ))}
      </ul>
    </li>
  );
}

export default MenuSection;
