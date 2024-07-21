export const ADMIN_ROLE = [1,2];
export const PANCHANG_TYPES = ['राधावल्लभ संप्रदाय']
export const PAKSH = ['कृष्ण पक्ष','शुक्ळ पक्ष'];
export const TITHIS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
export const ENG_MONTH = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितम्बर', 'अक्टूबर', 'नवम्बर', 'दिसम्बर'];
export const 	ENG_MONTH_SHORT = ['जन', 'फर', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अग', 'सित', 'अक्टू', 'नव', 'दिस'];
export const TAB_LIST = [
  {url: '/pb/articles', label: 'रचनाये'}, {url: '/pb/authors', label:'रचनाकार/लेखक'}, 
  {url: '/pb/authors/sants', label: 'संत जीवनी'}, {url: '/pb/scriptures', label:'रसिक वाणी/ग्रन्थ'}, 
  {url: '/pb/stories', label:'भक्ति प्रसंग'}, {url: '/pb/strota', label:'आरती/स्तोत्र'}, 
  {url: '/pb/panchangs/current', label: 'हितोत्सव पत्रिका'}, {url: '/pb/suggestions', label:'सुझाव'}
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
    url: '/users/panchangs', label: 'पंचांग', childs: [], icon: `<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Zm3-7h0v0h0v0Zm4 0h0v0h0v0Zm4 0h0v0h0v0Zm-8 4h0v0h0v0Zm4 0h0v0h0v0Zm4 0h0v0h0v0Z"/>
    </svg>`
  },
  {
    url: '/users/suggestions', label: 'सुझाव', childs: [], icon: `<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
      {url: '/admin/users', label: 'पंजीकृत उपयोगकर्ता'}
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
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";