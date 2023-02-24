
export default function Pagination({nextPageCaller, prevPageCaller}){
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-end">
        <li className={`page-item ${!prevPageCaller && 'disabled'}`}>
          <a onClick={prevPageCaller} className="page-link" href="#" tabIndex="-1">Previous</a>
        </li>
        <li className="page-item">
          <a onClick={nextPageCaller} className="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  )
}