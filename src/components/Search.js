import {useRef} from 'react';
import '../css/Search.css';

export default function Search({searchCaller}){
  const inputElement = useRef();
  
  const handleCallback = () => {
    
    const fireSearchRequest = setTimeout( () => {
      searchCaller(inputElement.current.value);
    }, 2000);

    return () => clearTimeout(fireSearchRequest);
  }


  return (

    <div className="row height d-flex justify-content-center align-items-center">
      <div className="col-md-8">
        <div className="search">
          <i className="fa fa-search"></i>
          <input onChange={handleCallback} ref={inputElement} type="text" className="form-control" placeholder="Search for Dog Breed Here"/>
          {/* <button onClick={handleCallback} className="btn btn-primary">Search</button> */}
        </div>
      </div>
    </div>

  )
}