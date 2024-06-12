import http from '../interceptor';

//? User

export const getUser = () => http.get('user/');
export const registerRequest = (data) => http.post('user/registration', data);
export const loginRequest = (data) => http.post('user/login', data);
export const updateUser = (data) => http.put('user/update', data);
export const payment = ({ formData }) => http.post('user/pay', formData);
export const cashOut = (data) => http.post('user/cashout', data);

export const changeMark = ({ creatorId, offerId, ...restData }) =>
  http.post(`user/${creatorId}/offers/${offerId}/changeMark`, restData);

//? Transaction History

export const getTransactionHistory = () => http.get(`user/transactionHistory/`);

//? Contests

export const getCustomerContests = ({ limit, offset, contestStatus }) =>
  http.get('contests/customers', {
    params: {
      limit,
      offset,
      status: contestStatus,
    },
  });

export const getActiveContests = (data) =>
  http.get('contests/', { params: { ...data } });

export const getContestById = ({ contestId }) =>
  http.get(`contests/${contestId}`);

export const updateContest = (data) =>
  http.put(`contests/${data.get('contestId')}`, data);

export const downloadContestFile = ({ fileName }) =>
  http.get(`contests/file/${fileName}`);

export const dataForContest = (data) =>
  http.get('contests/data', {
    params: {
      ...data,
    },
  });

//? Offers

export const setNewOffer = (data) =>
  http.post(`contests/${data.get('contestId')}/offers/`, data);

export const setOfferStatus = ({ contestId, offerId, ...restData }) =>
  http.put(`contests/${contestId}/offers/${offerId}`, restData);

//? Chats

export const getPreviewChat = () => http.get('/chats/');
export const getDialog = ({ interlocutorId, ...restData }) =>
  http.get(`/chats/interlocutor/${interlocutorId}`, restData);
export const newMessage = ({ recipient, ...restData }) =>
  http.post(`/chats/interlocutor/${recipient}`, restData);

export const changeChatFavorite = (data) => http.put('/chats/favorite', data);
export const changeChatBlock = (data) => http.put('/chats/blackList', data);

export const addChatToCatalog = ({ chatId, ...restData }) =>
  http.post(`/chats/${chatId}`, restData);
export const removeChatFromCatalog = ({ chatId, ...restData }) =>
  http.delete(`/chats/${chatId}`, {
    params: {
      ...restData,
    },
  });

//? Catalogs

export const getCatalogList = (data) => http.get('/chats/catalogs/', data);
export const createCatalog = (data) => http.post('/chats/catalogs/', data);
export const changeCatalogName = ({ catalogId, ...restData }) =>
  http.put(`/chats/catalogs/${catalogId}`, restData);
export const deleteCatalog = ({ catalogId }) =>
  http.delete(`/chats/catalogs/${catalogId}`);
