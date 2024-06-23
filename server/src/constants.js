const path = require('path');

module.exports = {
  EMAIL: { user: 'mailsquadhelp@gmail.com', pass: '1ovtv iapm fagi exnc' },
  LOGGER_FILENAME: 'errors.log',
  ARCHIVE_DIR: 'logs/archive',
  LOGGER_DIR: 'logs',
  OFFER_STATUS: {
    REVIEW: 'onReview',
    FAIL_REVIEW: 'reviewFail',
    PENDING: 'pending',
    RESOLVE: 'won',
    REJECTED: 'rejected',
  },
  START_USERS: [
    { ID: 125555, EMAIL: 'buy@gmail.com' },
    { ID: 225556, EMAIL: 'create@gmail.com' },
    { ID: 325557, EMAIL: 'moderator@gmail.com' },
  ],
  TRANSACTION_INCOME: 'INCOME',
  TRANSACTION_CONSUMPTION: 'CONSUMPTION',
  JWT_SECRET: 'asdasdasd4as5d4as8d7a8sd4as65d4a8sd7asd4as56d4',
  ACCESS_TOKEN_TIME: 60 * 60,
  SALT_ROUNDS: 5,
  SQUADHELP_BANK_NUMBER: '4564654564564564',
  SQUADHELP_BANK_NAME: 'SquadHelp',
  SQUADHELP_BANK_CVC: '453',
  SQUADHELP_BANK_EXPIRY: '11/26',
  MODERATOR: 'moderator',
  CUSTOMER: 'customer',
  CREATOR: 'creator',
  CREATOR_ENTRIES: 'creator_entries',
  CONTEST_STATUS_ACTIVE: 'active',
  CONTEST_STATUS_FINISHED: 'finished',
  CONTEST_STATUS_PENDING: 'pending',
  CONTESTS_DEFAULT_DIR: 'public/contests/',
  NAME_CONTEST: 'name',
  LOGO_CONTEST: 'logo',
  TAGLINE_CONTEST: 'tagline',
  OFFER_STATUS_PENDING: 'pending',
  OFFER_STATUS_REJECTED: 'rejected',
  OFFER_STATUS_WON: 'won',
  DEV_FILES_PATH: path.resolve(__dirname, '..', 'public'),
  PROD_FILES_PATH: '/var/www/html',
  SOCKET_CONNECTION: 'connection',
  SOCKET_SUBSCRIBE: 'subscribe',
  SOCKET_UNSUBSCRIBE: 'unsubscribe',
  NOTIFICATION_ENTRY_CREATED: 'onEntryCreated',
  NOTIFICATION_CHANGE_MARK: 'changeMark',
  NOTIFICATION_CHANGE_OFFER_STATUS: 'changeOfferStatus',
  NEW_MESSAGE: 'newMessage',
  CHANGE_BLOCK_STATUS: 'CHANGE_BLOCK_STATUS',
};
