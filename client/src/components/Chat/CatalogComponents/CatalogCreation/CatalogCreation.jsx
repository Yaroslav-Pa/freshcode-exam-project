import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import CONSTANTS from '../../../../constants';
import {
  changeTypeOfChatAdding,
  changeShowAddChatToCatalogMenu,
  getCatalogList,
} from '../../../../store/slices/chatSlice';
import styles from './CatalogCreation.module.sass';
import AddToCatalog from '../AddToCatalog/AddToCatalog';
import CreateCatalog from '../CreateCatalog/CreateCatalog';

const CatalogCreation = ({
  getCatalogList,
  changeTypeOfChatAdding,
  catalogCreationMode,
  changeShowAddChatToCatalogMenu,
  isFetching,
}) => {
  useEffect(() => {
    getCatalogList();
  }, [getCatalogList]);

  const { ADD_CHAT_TO_OLD_CATALOG, CREATE_NEW_CATALOG_AND_ADD_CHAT } =
    CONSTANTS;
  return (
    <>
      {!isFetching && (
        <div className={styles.catalogCreationContainer}>
          <i
            className="far fa-times-circle"
            onClick={() => changeShowAddChatToCatalogMenu()}
          />
          <div className={styles.buttonsContainer}>
            <button
              onClick={() => changeTypeOfChatAdding(ADD_CHAT_TO_OLD_CATALOG)}
              className={classNames(styles.button, {
                [styles.active]:
                  catalogCreationMode === ADD_CHAT_TO_OLD_CATALOG,
              })}
            >
              Old
            </button>
            <button
              onClick={() =>
                changeTypeOfChatAdding(CREATE_NEW_CATALOG_AND_ADD_CHAT)
              }
              className={classNames(styles.button, {
                [styles.active]:
                  catalogCreationMode === CREATE_NEW_CATALOG_AND_ADD_CHAT,
              })}
            >
              New
            </button>
          </div>
          <section className={styles.mainSection}>
            {catalogCreationMode === CREATE_NEW_CATALOG_AND_ADD_CHAT ? (
              <CreateCatalog />
            ) : (
              <AddToCatalog />
            )}
          </section>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  changeTypeOfChatAdding: (data) => dispatch(changeTypeOfChatAdding(data)),
  changeShowAddChatToCatalogMenu: () =>
    dispatch(changeShowAddChatToCatalogMenu()),
  getCatalogList: () => dispatch(getCatalogList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogCreation);
