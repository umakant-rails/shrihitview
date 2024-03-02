import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ITEM_PER_PAGE } from '../../../utils/types';
import Pagination from '../../shared/Pagination';
import { getScripture, getChapterArticles, deleteScrArticle } from '../../../actions/admin/admin_scriptures';

const ScriptureShow = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  const { scripture, sections, chapters, total_articles, articles, current_page } = useSelector( state => state.adminScripture);
  const [articleList, setArticleList] = useState([]);
  const [chapterList, setChapterList] = useState([]);
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [totalArticleQnty, setTotalArticleQnty] = useState(total_articles);
  const [currentPage, setCurrentPage] = useState(current_page || 1);
  const [searchAttr, setSearchAttr] = useState({page: 1});

  useEffect( () => {
    dispatch(getScripture(id));
  }, [id]);

  useEffect( () => {
    if(articles){
      setArticleList(articles);
      setTotalArticleQnty(total_articles);
      if(selectedChapterId === ''){
        setChapterList(chapters);
      }
      setCurrentPage(current_page);
    }
  }, [articles])

  const handlePageClick = (event) => {
    const page = parseInt(event.target.getAttribute('value'));
    let sAttrs = {...searchAttr, page: page};
    setSearchAttr(sAttrs);
    dispatch(getChapterArticles(scripture.id, sAttrs));
  };
 
  const filterChapters = (e) => {
    let sectionId = e.target.value;
    
    if(sectionId) {
      setSearchAttr(searchAttr => ({...searchAttr, section_id: sectionId}));
      let filteredChapter = chapters.filter((chapter) => sectionId+'' === chapter.parent_id+'');
      setChapterList(filteredChapter);
    } else {
      setChapterList(chapters);
      let sAttrs = {...searchAttr, chapter_id: ''};
      setSearchAttr(searchAttr => ({...searchAttr, chapter_id: ''}));
      dispatch(getChapterArticles(scripture.id, sAttrs));
    }
    setSelectedChapterId('');
  }

  const fetchChapterArticles = (event) => {
    let chapterId = event.target.value;
    setSelectedChapterId(chapterId);
  
    let sAttrs = {...searchAttr, chapter_id: chapterId};
    setSearchAttr(searchAttr => ({...searchAttr, chapter_id: chapterId}));
    dispatch(getChapterArticles(scripture.id, sAttrs));
  }

  const deleteScriptureArticle = (article_id) => {
    dispatch(deleteScrArticle(scripture.id, article_id, searchAttr));
  }

  return (
    <div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 p-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          रसिक वाणी/ग्रन्थ - {scripture && scripture.name}
        </div>

        <section className="bg-gray-50 dark:bg-gray-900 ">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2"></div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <select id="section_id" name="section_id" 
                    // value={formValues.chapter_id || ''}
                    onChange={filterChapters}
                    className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                      rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                      dark:shadow-sm-light`}>
                      <option value="">सेक्शन चुने</option>
                      {
                        sections && sections.map( (section, index) => 
                          <option key={index} value={section.id}>{section.name}</option>
                        )
                      }
                  </select>
                  <select id="chapter_id" name="chapter_id" 
                    value={selectedChapterId}
                    onChange={fetchChapterArticles}
                    className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                      rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                      dark:shadow-sm-light`}>
                      <option value="">अध्याय चुने</option>
                      {
                        chapterList && chapterList.map( (chapter, index) => 
                          <option key={index} value={chapter.id}>{chapter.name}</option>
                        )
                      }
                  </select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto min-h-72 px-4">
              <table className="w-full text-left text-gray-500 dark:text-gray-400">
                <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="border-b dark:border-gray-700 bg-yellow-500">
                  <th scope="col" className="px-2 py-3">क्रमांक</th>
                    <th scope="col" className="px-2 py-3">रचना</th>
                    <th scope="col" className="px-2 py-3">अनुक्रम</th>
                    <th scope="col" className="px-2 py-3">रचना प्रकार</th>
                    <th scope="col" className="px-2 py-3 text-center">गतिविधि</th>
                  </tr>
                </thead>
                <tbody className='text-xl'>
                  {
                    articleList && articleList.length > 0 ? articleList.map( (article, index) => 
                      <tr key={index}
                        className="border-b dark:border-gray-700" >
                        <td className='px-2 py-3'>{(currentPage-1)*10 + (index+1)}</td>
                        <td className="px-2 py-3">
                          {<div dangerouslySetInnerHTML={{__html: article.content}} />}
                        </td>
                        <td className="px-2 py-3">
                          {article.index}
                        </td>
                        <td className="px-2 py-3">
                          {article.article_type_id}
                        </td>
                        <td className="px-2 py-3 flex items-center  justify-center">
                          <Link to={`/admin/scriptures/${scripture.id}/scripture_articles/${article.id}/edit`}>
                            <svg className="w-[30px] h-[30px] text-blue-500 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"/>
                            </svg>
                          </Link>
                          <Link to="#" onClick={e => deleteScriptureArticle(article.id)}>
                            <svg className="w-[30px] h-[30px] text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                          </Link>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="4" className='text-center py-5'>
                          There is no articles available.
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              {
                totalArticleQnty ? (
                  <Pagination 
                    showWidget={5} 
                    totalItems={totalArticleQnty}
                    itemsPerPage={ITEM_PER_PAGE}
                    pageChangeHandler= {handlePageClick}
                  />) : ''
              }
            </nav>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default ScriptureShow;