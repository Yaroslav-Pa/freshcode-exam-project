import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './CreateEventCollapsible.module.sass';

function CreateEventCollapsible({ children, numbOfErrorField = 0, ErrorFieldHeight = 0  }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  const containerClassname = classNames(styles.container, {
    [styles.active]: isOpen,
  });
  const collapsibleClassname = classNames(styles.collapsible, {
    [styles.activeCollapsible]: isOpen,
  });

  return (
    <div className={containerClassname}>
      <button className={collapsibleClassname} onClick={toggleCollapsible}>
        Create new event
      </button>
      <div
        className={styles.content}
        style={{
          maxHeight: isOpen
            ? `${contentRef.current.scrollHeight + numbOfErrorField * ErrorFieldHeight}px`
            : '0px',
        }}
        ref={contentRef}
      >
        <div className={styles.activeContent}>{children}</div>
      </div>
    </div>
  );
}

export default CreateEventCollapsible;
