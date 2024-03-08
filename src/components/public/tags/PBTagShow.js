import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTagArticles } from '../../../actions/public/tags';

const PBTagShow = () => {
  const dispatch = useDispatch();
  const {name} = useParams();
  const { tag, tags, articles } = useSelector(state => state.tag);

  useEffect( ()=> {
    window.scrollTo({top: 0, behavior: 'instant'});
    dispatch(getTagArticles(name));
  }, [name]);

  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-span-12 lg:col-start-2 lg:col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
					टैग्स - {tag ? tag.name : 'NA'}
        </div>
        {
          <div className='text-2xl overflow-hidden mb-8'>
            <table className="w-full text-left text-gray-500 dark:text-gray-400">
							<thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr className="border-b dark:border-gray-700 bg-yellow-500">
									<th scope="col" className="px-2 py-3">क्रमांक</th>
									<th scope="col" className="px-2 py-3">रचना</th>
									<th scope="col" className="px-2 py-3">रचना प्रकार</th>
								</tr>
							</thead>
							<tbody className='text-xl'>
								{
									articles && articles.map( (article, index) =>
										<tr key={index}
											className="border-b dark:border-gray-700 text-blue-500" >
											<th scope="row" 
												className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
												{index+1}
											</th>
											<th scope="row" 
												className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
												{article.hindi_title}
											</th>
											<th scope="row" 
												className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
												{article.article_type}
											</th>
										</tr>
									)
								}
							</tbody>
						</table>
          </div>
        }
        <div className='mt-5 mb-3 text-2xl font-bold text-amber-700'>
          इनको भी पढ़े :-
        </div>
        <div className='text-blue-700 text-2xl px-6'>
          {
            tags.length > 0 ? tags.map( (tag, index) =>
              <Link key={index} to={`/pb/tags/${tag.name}`}>{tag.name}</Link>
            ).reduce((prev, curr) => [prev, ', ', curr]) : null
          }
        </div>
      </div>
    </div>
  );
};

export default PBTagShow;