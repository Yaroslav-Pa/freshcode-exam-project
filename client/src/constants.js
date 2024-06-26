const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const serverPort = 5000;

const CONSTANTS = {
  BUTTON_GROUP_START_VALUE: 'yesMinorValidations',
  BUTTON_GROUP: [
    {
      value: 'yesMinorValidations',
      answer: 'Yes',
      details: 'But minor validations are allowed',
      isRecommended: true,
    },
    {
      value: 'yesExactly',
      answer: 'Yes',
      details: 'The Domain should exactly match the name',
    },
    {
      value: 'noOnlyName',
      answer: 'No',
      details: 'I am only looking for a name, not a Domain',
    },
  ],
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
        { name: 'How it works', url: '/howItWorks', isInnerLink: true },
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
  REGISTRATION_FAQ: [
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
  NAMING_CONTESTS_IMAGE_PATH: '/staticImages/howItWorks/icon-trophy.svg',
  HERO_SECTION_IMAGE_PATH: '/staticImages/howItWorks/app-user.svg',
  WAYS_TO_USE_BOXES: [
    {
      imageUrl: `/staticImages/howItWorks/icon-lightning.svg`,
      mainText: 'Launch a Contest',
      descriptionText:
        'Work with hundreds of creative experts to get custom name suggestions for your business or brand. All names are auto-checked for URL availability.',
      linkUrl: '/startContest',
      linkText: 'Launch a Contest',
    },
    {
      imageUrl: `/staticImages/howItWorks/icon-pc.svg`,
      mainText: 'Explore Names For Sale',
      descriptionText:
        'Our branding team has curated thousands of pre-made names that you can purchase instantly. All names include a matching URL and a complimentary Logo Design',
      linkUrl: '#',
      linkText: 'Explore Names For Sale',
    },
    {
      imageUrl: `/staticImages/howItWorks/icon-lightbulb.svg`,
      mainText: 'Agency-level Managed Contests',
      descriptionText:
        'Our Managed contests combine the power of crowdsourcing with the rich experience of our branding consultants. Get a complete agency-level experience at a fraction of Agency costs',
      linkUrl: '#',
      linkText: 'Learn More',
    },
  ],
  HOW_NAMING_WORKS_BOXES: [
    {
      text: 'Fill out your Naming Brief and begin receiving name ideas in minutes',
    },
    {
      text: 'Rate the submissions and provide feedback to creatives. Creatives submit even more names based on your feedback.',
    },
    {
      text: 'Our team helps you test your favorite names with your target audience. We also assist with Trademark screening.',
    },
    {
      text: 'Pick a Winner. The winner gets paid for their submission.',
    },
  ],
  FAQ_SECTIONS: [
    {
      sectionName: 'Launching A Contest',
      content: [
        {
          question: 'How long does it take to start receiving submissions?',
          answer:
            'For Naming contests, you will start receiving your submissions within few minutes of launching your contest. Since our creatives are located across the globe, you can expect to receive submissions 24 X 7 throughout the duration of the brainstorming phase.',
        },
        {
          question: 'How long do Naming Contests last?',
          answer:
            'You can choose a duration from 1 day to 7 days. We recommend a duration of 3 Days or 5 Days. This allows for sufficient time for entry submission as well as brainstorming with creatives. If you take advantage of our validation services such as Audience Testing and Trademark Research, both will be an additional 4-7 days (3-5 business days for Audience Testing and 1-2 business days for Trademark Research).',
        },
        {
          question: 'Where are the creatives located?',
          answer:
            'About 70% of our Creatives are located in the United States and other English speaking countries (i.e. United Kingdom, Canada, and Australia.). We utilize an advanced rating score algorithm to ensure that high quality creatives receive more opportunities to participate in our contests.',
        },
        {
          question: 'What if I do not like any submissions?',
          answer: `While it is unusually rare that you will not like any names provided, we have a few options in case this problem occurs:<br/>
          •	If the contest ends and you have not yet found a name that you’d like to move forward with, we can provide complimentary extension of your contest as well as a complimentary consultation with one of our branding consultants (a $99 value).<br/>
          •	By exploring our premium domain marketplace you can apply the contest award towards the purchase of any name listed for sale.<br/>
          •	If you choose the Gold package or Platinum package and keep the contest as 'Not Guaranteed', you can request a partial refund if you choose not to move forward with any name from you project. (Please note that the refund is for the contest award). Here is a link to our <a hre:https://helpdesk.atom.com/en/articles/115621-refund-policy">Refund Policy</a>`,
        },
        {
          question: 'How much does it cost?',
          answer:
            'Our naming competitions start at $299, and our logo design competitions start at $299. There are three additional contest levels that each offer more features and benefits. See our <a href="https://www.atom.com/pricing">Pricing Page</a> for details.',
        },
        {
          question:
            'I need both a Name and a Logo. Do you offer any discount for multiple contests?',
          answer:
            'Yes! We have many contest bundles - our most popular being our Name, Tagline, and Logo bundle. Bundles allow you to purchase multiple contests at one time and save as much as from $75 - $400. You can learn more about our bundle options on our <a href="https://www.atom.com/pricing">Pricing Page</a>.',
        },
        {
          question: 'What if I want to keep my business idea private?',
          answer:
            'You can select a Non Disclosure Agreement (NDA) option at the time of launching your competition. This will ensure that only those contestants who agree to the NDA will be able to read your project brief and participate in the contest. The contest details will be kept private from other users, as well as search engines.',
        },
        {
          question: 'Can you serve customers outside the US?',
          answer:
            "Absolutely. Atom services organizations across the globe. Our customers come from many countries, such as the United States, Australia, Canada, Europe, India, and MENA. We've helped more than 25,000 customers around the world.",
        },
        {
          question: 'Can I see any examples?',
          answer: `Our creatives have submitted more than 6 Million names and thousands of logos on our platform. Here are some examples of Names, Taglines, and Logos that were submitted in recent contests.<br/>
            •	<a href="https://www.atom.com/Name-Ideas">Name Examples</a><br/>
            •	<a href="https://www.atom.com/tagline-slogan-ideas">Tagline Examples</a><br/>
            •	<a href="https://www.atom.com/logo-design-examples">Logo Examples</a>`,
        },
      ],
    },
    {
      sectionName: 'Buying From Marketplace',
      content: [
        {
          question: "What's included with a Domain Purchase?",
          answer:
            'When you purchase a domain from our premium domain marketplace, you will receive the exact match .com URL, a complimentary logo design (along with all source files), as well as a complimentary Trademark report and Audience Testing if you’re interested in validating your name.',
        },
        {
          question: 'How does the Domain transfer process work?',
          answer:
            'Once you purchase a Domain, our transfer specialists will reach out to you (typically on the same business day). In most cases we can transfer the domain to your preferred registrar (such as GoDaddy). Once we confirm the transfer details with you, the transfers are typically initiated to your account within 1 business day.',
        },
        {
          question:
            'If I purchase a Domain on installments, can I start using it to setup my website?',
          answer:
            'We offer payment plans for many domains in our Marketplace. If you purchase a domain on a payment plan, we hold the domain in an Escrow account until it is fully paid off. However, our team can assist you with making any changes to the domains (such as Nameserver changes), so that you can start using the domain right away after making your first installment payment.',
        },
      ],
    },
    {
      sectionName: 'Managed Contests',
      content: [
        {
          question: 'What are Managed Contests?',
          answer: `The 'Managed' option is a fully managed service by Atom Branding experts. It includes a formal brief preparation by Atom team and management of your contest. Managed Contests are a great fit for companies that are looking for an 'Agency' like experience and they do not want to manage the contest directly.Our branding team has directly managed hundreds of branding projects and has learned several best practices that lead to successful project outcomes. Our team will apply all best practices towards the management of your branding project. <br/>Learn more about our <a href="https://www.atom.com/managed-contests">Managed Contest Service</a>`,
        },
        {
          question: "What's a typical timeline for a Managed Contest?",
          answer: `The overall process takes 12-13 days.<br/>
            •	The Managed projects start with a project kick-off call with your Branding Consultant. You can schedule this call online immediately after making your payment.<br/>
            •	After your kick-off call, the Branding consultant will write your project brief and send for your approval within 1 business day.<br/>
            •	Upon your approval, the contest will go live. The branding consultant will help manage your project throughout the brainstorming phase (typically 5 days).<br/>
            •	Upon the completion of brainstorming phase, the branding consultant will work with you to test the top 6 names from your Shortlist (3-5 Days). In addition, the branding consultant will coordinate the detailed Trademark screening (1-3 days)`,
        },
        {
          question: 'How much do Managed Contests cost?',
          answer: `We offer two levels of Managed Contests: Standard ($1499) and Enterprise ($2999). The Enterprise option includes:<br/>
            •	(1) a $500 award amount (instead of $300), which will attract our top Creatives and provide more options to choose from;<br/>
            •	(2) we will ensure a senior member of our branding team is assigned to your project and the branding team will invest about 3X more time in the day-to-day management of your project;<br/>
            •	(3) you will receive more high-end trademark report and 5X more responses for your audience test.<br/>
            •	Here is a link to our <a href="https://www.atom.com/pricing">Pricing Page</a> with a detailed comparison of the two packages.`,
        },
        {
          question: 'Where are the Branding Consultants located?',
          answer:
            'All our branding consultants are based in our Headquarters (Hoffman Estates, IL). They have years of experience managing branding projects for companies ranging from startups to Fortune 500 corporations.',
        },
      ],
    },
    {
      sectionName: 'For Creatives',
      content: [
        {
          question: 'Can anyone join your platform?',
          answer: `We are open to anyone to signup. However, we have an extensive <a href="https://helpdesk.atom.com/en/articles/91702-percentile-ranking-score">'Quality Scoring'</a>  process which ensures that high quality creatives have the ability to continue to participate in the platform. On the other hand, we limit the participation from those creatives who do not consistently receive high ratings.`,
        },
        {
          question: 'Can I start participating immediately upon signing up?',
          answer:
            "When you initially signup, you are assigned few contests to assess your overall quality of submissions. Based upon the quality of your submissions, you will continue to be assigned additional contests. Once you have received enough high ratings on your submissions, your account will be upgraded to 'Full Access', so that you can begin participating in all open contests.",
        },
        {
          question: 'How Do I Get Paid?',
          answer:
            'We handle creative payouts via Paypal or Payoneer. Depending upon your country of residence, we may require additional documentation to verify your identity as well as your Tax status.',
        },
      ],
    },
  ],
  POPULAR_SEARCHES: [
    'Tech',
    'Clothing',
    'Finance',
    'Real',
    'Estate',
    'Crypto',
    'Short',
    'One Word',
  ],
  USER_INFO_TO_CHANGE: [
    { label: 'First Name', name: 'firstName' },
    { label: 'Last Name', name: 'lastName' },
    { label: 'Display Name', name: 'displayName' },
  ],
  MAX_LENGTH: {
    USER_INPUTS: 20,
    USER_EMAIL: 30,
    CONTEST_TITLE: 50,
    OTHER: 255,
  },
  TOKEN_ERROR: {
    DATA: 'token error',
    STATUS: 408,
  },
  PUBLIC_LOCATIONS: ['/', '/events', '/login', '/registration', '/howItWorks']
};

export default CONSTANTS;
