const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const serverPort = 5000;
export default {
  CONTEST_VENTURE_REQUIRED:['tagline', 'logo'],
  TELEPHONE: '(877) 355-3585',
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
  USER_INFO_LINK_LIST: [
    { text: 'View Dashboard', url: '/dashboard' },
    { text: 'My Account', url: '/account' },
    { text: 'Messages', url: '#' },
    { text: 'Affiliate Dashboard', url: '#' },
  ],
  SECTION_LIST: [
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
        { name: 'crowded bar theory', url: 'http://www.google.com' },
        { name: 'all articles', url: 'http://www.google.com' },
      ],
    },
  ],
  REGISTRATION_FAQ_SPLIT_INDEX: 2,
  REGISTRATION_FAQ:[
    {
      theme: 'Why should I use Squadhelp?',
      text: 'You always have an option of hiring a consultant or coming up with the name yourself. However, Squadhelp builds great brands that succeed faster by connecting you with the most creative people across the globe. Most importantly, Squadhelp provides you with choice: you get to see ideas from dozens (in some cases, hundreds) of contestants before you select a winner. Typically, you wouldspend far less money with Squadhelp (our contests start at $199) than hiring an agency. Also, you will receive immediate results - most contests begin receiving submissions within minutes of starting.',
    },
    {
      theme: 'How is Squadhelp Different?',
      text: ' Since 2011, we have been committed to disrupting the traditional agency model. Our platform offers much more than a typical crowdsourcing experience. From Machine Learning to Audience Testing to Comprehensive Trademark Validation, you receive best-in-class support for your branding projects. Breadth: Our Contest-Based Crowdsourcing approach allows you to receive an unmatched breadth of name ideas from dozens of unique, creative minds while working with the worlds largest branding community. Quality and Collaboration: Using an advanced Quality Scoring Algorithm, we ensure that you receive more ideas from our top-quality creatives, and we use Gamification best practices to encourage high-quality brainstorming and two-way communication throughout your contest. We don’t stop at ideation: Choose your name with confidence through our high-end validation services. Poll your target demographics to get unbiased feedback on your favorite names, and receive Trademark Risk and Linguistics Analysis Reports developed by a Licensed Trademark Attorney.',
    },
    {
      theme: 'I’ve never used Squadhelp before. What should I expect?',
      text: 'Most customers tell us that Squadhelp`s process is effective, easy, fast, and even fun. We constantly hear extremely positive feedback with respect to the breadth of ideas submitted to each contest, and many customers are surprised at how insightful working with dozens of creative individuals from across the globe can be.',
    },
    {
      theme: 'How much does it cost?',
      text: 'Our naming competitions start at $199, and our logo design competitions start at $299. Also, there are three additional contest level that each offer more features and benefits. See our Pricing Page for details.',
    },
    {
      theme: 'Do you offer any discount for multiple contests?',
      text: 'Yes! We have many contest bundles - our most popular being our Name, Tagline, and Logo bundle. Bundles allow you to purchase multiple contests at one time and save as much as from $75 - $400. You can learn more about our bundle options on our Pricing Page.',
    },
    {
      theme: 'Will you help me validate my name?',
      text: 'Yes! We believe that validating and securing your name is a critical part of your branding process. Squadhelp offers domain checks, Trademark support, linguistics analysis, and professional audience testing to help you choose your name with confidence. We even have special prices for Trademark filing for our customers.',
    },
    {
      theme: 'I have other questions! How can I get in touch with Squadhelp?',
      text: 'Check out our FAQs or send us a message. For assistance with launching a contest, you can also call us at (877) 355-3585 or schedule a Branding Consultation',
    },
  ],
};
