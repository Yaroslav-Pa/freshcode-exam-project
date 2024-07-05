import React from 'react';
import styles from './Footer.module.sass';
import TEXT_CONTANTS from '../../textConstanst';

function Footer() {
  const topFooterItemsRender = (item) => (
    <div key={item.title}>
      <h4>{item.title}</h4>
      {item.items.map(({ text, href }) => (
        <a key={text} href={href || 'https://google.com'}>
          {text}
        </a>
      ))}
    </div>
  );

  const topFooterRender = () => {
    return TEXT_CONTANTS.FOOTER_ITEMS.map((item) => topFooterItemsRender(item));
  };

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerTop}>
        <div>{topFooterRender()}</div>
      </div>
    </div>
  );
}

export default Footer;
