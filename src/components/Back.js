export default function({currentPageCalller}){
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-end">
        <li className="page-item">
          <a onClick={currentPageCalller} className="page-link" href="#">Back</a>
        </li>
      </ul>
    </nav>
  )
}