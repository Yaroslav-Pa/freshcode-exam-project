const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const serverPort = 5000;
export default {
  TIMEZONE: Intl.DateTimeFormat().resolvedOptions().timeZone,
  CUSTOMER: 'customer',
  CREATOR: 'creator',
  CONTEST_STATUS_ACTIVE: 'active',
  CONTEST_STATUS_FINISHED: 'finished',
  CONTEST_STATUS_PENDING: 'pending',
  NAME_CONTEST: 'name',
  LOGO_CONTEST: 'logo',
  TAGLINE_CONTEST: 'tagline',
  OFFER_STATUS_REJECTED: 'rejected',
  OFFER_STATUS_WON: 'won',
  OFFER_STATUS_PENDING: 'pending',
  STATIC_IMAGES_PATH: '/staticImages/',
  ANONYM_IMAGE_PATH: '/staticImages/anonym.png',
  BASE_URL: `http://${serverIP}:${serverPort}/`,
  ACCESS_TOKEN: 'accessToken',
  publicImagesURL:
    env === 'production'
      ? `http://${serverIP}:80/images/`
      : `http://${serverIP}:${serverPort}/public/images/`,
  publicContestsURL:
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
  HEADER_ANIMATION_TEXT: [
    'a Company',
    'a Brand',
    'a Website',
    'a Service',
    'a Book',
    'a Business',
    'an App',
    'a Product',
    'a Startup',
  ],
  FooterItems: [
    {
      title: 'SQUADHELP',
      items: ['About', 'Contact', 'How It Works?', 'Testimonials', 'Our Work'],
    },
    {
      title: 'RESOURCES',
      items: [
        'How It Works',
        'Become a Creative',
        'Business Name Generator',
        'Discussion Forum',
        'Blog',
        'Download eBook',
        'Pricing',
        'Help & FAQs',
      ],
    },
    {
      title: 'OUR SERVICES',
      items: [
        'Naming',
        'Logo Design',
        'Taglines',
        'Premium Names For Sale',
        'Creative Owned Names For Sale',
        'Audience Testing',
        'Trademark Research & Filling',
        'Managed Agency Service',
      ],
    },
    {
      title: 'LEGAL',
      items: ['Terms of Service', 'Privacy Policy', 'Cookie Policy'],
    },
  ],
  SECTION_LIST : [
    {
      menuName: 'Name ideas',
      list: [
        { name: 'Beauty', url: 'http://www.google.com' },
        { name: 'Consulting', url: 'http://www.google.com' },
        { name: 'E-Commerce', url: 'http://www.google.com' },
        { name: 'Fashion & Clothing', url: 'http://www.google.com' },
        { name: 'Finance', url: 'http://www.google.com' },
        { name: 'Real Estate', url: 'http://www.google.com' },
        { name: 'Tech', url: 'http://www.google.com' },
        { name: 'More Categories', url: 'http://www.google.com' },
      ],
    },
    {
      menuName: 'CONTESTS',
      list: [
        { name: 'How it works', url: 'http://www.google.com' },
        { name: 'Pricing', url: 'http://www.google.com' },
        { name: 'Agency service', url: 'http://www.google.com' },
        { name: 'Active contests', url: 'http://www.google.com' },
        { name: 'Winners', url: 'http://www.google.com' },
        { name: 'Leaderboard', url: 'http://www.google.com' },
        { name: 'Become a creative', url: 'http://www.google.com' },
      ],
    },
    {
      menuName: 'Our Work',
      list: [
        { name: 'names', url: 'http://www.google.com' },
        { name: 'taglines', url: 'http://www.google.com' },
        { name: 'logos', url: 'http://www.google.com' },
        { name: 'testimonials', url: 'http://www.google.com' },
      ],
    },
    {
      menuName: 'Names For Sale',
      list: [
        { name: 'popular names', url: 'http://www.google.com' },
        { name: 'short names', url: 'http://www.google.com' },
        { name: 'intriguing names', url: 'http://www.google.com' },
        { name: 'names by category', url: 'http://www.google.com' },
        { name: 'visual name search', url: 'http://www.google.com' },
        { name: 'sell your domains', url: 'http://www.google.com' },
      ],
    },
    {
      menuName: 'Blog',
      list: [
        { name: 'ultimate naming guide', url: 'http://www.google.com' },
        {
          name: 'poetic devices in business naming',
          url: 'http://www.google.com',
        },
        { name: 'ultimate naming guide', url: 'http://www.google.com' },
        { name: 'crowded bar theory', url: 'http://www.google.com' },
        { name: 'all articles', url: 'http://www.google.com' },
      ],
    },
  ]
};
