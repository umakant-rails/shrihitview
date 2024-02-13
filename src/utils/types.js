export const TAB_LIST = [
  {url: '/pb/articles', label: 'रचनाये'}, {url: '/pb/authors', label:'रचनाकार/लेखक'}, 
  {url: '/pb/authors/sants', label: 'संत जीवनी'}, {url: '/pb/scriptures', label:'रसिक वाणी/ग्रन्थ'}, 
  {url: '/pb/stories', label:'भक्ति प्रसंग'}, {url: '/pb/strota', label:'आरती/स्तोत्र'}, 
  {url: '/pb/panchangs', label: 'हितोत्सव पत्रिका'}, {url: '/pb/suggestions', label:'सुझाव'}
]

export const DEFAULT_ICON = `<svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4c0 .6-.4 1-1 1H5m4 8h6m-6-4h6m4-8v16c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1Z"/>
</svg>`;
export const ADMIN_ACTIVITIES = [
  { 
    url: '/admin/dashboard', label: 'Dashboard', childs: [], 
    icon: `<svg aria-hidden="true" className="w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
      </svg>`
  },
  { url: '#', label: 'App विषय-सूची', 
    childs : [
      {url: '#', label: 'रचना'},
      {url: '#', label: 'रचनाकार'},
      {url: '#', label: 'टैग्स'}
    ] 
  },
  {
    url: '#', label: 'रिपोर्ट्स',
    childs: [
      {url: '#', label: 'रचना'},
      {url: '#', label: 'रचनाकार'},
      {url: '#', label: 'प्रसंग'}
    ]
  },
  {
    url: '#', label: 'रचना प्रकार',
    icon: `<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0a4 4 0 0 1-4 4h-1a3 3 0 0 0-3 3"/>
    </svg>`,
    childs: [
      {url: '#', label: 'रचना प्रकार जोड़े'},
      {url: '#', label: 'रचना प्रकार सूची'}
    ]
  },
  {
    url: '#', label: 'प्रसंग',
    childs: [
      {url: '#', label: 'प्रसंग जोड़े'},
      {url: '#', label: 'प्रसंग सूची'}
    ]
  },
  {
    url: '#', label: 'रसिक वाणी/ग्रन्थ',
    icon: `<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 17v-5h1.5a1.5 1.5 0 1 1 0 3H5m12 2v-5h2m-2 3h2M5 10V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1v6M5 19v1c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-1M10 3v4c0 .6-.4 1-1 1H5m6 4v5h1.4a1.6 1.6 0 0 0 1.6-1.6v-1.8a1.6 1.6 0 0 0-1.6-1.6H11Z"/>
    </svg>`,
    childs: [
      {url: '#', label: 'रसिक वाणी/ग्रन्थ जोड़े'},
      {url: '#', label: 'रसिक वाणी/ग्रन्थ सूची'},
      {url: '#', label: 'अध्याय जोड़े'},
      {url: '#', label: 'अध्याय सूची'},
      {url: '#', label: 'सेक्शन में अध्याय जोड़े'},
      {url: '#', label: 'सेक्शन से अध्याय हटायें'},
    ]
  },
  {
    url: '#', label: 'ग्रन्थ की रचना',
    childs: [
      {url: '#', label: 'ग्रन्थ रचना जोड़े'},
      {url: '#', label: 'ग्रन्थ रचना सूची'}
    ]
  },
  {
    url: '#', label: 'संकलित ग्रन्थ रचना',
    childs: [
      {url: '#', label: 'संकलित ग्रन्थ में रचनायें जोड़े'},
      {url: '#', label: 'रचना अनुक्रम का अद्यतन'}
    ]
  },
  {
    url: '#', label: 'स्त्रोत/आरती',
    childs: [
      {url: '#', label: 'स्त्रोत/आरती जोड़े'},
      {url: '#', label: 'स्त्रोत/आरती सूची'}
    ]
  },
  {
    url: '#', label: 'रचना',
    childs: [
      {url: '/articles/new', label: 'नई रचना जोड़े'},
      {url: '/articles', label: 'रचना सूची'}
    ]
  },
  {
    url: '#', label: 'रचनाकार',
    icon: `<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a9 9 0 0 0 5-1.5 4 4 0 0 0-4-3.5h-2a4 4 0 0 0-4 3.5 9 9 0 0 0 5 1.5Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
    </svg>`,
    childs: [
      {url: '#', label: 'रचनाकार जोड़े'},
      {url: '#', label: 'रचनाकार सूची'}
    ]
  },
  {
    url: '#', label: 'टैग्स',
    icon: `<svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.6 8.4h0m-4.7 11.3-6.6-6.6a1 1 0 0 1 0-1.4l7.3-7.4a1 1 0 0 1 .7-.3H18a2 2 0 0 1 2 2v5.5a1 1 0 0 1-.3.7l-7.5 7.5a1 1 0 0 1-1.3 0Z"/>
    </svg>`,
    childs: [
      {url: '#', label: 'टैग्स जोड़े'},
      {url: '#', label: 'टैग्स सूची'}
    ]
  },
  {
    url: '#', label: 'संत चरित्र/प्रेरक प्रसंग',
    childs: [
      {url: '#', label: 'संत चरित्र/प्रेरक प्रसंग जोड़े'},
      {url: '#', label: 'संत चरित्र/प्रेरक प्रसंग सूची'}
    ]
  },
  {
    url: '#', label: 'पंचांग', childs: [], icon: `<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Zm3-7h0v0h0v0Zm4 0h0v0h0v0Zm4 0h0v0h0v0Zm-8 4h0v0h0v0Zm4 0h0v0h0v0Zm4 0h0v0h0v0Z"/>
    </svg>`
  },
  {
    url: '#', label: 'सुझाव', childs: [], icon: `<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 5V4c0-.6-.4-1-1-1H9a1 1 0 0 0-.8.3l-4 4a1 1 0 0 0-.2.6V20c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-5M9 3v4c0 .6-.4 1-1 1H4m11.4.8 2.7 2.7m1.2-3.9a2 2 0 0 1 0 3l-6.6 6.6L9 18l.7-3.7 6.7-6.7a2 2 0 0 1 3 0Z"/>
    </svg>`
  },
]

export const ITEM_PER_PAGE = 10;
export const HOME_PAGE = "HOME_PAGE";

export const USER_REGISTRATION= "USEREGISTRATION";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT= "USER_LOGOUT";
export const ERROR_HANDLING = "ERROR_HANDLING";

export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

/* admin namespace constant */


/* REGISTERED USER constant */
export const ARTICLE_NEW = "ADMIN_ARTICLE_NEW";
export const TAG_CREATED = "TAG_CREATED";
export const ARTICLE_CREATED = "ARTICLE_CREATED";
export const ARTICLE_LIST = "ARTICLE_LIST";
export const ARTICLE_SHOW = "ARTICLE_SHOW";
export const ARTICLE_EDIT = "ARTICLE_EDIT";
export const ARTICLE_UPDATED = "ARTICLE_UPDATED";
export const ARTICLE_DELETED = "ARTICLE_DELETED";
export const ARTICLE_LIST_BY_PAGE = "ARTICLE_LIST_BY_PAGE";

/* public namespace constant */
export const PB_ARTICLE_LIST = "PB_ARTICLE_LIST";
export const PB_ARTICLE_SHOW = "PB_ARTICLE_SHOW";


export const AUTHOR_LIST = "AUTHOR_LIST";
export const AUTHOR_SHOW = "AUTHOR_SHOW";
export const SANT_LIST = "SANT_LIST";
export const SANT_SHOW = "SANT_SHOW";

export const STORY_LIST = "STORY_LIST";
export const STORY_SHOW = "STORY_SHOW";

export const SCRIPTURE_LIST = "SCRIPTURE_LIST";
export const SCRIPTURE_SHOW = "SCRIPTURE_SHOW";

export const STROTUM_LIST = "STROTUM_LIST";
export const STROTUM_SHOW = "STROTUM_SHOW";

export const ARTICLE_TYPE_LIST = "ARTICLE_TYPE_LIST";
export const ARTICLE_TYPE_SHOW = "ARTICLE_TYPE_SHOW";

export const CONTEXT_LIST = "CONTEXT_LIST";
export const CONTEXT_SHOW = "CONTEXT_SHOW";

export const TAG_LIST = "TAG_LIST";
export const TAG_SHOW = "TAG_SHOW";