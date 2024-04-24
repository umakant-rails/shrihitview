export const ADMIN_ROLE = [1,2];
export const PANCHANG_TYPES = ['राधावल्लभ संप्रदाय']
export const PAKSH = ['कृष्ण पक्ष','शुक्ळ पक्ष'];
export const TITHIS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
export const TAB_LIST = [
  {url: '/pb/articles', label: 'रचनाये'}, {url: '/pb/authors', label:'रचनाकार/लेखक'}, 
  {url: '/pb/authors/sants', label: 'संत जीवनी'}, {url: '/pb/scriptures', label:'रसिक वाणी/ग्रन्थ'}, 
  {url: '/pb/stories', label:'भक्ति प्रसंग'}, {url: '/pb/strota', label:'आरती/स्तोत्र'}, 
  {url: '/pb/panchangs', label: 'हितोत्सव पत्रिका'}, {url: '/pb/suggestions', label:'सुझाव'}
]
export const DEFAULT_ICON = `<svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4c0 .6-.4 1-1 1H5m4 8h6m-6-4h6m4-8v16c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1Z"/>
</svg>`;
export const USER_ACTIVITIES = [
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
      {url: '/authors/new', label: 'रचनाकार जोड़े'},
      {url: '/authors', label: 'रचनाकार सूची'}
    ]
  },
  {
    url: '/tags', label: 'टैग्स',
    icon: `<svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.6 8.4h0m-4.7 11.3-6.6-6.6a1 1 0 0 1 0-1.4l7.3-7.4a1 1 0 0 1 .7-.3H18a2 2 0 0 1 2 2v5.5a1 1 0 0 1-.3.7l-7.5 7.5a1 1 0 0 1-1.3 0Z"/>
    </svg>`,
    childs: []
  },
  {
    url: '#', label: 'संत चरित्र/प्रेरक प्रसंग',
    childs: [
      {url: '/stories/new', label: 'संत चरित्र/प्रेरक प्रसंग जोड़े'},
      {url: '/stories', label: 'संत चरित्र/प्रेरक प्रसंग सूची'}
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
let admin_activities = [
  { 
    url: '/admin/dashboard', label: 'Dashboard', childs: [], 
    icon: `<svg aria-hidden="true" className="w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
      </svg>`
  },
  { url: '#', label: 'App विषय-सूची', 
    childs : [
      {url: '/admin/articles', label: 'रचना'},
      {url: '/admin/authors', label: 'रचनाकार'},
      {url: '/admin/tags', label: 'टैग्स'},
    ] 
  },
  {
    url: '/admin/article_types', label: 'रचना प्रकार', childs: [],
    icon: `<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0a4 4 0 0 1-4 4h-1a3 3 0 0 0-3 3"/>
    </svg>`,
  },
  {
    url: '/admin/contexts', label: 'प्रसंग', childs: []
  },
  {
    url: '#', label: 'रसिक वाणी/ग्रन्थ',
    icon: `<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 17v-5h1.5a1.5 1.5 0 1 1 0 3H5m12 2v-5h2m-2 3h2M5 10V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1v6M5 19v1c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-1M10 3v4c0 .6-.4 1-1 1H5m6 4v5h1.4a1.6 1.6 0 0 0 1.6-1.6v-1.8a1.6 1.6 0 0 0-1.6-1.6H11Z"/>
    </svg>`,
    childs: [
      {url: '/admin/scriptures/new', label: 'रसिक वाणी/ग्रन्थ जोड़े'},
      {url: '/admin/scriptures', label: 'रसिक वाणी/ग्रन्थ सूची'},
    ]
  },
  {
    url: '#', label: 'स्त्रोत/आरती',
    childs: [
      {url: '/admin/strota/new', label: 'स्त्रोत/आरती जोड़े'},
      {url: '/admin/strota', label: 'स्त्रोत/आरती सूची'}
    ]
  },
  {url: '/admin/panchangs', label: 'हितोत्सव पत्रिका', childs: []}
]

export const ADMIN_ACTIVITIES = [...admin_activities, ...USER_ACTIVITIES];

export const ITEM_PER_PAGE = 10;
export const HOME_PAGE = "HOME_PAGE";

export const USER_REGISTRATION= "USEREGISTRATION";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT= "USER_LOGOUT";
export const ERROR_HANDLING = "ERROR_HANDLING";

export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

/* admin namespace constant */
export const DASHBOARD_DATA = "DASHBOARD_DATA";
export const ADMIN_ARTICLE_LIST = "ADMIN_ARTICLE_LIST";
export const ADMIN_ARTICLES_BY_PAGE = "ADMIN_ARTICLES_BY_PAGE";
export const ADMIN_ARTICLE_APPROVED = "ARTICLE_APPROVED";
export const ADMIN_ARTICLE_DELETED = "ARTICLE_APPROVED";

export const ADMIN_AUTHOR_LIST = "ADMIN_ARTICLE_LIST";
export const ADMIN_AUTHOR_APPROVED = "ADMIN_AUTHOR_APPROVED";
export const ADMIN_AUTHOR_DELETED = "ADMIN_AUTHOR_DELETED";

export const ADMIN_TAG_LIST = "ADMIN_TAG_LIST";
export const ADMIN_TAG_APPROVED = "ADMIN_TAG_APPROVED";
export const ADMIN_TAG_UPDATED = "ADMIN_TAG_UPDATED";
export const ADMIN_TAG_DELETED = "ADMIN_TAG_DELETED";
/* REGISTERED USER constant */
export const PASSWORD_UPDATED = "PASSWORD_UPDATED";
export const ARTICLE_NEW = "ADMIN_ARTICLE_NEW";
export const ARTICLE_TAG_CREATED = "TAG_CREATED";
export const ARTICLE_CREATED = "ARTICLE_CREATED";
export const ARTICLE_LIST = "ARTICLE_LIST";
export const ARTICLE_SHOW = "ARTICLE_SHOW";
export const ARTICLE_EDIT = "ARTICLE_EDIT";
export const ARTICLE_UPDATED = "ARTICLE_UPDATED";
export const ARTICLE_DELETED = "ARTICLE_DELETED";
export const ARTICLE_LIST_BY_PAGE = "ARTICLE_LIST_BY_PAGE";

export const COMMENT_CREATED = "COMMENT_CREATED";
export const COMMENT_UPDATED = "COMMENT_UPDATED";
export const COMMENT_REPLIED = "COMMENT_REPLIED";
export const COMMENT_DELETED = "COMMENT_DELETED";

export const AUTHOR_LIST = "AUTHOR_LIST";
export const AUTHOR_SHOW = "AUTHOR_SHOW";
export const AUTHOR_NEW = "AUTHOR_NEW";
export const AUTHOR_CREATED = "AUTHOR_CREATED";
export const SAMPRADAYA_CREATED = "SAMPRADAYA_CREATED";
export const AUTHOR_EDIT = "AUTHOR_EDIT";
export const AUTHOR_UPDATED = "AUTHOR_UPDATED";
export const AUTHOR_DELETED = "AUTHOR_DELETED";

export const TAG_LIST = "TAG_LIST";
export const TAG_NEW = "TAG_NEW";
export const TAG_CREATED = "TAG_CREATED";
export const TAG_EDIT = "TAG_EDIT";
export const TAG_UPDATED = "TAG_UPDATED";
export const TAG_DELETED = "TAG_DELETED";

export const STORY_LIST = "STORY_LIST";
export const STORY_NEW = "STORY_NEW";
export const STORY_SHOW = "STORY_SHOW";
export const STORY_CREATED = "STORY_CREATED";
export const STORY_EDIT = "STORY_EDIT";
export const STORY_UPDATED = "STORY_UPDATED";
export const STORY_DELETED = "STORY_DELETED";

export const CONTEXT_LIST = "CONTEXT_LIST";
export const CONTEXT_NEW = "CONTEXT_NEW";
export const CONTEXT_CREATED = "CONTEXT_CREATED";
export const CONTEXT_EDIT = "CONTEXT_EDIT";
export const CONTEXT_UPDATED = "CONTEXT_UPDATED";
export const CONTEXT_DELETED = "CONTEXT_DELETED";

export const ARTICLE_TYPE_LIST = "ARTICLE_TYPE_LIST";
export const ARTICLE_TYPE_NEW = "ARTICLE_TYPE_NEW";
export const ARTICLE_TYPE_CREATED = "ARTICLE_TYPE_CREATED";
export const ARTICLE_TYPE_EDIT = "ARTICLE_TYPE_EDIT";
export const ARTICLE_TYPE_UPDATED = "ARTICLE_TYPE_UPDATED";
export const ARTICLE_TYPE_DELETED = "ARTICLE_TYPE_DELETED";

export const STROTUM_LIST = "STROTUM_LIST";
export const STROTUM_NEW = "STROTUM_NEW";
export const STROTUM_CREATED = "STROTUM_CREATED";
export const STROTUM_SHOW = "STROTUM_SHOW";
export const STROTUM_EDIT = "STROTUM_EDIT";
export const STROTUM_UPDATED = "STROTUM_UPDATED";
export const STROTUM_DELETED = "STROTUM_DELETED";

export const STROTUM_ARTICLE_CREATED = "STROTUM_ARTICLE_CREATED";
export const STROTUM_ARTICLE_UPDATED = "STROTUM_ARTICLE_UPDATED";
export const STROTUM_ARTICLE_DELETED = "STROTUM_ARTICLE_DELETED";
export const STROTUM_ARTICLE_INDEX_UPDATED = "STROTUM_ARTICLE_INDEX_UPDATED";

export const SCRIPTURE_LIST = "SCRIPTURE_LIST";
export const SCRIPTURE_SHOW = "SCRIPTURE_SHOW";
export const SCRIPTURE_CREATED = "SCRIPTURE_CREATED";
export const SCRIPTURE_EDIT = "SCRIPTURE_EDIT";
export const SCRIPTURE_UPDATED = "SCRIPTURE_UPDATED";
export const SCRIPTURE_DELETED = "SCRIPTURE_DELETED";
export const SCRIPTURE_NEW = "SCRIPTURE_NEW";
export const SCR_CHAPTER_ARTICLES = "SCR_CHAPTER_ARTICLES";

export const CHAPTER_LIST = "CHAPTER_LIST";
export const CHAPTER_CREATED = "CHAPTER_CREATED";
export const CHAPTER_UPDATED = "CHAPTER_UPDATED";
export const CHAPTER_DELETED = "CHAPTER_DELETED";
export const SCR_ARTICLE_NEW = "SCR_ARTICLE_NEW";
export const SCR_ARTICLE_EDIT = "SCR_ARTICLE_EDIT";
export const SCR_ARTICLE_CREATED = "SCR_ARTICLE_CREATED";
export const SCR_ARTICLE_UPDATED = "SCR_ARTICLE_UPDATED";
export const SCR_ARTICLE_DELETED = "SCR_ARTICLE_DELETED";
// export const SCR_ARTICLE_NEW = "SCR_ARTICLE_NEW";
// export const SCR_ARTICLE_NEW = "SCR_ARTICLE_NEW";

export const CS_ARTICLE_ADD_PAGE = "CS_ARTICLE_ADD_PAGE";
export const CS_FILTERED_ARTICLE = "CS_FILTERED_ARTICLE";
export const CS_ARTICLE_ADD = "CS_ARTICLE_ADD0";
export const CS_ARTICLE_REMOVE = "CS_ARTICLE_REMOVE";
export const CS_SCRIPTURE_SHOW = "CS_SCRIPTURE_SHOW";
export const CS_ARTICLE_FOR_INDEXING = "CS_ARTICLE_FOR_INDEXING";
export const CS_ARTICLE_INDEX_UPDATED= "CS_ARTICLE_INDEX_UPDATED";
export const CS_ARTICLE_DELETED = "CS_ARTICLE_DELETED";

export const PANCHANG_LIST = "PANCHANG_LIST";
export const PANCHANG_CREATED = "PANCHANG_CREATED";
export const PANCHANG_SHOW = "PANCHANG_SHOW";
export const PANCHANG_UPDATED = "PANCHANG_UPDATED";
export const PANCHANG_DELETED = "PANCHANG_DELETED";

export const PANCHANG_TITHI_NEW = "PANCHANG_TITHI_NEW";
export const PANCHANG_TITHI_CREATED = "PANCHANG_TITHI_CREATED";
export const PANCHANG_TITHI_EDITING_DATA = "PANCHANG_TITHI_EDITING_DATA";
export const PANCHANG_TITHI_UPDATED = "PANCHANG_TITHI_UPDATED";
export const PANCHANG_TITHI_DELETED = "PANCHANG_TITHI_DELETED";
export const NAVIGATE_MONTH = "NAVIGATE_MONTH";

/* public namespace constant */
export const PB_ARTICLE_LIST = "PB_ARTICLE_LIST";
export const PB_ARTICLE_BY_PAGE = "PB_ARTICLE_BY_PAGE";
export const PB_ARTICLE_SHOW = "PB_ARTICLE_SHOW";

export const PB_AUTHOR_LIST = "PB_AUTHOR_LIST";
export const PB_AUTHOR_SHOW = "PB_AUTHOR_SHOW";
export const PB_SANT_LIST = "PB_SANT_LIST";
export const PB_SANT_SHOW = "PB_SANT_SHOW";

export const PB_STORY_LIST = "PB_STORY_LIST";
export const PB_STORY_SHOW = "PB_STORY_SHOW";

export const PB_SCRIPTURE_LIST = "PB_SCRIPTURE_LIST";
export const PB_SCRIPTURE_SHOW = "PB_SCRIPTURE_SHOW";

export const PB_STROTUM_LIST = "PB_STROTUM_LIST";
export const PB_STROTUM_SHOW = "PB_STROTUM_SHOW";

export const PB_ARTICLE_TYPE_LIST = "ARTICLE_TYPE_LIST";
export const PB_ARTICLE_TYPE_SHOW = "ARTICLE_TYPE_SHOW";

export const PB_CONTEXT_LIST = "PB_CONTEXT_LIST";
export const PB_CONTEXT_SHOW = "PB_CONTEXT_SHOW";

export const PB_TAG_LIST = "TAG_LIST";
export const PB_TAG_SHOW = "TAG_SHOW";