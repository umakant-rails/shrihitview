import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ITEM_PER_PAGE } from '../../../utils/types';
import Pagination from '../../shared/Pagination';
import { 
  showCSScripture, 
  getArticleForIndexing, 
  updateIndex, 
  deleteCSArticle,
} from '../../../actions/admin/admin_cs_scriptures';


const CSScriptureShow = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  const { scripture, chapters, chapter, total_articles, articles, current_page } = useSelector( state => state.adminCSArticle);
  const [articleList, setArticleList] = useState([]);
  const [chapterList, setChapterList] = useState();
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [totalArticleQnty, setTotalArticleQnty] = useState(total_articles);
  const [currentPage, setCurrentPage] = useState(current_page || 1);
  const [searchAttrs, setSearchAttrs] = useState({page: 1});

  useEffect( () => {
    dispatch(showCSScripture(id, searchAttrs));
  }, [dispatch, searchAttrs, id]);

  useEffect( () => {
    if(articles){
      let chapter_id = chapter && chapter.id;
      setArticleList(articles);
      setTotalArticleQnty(total_articles);
      setChapterList(chapters);
      setSearchAttrs(searchAttrs => ({...searchAttrs, chapter_id: chapter_id}))
      setCurrentPage(current_page);
      setSelectedChapterId(chapter_id);
    }
  }, [articles, total_articles, chapters, chapter, current_page])

  const handlePageClick = (event) => {
    const page = parseInt(event.target.getAttribute('value'));
    if(page.toString() !== currentPage){
      let sAttrs = {...searchAttrs, page: page};
      setCurrentPage(page);
      setSearchAttrs(sAttrs);
      dispatch(getArticleForIndexing(scripture.id, sAttrs));
    }
  };
 
  const fetchChapterArticles = (event) => {
    let chapterId = event.target.value;
    setSelectedChapterId(chapterId);
    let sAttrs = {...searchAttrs, chapter_id: chapterId, page: 1};
    setSearchAttrs(searchAttrs => ({...searchAttrs, chapter_id: chapterId}));
    dispatch(getArticleForIndexing(scripture.id, sAttrs));
  }
  const updateToIndex = (e, article_id) =>{
    let newIndex = e.target.previousSibling.value;
    let sAttrs = {...searchAttrs, article_id: article_id, index: newIndex}
    dispatch(updateIndex(scripture.id, sAttrs));
    e.target.previousSibling.value = '';
  }
  const removeCSArticle = (article_id) => {
    let sAttrs = {...searchAttrs, article_id: article_id}
    dispatch(deleteCSArticle(scripture.id, sAttrs));
  }

  return (
    <div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 p-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          संकलन ग्रन्थ - {scripture && scripture.name}
        </div>

        <section className="bg-gray-50 dark:bg-gray-900 ">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            {
              chapterList && chapterList.length > 0 ? (
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                  <div className="w-full md:w-1/2"></div>
                  <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <div className="flex items-center space-x-3 w-full md:w-auto">
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
              ) : null
            }
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
                          {article.hindi_title}
                        </td>
                        <td className="px-2 py-3">
                          {article.index}
                        </td>
                        <td className="px-2 py-3">
                          {article.article_type}
                        </td>
                        <td className="px-2 py-3 flex items-center  justify-center">
                          <div className='mr-2'>
                            <input type="number" className="w-20 mr-3 rounded px-2 py-1"/>
                            <button onClick={e => updateToIndex(e, article.id)}
                              className="bg-blue-500 text-white rounded px-3 py-1">
                              अनुक्रम बदलें
                            </button>
                          </div>
                          <Link to="#" onClick={e => removeCSArticle(article.id)}>
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

export default CSScriptureShow;