import styles from './MenuSection.module.sass';
import CONSTANTS from '../../constants';
import classnames from 'classnames';
import InnerOrOuterLink from '../InnerOrOuterLink/InnerOrOuterLink';

function MenuSection({ menuName, pagesList, role = null }) {
  const linkStyle = (index) =>
    classnames(styles.menuLinkText, {
      [styles.last]: index === pagesList.length - 1,
    });
  const menuListStyle = classnames(styles.menuList, {
    [styles.menuListToLeft]: !role || role !== CONSTANTS.CUSTOMER,
  });

  const listLinks = pagesList.map((data, index) => (
    <InnerOrOuterLink
      {...data}
      linkStyle={linkStyle}
      index={index}
      key={data.text + data.url}
    />
  ));

  return (
    <li className={styles.navItem}>
      <section className={styles.listNameContainer}>
        <h2 className={styles.listName}>{menuName.toUpperCase()}</h2>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
      </section>
      <ul className={menuListStyle}>{listLinks}</ul>
    </li>
  );
}

export default MenuSection;
