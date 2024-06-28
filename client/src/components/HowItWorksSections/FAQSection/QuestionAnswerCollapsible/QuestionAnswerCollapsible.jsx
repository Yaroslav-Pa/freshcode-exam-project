import classNames from 'classnames';
import { useRef, useState } from 'react';
import styles from './QuestionAnswerCollapsible.module.sass';
function QuestionAnswerCollapsible({ question, answer }) {
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
        {question}
      </button>
      <div
        className={styles.content}
        style={{
          maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : '0px',
        }}
        ref={contentRef}
      >
        <p className={styles.activeContent} dangerouslySetInnerHTML={{ __html: answer }}/>
      </div>
    </div>
  );
}

export default QuestionAnswerCollapsible;
