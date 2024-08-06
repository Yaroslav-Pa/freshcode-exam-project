import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getCatalogList,
  removeChatFromCatalog,
} from '../../../../store/slices/chatSlice';
import CatalogList from '../CatalogList/CatalogList';
import DialogList from '../../DialogComponents/DialogList/DialogList';

const CatalogListContainer = ({
  getCatalogList,
  removeChatFromCatalogRedux,
  chatStore,
  userStore,
}) => {
  useEffect(() => {
    getCatalogList();
  }, [getCatalogList]);

  const removeChatFromCatalog = (event, chatId) => {
    const { _id } = chatStore.currentCatalog;
    const data = { chatId, catalogId: _id };
    removeChatFromCatalogRedux(data);
    event.stopPropagation();
  };

  const getDialogsPreview = () => {
    const { messagesPreview, currentCatalog } = chatStore;
    const { chats = [] } = currentCatalog;
    return messagesPreview.filter((message) => chats.includes(message._id));
  };

  const { catalogList, isShowChatsInCatalog } = chatStore;
  const { id } = userStore.data;
  return (
    <>
      {isShowChatsInCatalog ? (
        <DialogList
          userId={id}
          preview={getDialogsPreview()}
          removeChat={removeChatFromCatalog}
          isLonger={true}
        />
      ) : (
        <CatalogList catalogList={catalogList} />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { chatStore, userStore } = state;
  return { chatStore, userStore };
};

const mapDispatchToProps = (dispatch) => ({
  getCatalogList: (data) => dispatch(getCatalogList(data)),
  removeChatFromCatalogRedux: (data) => dispatch(removeChatFromCatalog(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogListContainer);
