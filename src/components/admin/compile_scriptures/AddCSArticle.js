import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../shared/Pagination';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ReactTransliterate } from "react-transliterate";
import { 
  getAddArticlePageData, 
  getFilteredAritcles,
  addArticleInCS,
  removeArticleFromCS
} from '../../../actions/admin/admin_cs_scriptures';

const AddCSArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { 
    articleTypes, raags, contexts, authors, 
    scripture, chapters,
    articles, totalArticles, added_articles 
  } = useSelector( state => state.adminCSArticle );
  const [articleList, setArticleList] = useState(articles);
  const [totalArticle, setTotalArticle] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [searchAttrs, setSearchAttrs] = useState({});
  const [chapterExist, setChapterExist] = useState(false);
  
  useEffect( () => {
    dispatch(getAddArticlePageData(id));
  }, []);
  
  useEffect( () => {
    if(articles){ 
      setArticleList(articles); 
      setTotalArticle(totalArticles);
      setChapterExist(chapters && chapters.length > 0 ? true : false)
    }
  }, [articles, totalArticles]);

  const handlePageClick = (e) => {
    const page = e.target.getAttribute('value');
    setCurrentPage(page);
    const sAttrs = {...searchAttrs, page: page};
    setSearchAttrs(sAttrs);
    dispatch(getFilteredAritcles(scripture.id, sAttrs));
  }

  const onSearchInputChange = (event) => {
    const { name, value } = event.target;
    const sAttrs = {...searchAttrs, term: '', [name]: value, page: 1};
    setSearchAttrs(sAttrs);
    setCurrentPage(1);
    setTotalArticle(null);
    setSearchText('');
    dispatch(getFilteredAritcles(scripture.id, sAttrs));
  }
  const refreshFilteredData = () => {
    setSearchAttrs({});
    dispatch(getFilteredAritcles({}));
  }
  const addArticleIntoCS = (article_id) => {
    console.log(searchAttrs.chapter_id)
    if(chapterExist && 
        (searchAttrs.chapter_id == undefined || searchAttrs.chapter_id.length == 0)
    ){
      alert(
        `कृपया पहले "${scripture.name}" के अध्याय को सेलेक्ट करे।`
      );
    } else {
      dispatch(addArticleInCS(scripture.id, article_id, searchAttrs));
    }
  }
  const removeCSArticle = (article_id) => {
    dispatch(removeArticleFromCS(scripture.id, article_id, searchAttrs));
  }
  const searchArticles = () => {
    const sAttrs = {term: searchText.trim(), page: 1};
    setSearchAttrs(sAttrs);
    dispatch(getFilteredAritcles(scripture.id, sAttrs));
  }

  return (
    <div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          नवीन संकलन ({scripture && scripture.name }) में रचनायें जोड़े
        </div>
        <div className="grid md:grid-cols-5 mb-4 gap-2">
          <div>
            <select id="article_type_id" name="article_type_id" 
              value={searchAttrs.article_type_id ? searchAttrs.article_type_id : ''}
              onChange={onSearchInputChange}
              className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`}>
                <option value="">रचना प्रकार चुने</option>
                {
                  articleTypes && articleTypes.map( (aType, index) => 
                    <option key={index} value={aType.id}>{aType.name}</option>
                  )
                }
            </select>
          </div>
          <div>
            <select id="author_id" name="author_id" 
              value={searchAttrs.author_id ? searchAttrs.author_id : ''}
              onChange={onSearchInputChange}
              className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`}>
                <option value="">लेखक चुने</option>
                {
                  authors && authors.map( (author, index) => 
                    <option key={index} value={author.id}>{author.name}</option>
                  )
                }
            </select>
          </div>
          <div>
            <select id="context_id" name="context_id" 
              value={searchAttrs.context_id ? searchAttrs.context_id : ''}
              onChange={onSearchInputChange}
              className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`}>
                <option value="">प्रसंग चुने</option>
                {
                  contexts && contexts.map( (context, index) => 
                    <option key={index} value={context.id}>{context.name}</option>
                  )
                }
            </select>
          </div>
          <div>
            <select id="raag_id" name="raag_id" 
              value={searchAttrs.raag_id ? searchAttrs.raag_id : ''}
              onChange={onSearchInputChange}
              className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`}>
                <option value="">राग चुने</option>
                {
                  raags && raags.map( (raag, index) => 
                    <option key={index} value={raag.id}>{raag.name}</option>
                  )
                }
            </select>
          </div>
          <div className='flex items-center justify-center'>
            <button
              onClick={refreshFilteredData}
              className={`w-full md:w-auto flex items-center justify-center pt-2 pb-3 px-4 text-sm 
                font-medium text-white focus:outline-none bg-blue-600 rounded hover:bg-blue-700`} type="button">
              Refresh&nbsp;&nbsp;
              <svg className="w-[15px] h-[15px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-5 mb-4 gap-2">
          <div className='col-span-4'>
            <ReactTransliterate
              value={searchText}
              onChangeText={(text) => {setSearchText(text);}}
              lang={'hi'}
              type="text"
              className={`block w-full p-2 text-sm text-gray-900 border border-gray-300 
                rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
          </div>
          <div className='flex items-center justify-center'>
            <button
              onClick={searchArticles}
              className={`w-full md:w-auto flex items-center justify-center pt-2 pb-3 px-4 text-sm 
                font-medium text-white focus:outline-none bg-blue-600 rounded hover:bg-blue-700`} type="button">
              <svg className="w-[18px] h-[18px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
              </svg>&nbsp;&nbsp;Search
            </button>
          </div>
        </div>
        { chapters && chapters.length > 0 ? (
          <div className="grid md:grid-cols-12 mb-4 gap-6">
            <div className='col-start-7 col-span-2 pt-2 font-bold'>
              <span className='text-red-900'>
                { scripture.name }</span> के अध्याय 
            </div>
            <div className='col-span-4'>
              <select id="chapter_id" name="chapter_id" 
                value={searchAttrs.chapter_id ? searchAttrs.chapter_id : ''}
                onChange={e => setSearchAttrs(searchAttrs => ({...searchAttrs, chapter_id: e.target.value}))}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`}>
                  <option value="">लेखक चुने</option>
                  {
                    chapters && chapters.map( (chapter, index) => 
                      <option key={index} value={chapter.id}>{chapter.name}</option>
                    )
                  }
              </select>
            </div>
          </div>) : null
        }
        <div className='grid md:grid-cols-2 gap-6'>
          <div className="">
            <table className="w-full text-gray-500 dark:text-gray-400">
              <thead className="text-white uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr className="border-b dark:border-gray-700 bg-yellow-900">
                  <th scope="col" className="text-left px-2 py-3" colSpan="2">
                    Search Articles
                  </th>
                </tr>
              </thead>
              <tbody>
                {articleList && articleList.length > 0 ? (
                    articleList.map( (article, index) => 
                      <tr key={index}
                        className="border-b dark:border-gray-700 text-black" >
                        <td className="text-left px-2 py-3">
                          { ((currentPage-1) * 10) + index+1}. &nbsp; &nbsp;
                          {article.hindi_title} &nbsp; &nbsp;
                          <span className='font-bold text-red-600'>
                            ( {article.article_type} )
                          </span>
                        </td>
                        <td className="text-right px-2 py-2">
                          <button onClick={e => addArticleIntoCS(article.id)}
                            className='bg-blue-600 inline-flex px-2 py-1 cursor-pointer'>
                            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ) 
                  ) : (
                    <tr className="mt-4">
                      <td colSpan="5" className='text-center'>There is no data available now.</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          
            <nav className="flex flex-col md:flex-row justify-between text-sm items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              {
                (totalArticle > 0) &&
                <Pagination 
                  showWidget={3} 
                  totalItems={totalArticle}
                  itemsPerPage={10}
                  pageChangeHandler= {handlePageClick}
                />
              }
            </nav>
          </div>
          <div className="">
            <table className="w-full text-gray-500 dark:text-gray-400">
              <thead className="text-white uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr className="border-b dark:border-gray-700 bg-yellow-900">
                  <th scope="col" className="text-left px-2 py-3" colSpan="2">
                    <span className='text-green-400'>{scripture && scripture.name }</span> की रचनायें 
                  </th>
                  {/* <th scope="col" className="text-right px-2 py-3">गतिविधि</th> */}
                </tr>
              </thead>
              <tbody>
                {
                  added_articles && added_articles.length > 0 ? (
                    added_articles.map( (article, index) => 
                      <tr key={index}
                        className="border-b dark:border-gray-700 text-black" >
                        <td className="text-left px-2 py-3">
                          { ((currentPage-1) * 10) + index+1}. &nbsp; &nbsp;
                          {article.hindi_title} &nbsp; &nbsp;
                          <span className='font-bold text-red-600'>
                            ( {article.article_type} )
                          </span>
                        </td>
                        <td className="text-right px-2 py-2">
                          <button 
                            onClick={e => removeCSArticle(article.cs_article_id)}
                            className='bg-red-600 inline-flex px-2 py-1 cursor-pointer'>
                            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ) 
                  ) : (
                    <tr className="mt-4">
                      <td colSpan="5" className='text-center'>There is no data available now.</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCSArticle;