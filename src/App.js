import {useState, useEffect} from 'react';
import BreedList from './components/BreedList';
import Axios from 'axios';
import Pagination from './components/Pagination';
import Search from './components/Search';
import Back from './components/Back';
import './App.css';
function App() {
  const [Breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchMode, setSearchMode] = useState(false);
  const [hasError, setError] = useState(false);
  const pageLimit = 12;
  const baseUrl = 'https://api.thedogapi.com/v1/breeds';
  const config = {
    headers:{
      "x-api-key": "sa5ebCFdezf4LGE5rOQ3PH12niQWR4WP",
      "Content-Type": "application/json"
    }
  };
  const [currentPageUrl, setCurrentPageUrl] = useState(`${baseUrl}?limit=${pageLimit}&page=${currentPage}`);

  useEffect( () => {
    setLoading(true);
    Axios.get(currentPageUrl, config).then((response) => {
      setBreeds(response.data);
      setLoading(false);
      setError(false);
      const urlParams = new URLSearchParams(currentPageUrl);
      const page = parseInt(urlParams.get('page'));
      setPrevPageUrl(`${baseUrl}?limit=${pageLimit}&page=${page - 1}`);
      setNextPageUrl(`${baseUrl}?limit=${pageLimit}&page=${page + 1}`);
      setCurrentPage(page);
    } )
    .catch( (error) => {
      setLoading(false);
      setError(error.message);
    });
  }, [currentPageUrl]);  

  function nextPageCaller(){
    setCurrentPageUrl(nextPageUrl);
  }

  function prevPageCaller(){
    setCurrentPageUrl(prevPageUrl);
  }

  function currentPageCalller(){
    setCurrentPageUrl(`${baseUrl}?limit=${pageLimit}&page=${currentPage}`);
    setSearchMode(false);
  }

  function searchCaller(searchTerm){
    if(searchTerm.length == 0){
      currentPageCalller();
    }
    else{  
      setCurrentPageUrl(`${baseUrl}/search?q=${searchTerm}&limit=12&page=1`);
      setSearchMode(true);
    }
  }
  
  return (
    <div className="container ">
      <h1 className='text-center'>Dog search</h1>
      <Search searchCaller={searchCaller}/>
      <div style={{height:"30px"}}>
        { loading && <p className='text-danger text-center'>Loading...</p> }
        { hasError && <p className='text-danger text-center'>{hasError}</p> }
      </div>

      <div className="row">
        <div className='col-md-12 justify-content-right'>
          {
            searchMode ?  
            <Back currentPageCalller={currentPageCalller}/> :           
            <Pagination nextPageCaller={ nextPageCaller } prevPageCaller={currentPage <= 0 ? null : prevPageCaller} /> 
          }
        </div>
      </div>

      <div className="row justify-content-center">
        <BreedList Breeds={Breeds}/>
      </div>
    </div>
  );
}

export default App;