
export const showPagination = (list) => {
    const pageNumbers = [];
    const totalPosts = list.length;
    const postsPerPage=1
    const currentPage=1

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    const pagination = (pageNumbers) => {
        currentPage(pageNumbers)
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
                        <button onClick={() => pagination(number)} className="page-link"> {number} </button>
                    </li>
                ))}
            </ul>
        </nav>
    )

}
