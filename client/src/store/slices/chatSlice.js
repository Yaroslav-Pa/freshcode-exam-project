import { createSlice } from '@reduxjs/toolkit';
import { isEqual, remove } from 'lodash';
import * as restController from '../../api/rest/restController';
import CONSTANTS from '../../constants';
import {
  decorateAsyncThunk,
  createExtraReducers,
  rejectedReducer,
} from '../../utils/store';

const CHAT_SLICE_NAME = 'chat';

const initialState = {
  isFetching: true,
  addChatId: null,
  isShowCatalogCreation: false,
  currentCatalog: null,
  chatData: null,
  messages: [],
  error: null,
  isExpanded: false,
  interlocutor: [],
  messagesPreview: [],
  isShow: false,
  chatMode: CONSTANTS.NORMAL_PREVIEW_CHAT_MODE,
  catalogList: [],
  isRenameCatalog: false,
  isShowChatsInCatalog: false,
  catalogCreationMode: CONSTANTS.ADD_CHAT_TO_OLD_CATALOG,
  isNewMessages: false,
};

//---------- getPreviewChat
export const getPreviewChat = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/getPreviewChat`,
  thunk: async () => {
    const { data } = await restController.getPreviewChat();
    return data;
  },
});

const getPreviewChatExtraReducers = createExtraReducers({
  thunk: getPreviewChat,
  fulfilledReducer: (state, { payload }) => {
    const existingPreviewMap = new Map();
    state.messagesPreview.forEach((preview) => {
      existingPreviewMap.set(preview._id, preview);
    });
    const updatedPreviews = payload.map((newPreview) => {
      const existingPreview = existingPreviewMap.get(newPreview._id);
      return {
        ...newPreview,
        isNewMessage: existingPreview ? existingPreview.isNewMessage : false,
      };
    });
    state.messagesPreview = updatedPreviews;
    state.error = null;
  },
  rejectedReducer: (state, { payload }) => {
    state.error = payload;
    state.messagesPreview = [];
  },
});

//---------- getDialogMessages
export const getDialogMessages = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/getDialogMessages`,
  thunk: async (payload) => {
    const { data } = await restController.getDialog(payload);
    return data;
  },
});

const getDialogMessagesExtraReducers = createExtraReducers({
  thunk: getDialogMessages,
  fulfilledReducer: (state, { payload }) => {
    state.messages = payload.messages;
    state.interlocutor = payload.interlocutor;
  },
  rejectedReducer: (state, { payload }) => {
    state.messages = [];
    state.interlocutor = null;
    state.error = payload;
  },
});

//---------- sendMessage
export const sendMessage = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/sendMessage`,
  thunk: async (payload) => {
    const { data } = await restController.newMessage(payload);
    return data;
  },
});

const sendMessageExtraReducers = createExtraReducers({
  thunk: sendMessage,
  fulfilledReducer: (state, { payload }) => {
    const { messagesPreview } = state;
    let isNew = true;
    messagesPreview.forEach((preview) => {
      if (isEqual(preview.participants, payload.message.participants)) {
        preview.text = payload.message.body;
        preview.sender = payload.message.sender;
        preview.createAt = payload.message.createdAt;
        isNew = false;
      }
    });
    if (isNew) {
      messagesPreview.push(payload.preview);
    }
    const chatData = {
      _id: payload.preview._id,
      participants: payload.preview.participants,
      favoriteList: payload.preview.favoriteList,
      blackList: payload.preview.blackList,
    };
    state.chatData = { ...state.chatData, ...chatData };
    state.messagesPreview = messagesPreview;
    state.messages = [...state.messages, payload.message]; ////
  },
  rejectedReducer: (state, { payload }) => {
    state.error = payload;
  },
});

//---------- changeChatFavorite
export const changeChatFavorite = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/changeChatFavorite`,
  thunk: async (payload) => {
    const { data } = await restController.changeChatFavorite(payload);
    return data;
  },
});

const changeChatFavoriteExtraReducers = createExtraReducers({
  thunk: changeChatFavorite,
  fulfilledReducer: (state, { payload }) => {
    const { messagesPreview } = state;
    const { conversation, interlocutor } = payload;
    messagesPreview.forEach((preview) => {
      if (isEqual(preview.participants, conversation.participants))
        preview.favoriteList = conversation.favoriteList;
    });
    state.chatData = conversation;
    state.interlocutor = interlocutor;
    state.messagesPreview = messagesPreview;
  },
  rejectedReducer: (state, { payload }) => {
    state.error = payload;
  },
});

//---------- changeChatBlock
export const changeChatBlock = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/changeChatBlock`,
  thunk: async (payload) => {
    const { data } = await restController.changeChatBlock(payload);
    return data;
  },
});

const changeChatBlockExtraReducers = createExtraReducers({
  thunk: changeChatBlock,
  fulfilledReducer: (state, { payload }) => {
    const { messagesPreview } = state;
    const { conversation, interlocutor } = payload;
    messagesPreview.forEach((preview) => {
      if (isEqual(preview.participants, conversation.participants))
        preview.blackList = conversation.blackList;
    });
    state.chatData = conversation;
    state.interlocutor = interlocutor;
    state.messagesPreview = messagesPreview;
  },
  rejectedReducer: (state, { payload }) => {
    state.error = payload;
  },
});

//---------- getCatalogList
export const getCatalogList = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/getCatalogList`,
  thunk: async (payload) => {
    const { data } = await restController.getCatalogList(payload);
    return data;
  },
});

const getCatalogListExtraReducers = createExtraReducers({
  thunk: getCatalogList,
  fulfilledReducer: (state, { payload }) => {
    state.isFetching = false;
    state.catalogList = [...payload];
  },
  rejectedReducer,
});

//---------- addChatToCatalog
export const addChatToCatalog = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/addChatToCatalog`,
  thunk: async (payload) => {
    const { data } = await restController.addChatToCatalog(payload);
    return data;
  },
});

const addChatToCatalogExtraReducers = createExtraReducers({
  thunk: addChatToCatalog,
  fulfilledReducer: (state, { payload }) => {
    const { catalogList } = state;
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i]._id === payload._id) {
        catalogList[i].chats = payload.chats;
        break;
      }
    }
    state.isShowCatalogCreation = false;
    state.catalogList = [...catalogList];
  },
  rejectedReducer: (state, { payload }) => {
    state.error = payload;
    state.isShowCatalogCreation = false;
  },
});

//---------- createCatalog
export const createCatalog = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/createCatalog`,
  thunk: async (payload) => {
    const { data } = await restController.createCatalog(payload);
    return data;
  },
});

const createCatalogExtraReducers = createExtraReducers({
  thunk: createCatalog,
  fulfilledReducer: (state, { payload }) => {
    state.catalogList = [...state.catalogList, payload];
    state.isShowCatalogCreation = false;
  },
  rejectedReducer: (state, { payload }) => {
    state.isShowCatalogCreation = false;
    state.error = payload;
  },
});

//---------- deleteCatalog
export const deleteCatalog = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/deleteCatalog`,
  thunk: async (payload) => {
    await restController.deleteCatalog(payload);
    return payload;
  },
});

const deleteCatalogExtraReducers = createExtraReducers({
  thunk: deleteCatalog,
  fulfilledReducer: (state, { payload }) => {
    const { catalogList } = state;
    const newCatalogList = remove(
      catalogList,
      (catalog) => payload.catalogId !== catalog._id
    );
    state.catalogList = [...newCatalogList];
  },
  rejectedReducer: (state, { payload }) => {
    state.error = payload;
  },
});

//---------- removeChatFromCatalog
export const removeChatFromCatalog = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/removeChatFromCatalog`,
  thunk: async (payload) => {
    const { data } = await restController.removeChatFromCatalog(payload);
    return data;
  },
});

const removeChatFromCatalogExtraReducers = createExtraReducers({
  thunk: removeChatFromCatalog,
  fulfilledReducer: (state, { payload }) => {
    const { catalogList } = state;
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i]._id === payload._id) {
        catalogList[i].chats = payload.chats;
        break;
      }
    }
    state.currentCatalog = payload;
    state.catalogList = [...catalogList];
  },
  rejectedReducer: (state, { payload }) => {
    state.error = payload;
  },
});

//---------- changeCatalogName
export const changeCatalogName = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/changeCatalogName`,
  thunk: async (payload) => {
    const { data } = await restController.changeCatalogName(payload);
    return data;
  },
});

const changeCatalogNameExtraReducers = createExtraReducers({
  thunk: changeCatalogName,
  fulfilledReducer: (state, { payload }) => {
    const { catalogList } = state;
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i]._id === payload._id) {
        catalogList[i].catalogName = payload.catalogName;
        break;
      }
    }
    state.catalogList = [...catalogList];
    state.currentCatalog = payload;
    state.isRenameCatalog = false;
  },
  rejectedReducer: (state) => {
    state.isRenameCatalog = false;
  },
});
//-------------------------------------------------------

const reducers = {
  changeBlockStatusInStore: (state, { payload }) => {
    const { messagesPreview } = state;
    messagesPreview.forEach((preview) => {
      if (isEqual(preview.participants, payload.participants))
        preview.blackList = payload.blackList;
    });
    state.messagesPreview = messagesPreview;

    if (isEqual(payload?.participants, state.chatData?.participants))
      state.chatData = payload;
  },

  addMessage: (state, { payload }) => {
    const { message, preview, userId } = payload;
    const { messagesPreview } = state;
    const isInCurrentChat = isEqual(
      state.chatData?.participants,
      payload.message?.participants
    );
    let isNew = true;
    messagesPreview.forEach((preview) => {
      if (isEqual(preview.participants, message.participants)) {
        preview.text = message.body;
        preview.sender = message.sender;
        preview.createAt = message.createdAt;
        if (!state.isExpanded || !isInCurrentChat) preview.isNewMessage = true;
        isNew = false;
      }
    });
    if (isNew) {
      messagesPreview.push({ ...preview, isNewMessage: true });
    }
    if (!state.isExpanded || !isInCurrentChat) state.isNewMessages = true;
    state.messagesPreview = messagesPreview;
    if (isInCurrentChat && payload.message.sender !== userId)
      state.messages = [...state.messages, payload.message];
  },

  backToDialogList: (state) => {
    state.isExpanded = false;
  },

  goToExpandedDialog: (state, { payload }) => {
    state.isShow = true;
    state.isExpanded = true;
    if (
      payload.conversationData &&
      state.chatData?._id === payload.conversationData._id
    ) {
      return state;
    }
    state.interlocutor = { ...state.interlocutor, ...payload.interlocutor };
    state.chatData = payload.conversationData;
    state.messages = [];
  },

  clearMessageList: (state) => {
    state.messages = [];
  },

  changeChatShow: (state) => {
    state.isShowCatalogCreation = false;
    state.isShow = !state.isShow;
    if (!state.isShow) {
      state.isExpanded = false;
    }
  },

  setPreviewChatMode: (state, { payload }) => {
    state.chatMode = payload;
  },

  changeShowModeCatalog: (state, { payload }) => {
    state.currentCatalog = { ...state.currentCatalog, ...payload };
    state.isShowChatsInCatalog = !state.isShowChatsInCatalog;
    state.isRenameCatalog = false;
  },

  changeTypeOfChatAdding: (state, { payload }) => {
    state.catalogCreationMode = payload;
  },

  changeShowAddChatToCatalogMenu: (state, { payload }) => {
    state.addChatId = payload;
    state.isShowCatalogCreation = !state.isShowCatalogCreation;
  },

  changeRenameCatalogMode: (state) => {
    state.isRenameCatalog = !state.isRenameCatalog;
  },

  clearChatError: (state) => {
    state.error = null;
  },
  clearChatDataToInitial: (state) => {
    return initialState;
  },
  setNewMessageOff: (state, { payload }) => {
    let newMessagesCount = 0;
    state.messagesPreview.forEach((preview) => {
      if (preview._id === payload) {
        preview.isNewMessage = false;
      } else if (preview.isNewMessage === true) {
        newMessagesCount++;
      }
    });
    if (newMessagesCount === 0) {
      state.isNewMessages = false;
    }
  },
};

const extraReducers = (builder) => {
  getPreviewChatExtraReducers(builder);
  getDialogMessagesExtraReducers(builder);
  sendMessageExtraReducers(builder);
  changeChatFavoriteExtraReducers(builder);
  changeChatBlockExtraReducers(builder);
  getCatalogListExtraReducers(builder);
  addChatToCatalogExtraReducers(builder);
  createCatalogExtraReducers(builder);
  deleteCatalogExtraReducers(builder);
  removeChatFromCatalogExtraReducers(builder);
  changeCatalogNameExtraReducers(builder);
};

const chatSlice = createSlice({
  name: CHAT_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = chatSlice;

export const {
  changeBlockStatusInStore,
  addMessage,
  backToDialogList,
  goToExpandedDialog,
  clearMessageList,
  changeChatShow,
  setPreviewChatMode,
  changeShowModeCatalog,
  changeTypeOfChatAdding,
  changeShowAddChatToCatalogMenu,
  changeRenameCatalogMode,
  clearChatError,
  clearChatDataToInitial,
  setNewMessageOff,
} = actions;

export default reducer;
