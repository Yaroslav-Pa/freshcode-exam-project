import classNames from 'classnames';
import CONSTANTS from '../../../../../constants';
import CatalogListHeader from '../../../CatalogComponents/CatalogListHeader/CatalogListHeader';
import CatalogListContainer from '../../../CatalogComponents/CatalogListContainer/CatalogListContainer';
import DialogListContainer from '../../../DialogComponents/DialogListContainer/DialogListContainer';
import styles from './RenderDialogList.module.sass';

const RenderDialogList = ({ chatStore, setChatPreviewMode, id }) => {
  const { chatMode, isShowChatsInCatalog } = chatStore;
  const {
    NORMAL_PREVIEW_CHAT_MODE,
    FAVORITE_PREVIEW_CHAT_MODE,
    BLOCKED_PREVIEW_CHAT_MODE,
    CATALOG_PREVIEW_CHAT_MODE,
  } = CONSTANTS;
  return (
    <section className={styles.mainSection}>
      {isShowChatsInCatalog && <CatalogListHeader />}
      {!isShowChatsInCatalog && (
        <div className={styles.chatHeader}>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
        </div>
      )}
      {!isShowChatsInCatalog && (
        <div className={styles.buttonsContainer}>
          <button
            onClick={() => setChatPreviewMode(NORMAL_PREVIEW_CHAT_MODE)}
            className={classNames(styles.button, {
              [styles.activeButton]: chatMode === NORMAL_PREVIEW_CHAT_MODE,
            })}
          >
            All
          </button>
          <button
            onClick={() => setChatPreviewMode(FAVORITE_PREVIEW_CHAT_MODE)}
            className={classNames(styles.button, {
              [styles.activeButton]: chatMode === FAVORITE_PREVIEW_CHAT_MODE,
            })}
          >
            Favorite
          </button>
          <button
            onClick={() => setChatPreviewMode(BLOCKED_PREVIEW_CHAT_MODE)}
            className={classNames(styles.button, {
              [styles.activeButton]: chatMode === BLOCKED_PREVIEW_CHAT_MODE,
            })}
          >
            Blocked
          </button>
          <button
            onClick={() => setChatPreviewMode(CATALOG_PREVIEW_CHAT_MODE)}
            className={classNames(styles.button, {
              [styles.activeButton]: chatMode === CATALOG_PREVIEW_CHAT_MODE,
            })}
          >
            Catalogs
          </button>
        </div>
      )}
      {chatMode === CATALOG_PREVIEW_CHAT_MODE ? (
        <CatalogListContainer />
      ) : (
        <DialogListContainer userId={id} />
      )}
    </section>
  );
};

export default RenderDialogList;
