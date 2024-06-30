import React, { Component } from 'react';
import styles from './Footer.module.sass';
import TEXT_CONTANTS from '../../textConstanst';

class Footer extends Component {
  topFooterItemsRender = (item) => (
    <div key={item.title}>
      <h4>{item.title}</h4>
      {item.items.map(({ text, href }) => (
        <a key={text} href={href || 'https://google.com'}>
          {text}
        </a>
      ))}
    </div>
  );

  topFooterRender() {
    return TEXT_CONTANTS.FOOTER_ITEMS.map((item) =>
      this.topFooterItemsRender(item)
    );
  }

  render() {
    return (
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div>{this.topFooterRender()}</div>
        </div>
      </div>
    );
  }
}

export default Footer;
