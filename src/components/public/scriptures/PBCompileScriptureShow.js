import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { getCSArticles } from '../../../slices/public/scriptureSlice';

const PBCompileScriptureShow = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef({});
  const {id} = useParams()
  const [currentArticle, setCurrentArticle] = useState(null);
  const [indexing, setIndexing] = useState(false);
  const [format, setFormat] = useState('grid');
  const [sortArticles, setSortArticles] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [chapterList, setChapterList] = useState([]);
  const { scripture, chapters} = useSelector(state => state.scripture);

  useEffect( () => { dispatch(getCSArticles(id)); }, [dispatch, id]);
  useEffect( () => { setChapterList(chapters); chapters && sortArticleList(chapters); }, [chapters]);
  useEffect( () => { 
    let chapterss = currentChapter ? chapters.filter((chapter)=>chapter.id===parseInt(currentChapter)) : chapters;
    setChapterList(chapterss);
    sortArticleList(chapterss)
  }, [chapters, currentChapter]);

  const updateIndexing = () => setIndexing(!indexing);
  const sortArticleList = (chapters) => {
    let articles = [];
    chapters && chapters.map((chapter, index) => {
      chapter.articles.map((article, index) => {
        articles.push({...article, chapter_name: chapter.name,chapter_id: chapter.id, index: index+1});
      });
    })
  
    articles = articles.sort((a, b) => {
      if (a.hindi_title < b.hindi_title) { return -1; }
      if (a.hindi_title > b.hindi_title) { return 1;  }
      return 0;
    });
    setSortArticles([]);
    setSortArticles(articles);
  }
  const switchDisplayFormat = (format) => {
    setFormat(format); 
    setCurrentArticle(null); 
    indexing && setIndexing(!indexing);
  }
  const navigateArticle = (articleIndex, chapterId=null) => {
    if(indexing){
      setIndexing(!indexing);
      window.scrollTo({top: 0, behavior: 'instant'});
    }
    chapterId && setCurrentChapter(chapterId);
    currentArticle === articleIndex ? setCurrentArticle(null) : setCurrentArticle(articleIndex);
  }

  const borderStyle = (totalArticle, index) => {
    const classLst = [];
    (index%2 === 1 && totalArticle !== index) && classLst.push('border-r');
    [1,2].includes(index) && classLst.push('border-t');
    (totalArticle === index && totalArticle%2 === 1) && classLst.push('md:col-span-12');
    !(totalArticle === index && totalArticle%2 === 1) && classLst.push('md:col-span-6');
    
    return classLst.join(" ");
  }

  const indexingBlock = () => {
    return (<div className={`grid md:grid-cols-12 page-scroll ${!indexing && 'hidden'}`}>
      <div className='col-start-2 col-span-10'>
        <div className={`text-3xl font-bold text-center bg-slate-800 text-white 
          rounded-md py-3 mx-3 my-4 shadow-purple-400`}>
          अनुक्रमाणिका
        </div>
        {
          chapters && chapters.map( (chapter, index1) => (
            <div key={index1} className='grid md:grid-cols-12'>
              <div className={`md:col-span-12 mt-4 mb-3 text-xl text-yellow-500 
                font-bold flex justify-center text-center underline`}>
                {index1+1}. {chapter.name}
              </div>
              {
                chapter.articles.length > 0 ? chapter.articles.map( (article, index2) => 
                  <Link to="#" key={index2} onClick={e => navigateArticle(`${chapter.id}${article.id}`, chapter.id)} 
                    className={`text-xl text-blue-800 px-4 py-2 border-b 
                      border-gray-500 ${borderStyle(chapter.articles.length, index2+1)}`}
                    >
                    {index2+1}. {article.hindi_title}
                  </Link>
                ) : (
                  <div className='md:col-span-12 text-center border-t border-gray-500 py-1'>
                    There is not article available.
                  </div>
                )
            }
            </div>
          )
        )}
      </div>
    </div>);
  }

  return (
    <div className='grid md:grid-cols-12'>
      <div className='lg:col-start-2 lg:col-span-10 md:col-span-12'>
        <div className='grid md:grid-cols-12'>
          <div className='lg:col-start-2 lg:col-span-10 md:col-span-12 border-2 border-gray-2 pb-4 shadow-2xl page-min'>
            <div className='!py-5 article-header-violet text-3xl !text-blue-800 text-center'>
              <span className='float-left ms-2'>
                <button onClick={updateIndexing}>
                  <svg className="w-[31px] h-[31px] text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"/>
                  </svg>
                </button>
              </span>
              {scripture && scripture.name}
            </div>
            <div className='grid md:grid-cols-12 mt-3'>
              <div className='col-span-1'></div>
              <div className='md:col-span-10 border-b pb-4 border-stone-300'> 
                <div className='grid grid-cols-12'>
                  <div className='col-span-10'>
                    <select name="chapter" className='rounded block w-full text-xl'
                      onChange={e => setCurrentChapter(e.target.value)} value={currentChapter}>
                      <option key={0} value=''>अध्याय चुने</option>
                      {
                        chapters && chapters.map((chapter, index) => 
                          <option key={index+1} value={chapter.id}>{index+1}. {chapter.name}</option>
                        )
                      }
                    </select>
                  </div>
                  <div className='col-span-2'>
                    <div className='flex justify-center mt-2'>
                      <div className='border-r-2 border-gray-400 pr-1 mr-1'>
                        <svg className={`w-7 h-7 text-gray-800 dark:text-white
                          ${format==='sort' ? 'bg-blue-700 text-white': 'text-gray-800' }`} aria-hidden="true" 
                          xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" 
                          viewBox="0 0 24 24" onClick={e =>{ switchDisplayFormat('sort');} } >
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M8 20V10m0 10-3-3m3 3 3-3m5-13v10m0-10 3 3m-3-3-3 3"/>
                        </svg>
                      </div>
                      <div className='border-r-2 border-gray-400 pr-1 mr-1'>
                        <svg className={`w-7 h-7 dark:text-white cursor-pointer 
                          ${format==='list' ? 'bg-blue-700 text-white': 'text-gray-800' }`} aria-hidden="true" 
                          xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                          onClick={e => switchDisplayFormat('list') } >
                          <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
                        </svg>
                      </div>
                      <div className=''>
                        <svg className={`w-7 h-7 dark:text-white cursor-pointer 
                          ${format==='grid' ? 'bg-blue-700 text-white': 'text-gray-800' }`} aria-hidden="true" 
                          xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                          onClick={e => switchDisplayFormat('grid')}>
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-1'></div>
            </div>
            {indexingBlock()}
            <div className={`page-scroll1`}>
              {/* sorted list format */}
              <div className={`${format !=='sort' && 'hidden'}`}>
                <div className='grid md:grid-cols-12'>
                  <div></div>
                  <div className='md:col-span-10'>
                    <div className={`text-3xl font-bold text-center bg-slate-800 text-white 
                      rounded-md py-3 my-5 mb-8 shadow-xl shadow-purple-400`}>
                      क्रमबद्ध रचनायें
                    </div>
                  </div>
                </div>
                <div className='grid md:grid-cols-12'>
                  <div className='md:col-span-2'></div>
                  <div className='md:col-span-8'>
                    {
                      sortArticles.length > 0 ? sortArticles.map((article, index) =>
                        <div key={index}>
                          <div className={`border-b text-xl py-3 px-4 text-blue-700 cursor-pointer`} 
                            onClick={e => navigateArticle(`${article.chapter_id}${article.id}`)}>
                            {index+1}. {article.hindi_title} (
                              <span className='text-red-700'>अध्याय:- {article.chapter_name}, अनुक्रम:- {article.index}</span>)
                          </div>
                          <div className={`article-detail  ${ currentArticle !== `${article.chapter_id}${article.id}` && 'hidden'}`}>
                            <div className={`text-xl font-bold text-center  
                              py-3 my-5 shadow-mdd border-t-2 bg-red-200 text-red-600 shadow-gray-400`}>
                              {index+1}. {article.hindi_title} 
                            </div>
                            <div className={`text-xl px-2 leading-10 mb-8 border-b border-stone-300 
                              shadow-xl shadow-gray-300 pb-4 text-slate-800`}>
                              {<div dangerouslySetInnerHTML={{__html: article.content}} />}
                            </div>
                          </div>
                        </div>
                      ) : (<div className='text-xl text-center'>अभी कोई रचना उपलब्ध नहीं है|</div>)
                    }
                  </div>
                  <div className='md:col-span-2'></div>
                </div>
              </div>

              {/* list format */}
              {chapterList && chapterList.map((chapter, index1) => 
                <div key={index1} className={`${format !=='list' && 'hidden'}`}>
                  {/* chapter name */}
                  <div className='grid md:grid-cols-12'>
                    <div></div>
                    <div className='md:col-span-10'>
                      <div className={`text-3xl font-bold text-center bg-slate-800 text-white 
                        rounded-md py-3 my-5 mb-8 shadow-xl shadow-purple-400`}>
                        {chapter && chapter.name}
                      </div>
                    </div>
                  </div>

                  <div className={`grid md:grid-cols-12`}>
                    <div className='md:col-span-2'></div>
                    <div className='md:col-span-8'>
                      {
                        chapter.articles.length > 0 ? chapter.articles.map((article, index) =>
                          <div key={index}>
                            <div className={`border-b text-xl py-3 px-4 text-blue-700`} 
                              onClick={e => navigateArticle(`${chapter.id}${article.id}`)}>
                              {article.hindi_title}
                            </div>
                            <div className={`article-detail  ${ currentArticle !== `${chapter.id}${article.id}` && 'hidden'}`}>
                              <div className={`text-xl font-bold text-center  
                                py-3 my-5 shadow-mdd border-t-2 bg-red-200 text-red-600 shadow-gray-400`}>
                                {index+1}. {article.hindi_title}
                              </div>
                              {/* <div className={`text-xl font-bold text-red-600 shadow-xll shadow-gray-300 mb-2 
                                bg-red-200 p-2 border-b`}>
                                {index+1}. {article.hindi_title}
                              </div> */}
                              <div className={`text-xl px-2 leading-10 mb-8 border-b border-stone-300 
                                shadow-xl shadow-gray-300 pb-4 text-slate-800`}>
                                {<div dangerouslySetInnerHTML={{__html: article.content}} />}
                              </div>
                            </div>
                          </div>
                        ) : (<div className='text-xl text-center'>अभी कोई रचना उपलब्ध नहीं है|</div>)
                      }
                    </div>
                    <div className='md:col-span-2'></div>
                  </div>
                </div>
              )}

              {/* grid format */}
              {chapterList && chapterList.map((chapter, index1) =>
                <div key={index1} className={`${format !=='grid' && 'hidden'}`}>
                  {/* chapter name */}
                  <div className='grid md:grid-cols-12'>
                    <div></div>
                    <div className='md:col-span-10'>
                      <div className={`text-3xl font-bold text-center bg-slate-800 text-white 
                        rounded-md py-3 my-5 mb-8 shadow-xl shadow-purple-400`}>
                        {chapter && chapter.name}
                      </div>
                    </div>
                  </div>
                  {/* grid format */}
                  <div className={`grid md:grid-cols-12`}>
                    <div className='md:col-span-2'></div>
                    <div className='md:col-span-8'>
                      {
                        chapter.articles && chapter.articles.map((article, index2) =>
                          <div key={index2} id={`article-${article.id}`} 
                            ref={el => scrollRef.current[article.id] = el }>
                            <div className={`article-detail`}>
                              <div className={`text-xl font-bold text-center  
                                py-3 my-5 shadow-mdd border-t-2 bg-red-200 text-red-600 shadow-gray-400`}>
                                {index2+1}. {article.hindi_title}
                              </div>
                              {/* <div className={`text-xl font-bold text-red-600 shadow-xll shadow-gray-300 mb-2 
                                bg-red-200 p-2 border-b`}>
                                {index+1}. {article.hindi_title}
                              </div> */}
                              <div className={`text-xl px-2 leading-10 mb-8 border-b border-stone-300 
                                shadow-xl shadow-gray-300 pb-4 text-slate-800`}>
                                {<div dangerouslySetInnerHTML={{__html: article.content}} />}
                              </div>
                            </div>
                          </div>
                        )
                      }
                    </div>
                    <div className='md:col-span-2'></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PBCompileScriptureShow;
///pb/scriptures/:id/cs_articles