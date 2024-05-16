import http from '../interceptor';

export const registerRequest = (data) => http.post('registration', data);
export const loginRequest = (data) => http.post('login', data);
export const getUser = () => http.post('getUser');
export const setNewOffer = (data) => http.post('setNewOffer', data);
export const setOfferStatus = (data) => http.post('setOfferStatus', data);
export const downloadContestFile = (data) =>
  http.get(`downloadFile/${data.fileName}`);
export const payMent = (data) => http.post('pay', data.formData);
export const changeMark = (data) => http.post('changeMark', data);
export const getPreviewChat = () => http.post('getPreview');
export const getDialog = (data) => http.post('getChat', data);
export const dataForContest = (data) => http.post('dataForContest', data);
export const cashOut = (data) => http.post('cashout', data);
export const updateUser = (data) => http.post('updateUser', data);
export const newMessage = (data) => http.post('newMessage', data);
export const changeChatFavorite = (data) => http.post('favorite', data);
export const changeChatBlock = (data) => http.post('blackList', data);
export const getCatalogList = (data) => http.post('getCatalogs', data);
export const addChatToCatalog = (data) =>
  http.post('addNewChatToCatalog', data);
export const createCatalog = (data) => http.post('createCatalog', data);
export const deleteCatalog = (data) => http.post('deleteCatalog', data);
export const removeChatFromCatalog = (data) =>
  http.post('removeChatFromCatalog', data);
export const changeCatalogName = (data) => http.post('updateNameCatalog', data);

//* вище нічого не змінював

export const getCustomerContests = (data) =>
  http.get(
    'contests/customers',
    {
      params: {
        limit: data.limit,
        offset: data.offset,
      },
      headers: {
        status: data.contestStatus,
      },
    }
  );

  //неПрацює-*
export const getActiveContests = (data) => http.post('contests/', data);

export const getContestById = (data) => http.get(`contests/${data.contestId}`);

//неПрацює
export const updateContest = (data) => http.put(`contests/${data.contestId}`, data);
