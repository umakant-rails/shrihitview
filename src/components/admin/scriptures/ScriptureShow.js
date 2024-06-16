import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ITEM_PER_PAGE } from '../../../utils/types';
import Pagination from '../../shared/Pagination';
import { 
  getScripture, 
  getChapterArticles, 
  deleteScrArticle 
} from '../../../slices/admin/adminScriptureSlice';

const ScriptureShow = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  const { scripture, sections, chapters, total_articles, articles, current_page } = useSelector( state => state.adminScripture);
  // const [articleList, setArticleList] = useState([]);
  // const [chapterList, setChapterList] = useState([]);
  const [selectedChapterId, setSelectedChapterId] = useState('');
  // const [totalArticleQnty, setTotalArticleQnty] = useState(total_articles);
  // const [currentPage, setCurrentPage] = useState(current_page || 1);
  const [searchAttr, setSearchAttr] = useState({page: 1});

  useEffect( () => {
    dispatch(getScripture(id));
  }, [dispatch, id]);

  // useEffect( () => {
  //   console.log(scripture)
  //   if(articles){
  //     setArticleList(articles);
  //     setTotalArticleQnty(total_articles);
  //     if(selectedChapterId === ''){
  //       setChapterList(chapters);
  //     }
  //     setCurrentPage(current_page);
  //   }
  // }, [articles, total_articles, chapters, current_page, selectedChapterId ])
  useEffect( () => {
    console.log(scripture)
  }, [scripture]);
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
      // setChapterList(filteredChapter);
    } else {
      // setChapterList(chapters);
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
    const isTrue = window.confirm("Are you sure you want to delete this record ?");
    if(isTrue){  dispatch(deleteScrArticle(scripture.id, article_id, searchAttr)); }
  }

  return (
    <div className='grid md:grid-cols-12'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 p-5'>
        <div className={`bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 
          shadow-xl mb-5 font-bold text-center`}>
          रसिक वाणी/ग्रन्थ - {scripture && scripture.name}
        </div>
        <div className='grid md:grid-cols-12 mb-20'>
          <div className='col-start-2 col-span-10'>
            {scripture &&
              <section className="bg-gray-50 dark:bg-gray-900 text-xl text-gray-600">
                <div className="flex flex-col md:flex-row border-y border-gray-300">
                  <div className="w-full md:w-1/3 font-bold py-2 ps-2 border-r border-gray-300">रचनाओ की संख्या</div>
                  <div className="w-full md:w-auto py-2 ps-4">{scripture.total_articles}</div>
                </div>
                 <div className="flex flex-col md:flex-row border-b border-gray-300">
                  <div className="w-full md:w-1/3 font-bold py-2 ps-2 border-r border-gray-300">सेक्सन की संख्या</div>
                  <div className="w-full md:w-auto py-2 ps-4">{scripture.sections}</div>
                </div>
                 <div className="flex flex-col md:flex-row border-b border-gray-300">
                  <div className="w-full md:w-1/3 font-bold py-2 ps-2 border-r border-gray-300">अध्याय की संख्या</div>
                  <div className="w-full md:w-auto py-2 ps-4">{scripture.chapters}</div>
                </div>
                 <div className="flex flex-col md:flex-row border-b border-gray-300">
                  <div className="w-full md:w-1/3 font-bold py-2 ps-2 border-r border-gray-300">रचनाकार</div>
                  <div className="w-full md:w-auto py-2 ps-4">{scripture.author}</div>
                </div>
                <div className="flex flex-col md:flex-row border-b border-gray-300">
                  <div className="w-full md:w-1/3 font-bold py-2 ps-2 border-r border-gray-300">रचना का प्रकार</div>
                  <div className="w-full md:w-auto py-2 ps-4 ">{scripture.scripture_type}</div>
                </div>
                <div className="flex flex-col md:flex-row mt-5">
                  <div className="w-full md:w-1/3 font-bold py-2 ps-2"></div>
                  <div className="w-full md:w-auto py-2 ps-4 ">
                    <Link className='bg-blue-600 text-white rounded px-6 py-2.5 font-bold hover:bg-blue-800'
                      to={`/admin/scriptures/${scripture.id}/articles`}  
                    >
                      रचनायें देखें
                    </Link>
                  </div>
                </div>
              </section>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptureShow;