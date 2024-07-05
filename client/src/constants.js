const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const serverPort = 5000;

const CONSTANTS = {
  EVENTS_TOKEN: 'userEvents',
  CONTEST_VENTURE_REQUIRED: ['tagline', 'logo'],
  TELEPHONE: '(877) 355-3585',
  TIMEZONE: Intl.DateTimeFormat().resolvedOptions().timeZone,
  UNAVAILABLE_PAGES_MODERATOR: ['/dashboard'],
  MODERATOR: 'moderator',
  CUSTOMER: 'customer',
  CREATOR: 'creator',
  CONTEST_STATUS_ACTIVE: 'active',
  CONTEST_STATUS_FINISHED: 'finished',
  CONTEST_STATUS_PENDING: 'pending',
  NAME_CONTEST: 'name',
  LOGO_CONTEST: 'logo',
  TAGLINE_CONTEST: 'tagline',
  OFFER_STATUS_REVIEW: 'onReview',
  OFFER_STATUS_FAIL_REVIEW: 'reviewFail',
  OFFER_STATUS_REJECTED: 'rejected',
  OFFER_STATUS_WON: 'won',
  OFFER_STATUS_PENDING: 'pending',
  STATIC_IMAGES_PATH: '/staticImages/',
  ANONYM_IMAGE_PATH: '/staticImages/anonym.png',
  BASE_URL: `http://${serverIP}:${serverPort}/`,
  ACCESS_TOKEN: 'accessToken',
  PUBLIC_IMAGES_URL:
    env === 'production'
      ? `http://${serverIP}:80/images/`
      : `http://${serverIP}:${serverPort}/public/images/`,
  PUBLIC_CONTESTS_URL:
    env === 'production'
      ? `http://${serverIP}:80/contests/`
      : `http://${serverIP}:${serverPort}/public/contests/`,
  NORMAL_PREVIEW_CHAT_MODE: 'NORMAL_PREVIEW_CHAT_MODE',
  FAVORITE_PREVIEW_CHAT_MODE: 'FAVORITE_PREVIEW_CHAT_MODE',
  BLOCKED_PREVIEW_CHAT_MODE: 'BLOCKED_PREVIEW_CHAT_MODE',
  CATALOG_PREVIEW_CHAT_MODE: 'CATALOG_PREVIEW_CHAT_MODE',
  CHANGE_BLOCK_STATUS: 'CHANGE_BLOCK_STATUS',
  ADD_CHAT_TO_OLD_CATALOG: 'ADD_CHAT_TO_OLD_CATALOG',
  CREATE_NEW_CATALOG_AND_ADD_CHAT: 'CREATE_NEW_CATALOG_AND_ADD_CHAT',
  USER_INFO_MODE: 'USER_INFO_MODE',
  CASHOUT_MODE: 'CASHOUT_MODE',
  TRANSACTION_HISTORY_MODE: 'TRANSACTION_HISTORY_MODE',
  AUTH_MODE: {
    REGISTER: 'REGISTER',
    LOGIN: 'LOGIN',
  },
  NAMING_CONTESTS_IMAGE_PATH: '/staticImages/howItWorks/icon-trophy.svg',
  HERO_SECTION_IMAGE_PATH: '/staticImages/howItWorks/app-user.svg',
  BUTTON_GROUP_START_VALUE: 'yesMinorValidations',
  USER_INFO_TO_CHANGE: [
    { label: 'First Name', name: 'firstName' },
    { label: 'Last Name', name: 'lastName' },
    { label: 'Display Name', name: 'displayName' },
  ],
  MAX_LENGTH: {
    EVENT_INPUT: 100,
    USER_INPUTS: 20,
    USER_EMAIL: 30,
    CONTEST_TITLE: 50,
    OTHER: 255,
  },
  TOKEN_ERROR: {
    DATA: 'token error',
    STATUS: 408,
  },
  PUBLIC_LOCATIONS: ['/', '/events', '/login', '/registration', '/howItWorks'],
};

export default CONSTANTS;
