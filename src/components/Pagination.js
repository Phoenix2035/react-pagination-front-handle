import React, { useState, useEffect } from 'react'



const renderData = data => {
    return (
        <ul>
            {
                data.map(item =>
                    <li key={item.id}>{item.title}</li>
                )
            }
        </ul>
    )
}

const Pagination = () => {
    const [data, setData] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    const [pageNumberLimit, setPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)



    const pages = []
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pages.push(i)
    }

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li key={number} id={number} onClick={e => setCurrentPage(Number(e.target.id))} className={currentPage === number ? "active" : null}>
                    {number}
                </li>
            )
        } else {
            return null
        }
    })


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => setData(json))
    }, [])


    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1)

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }

    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1)

        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }

    let pageIncrementBtn = null
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextBtn}>&hellip;</li>
    }

    let pageDecrementBtn = null
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevBtn}>&hellip;</li>
    }


    const handleLoadMore = () => {
        setItemsPerPage(itemsPerPage + 5)
    }


    return (
        <>
            <h1>Todo List</h1> <br />

            {renderData(currentItems)}
            <ul className="pageNumbers">
                <li>
                    <button onClick={handlePrevBtn} disabled={currentPage === pages[0]}>
                        Prev
                    </button>
                </li>
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}
                <li>
                    <button onClick={handleNextBtn} disabled={currentPage === pages[pages.length - 1]}>
                        Next
                    </button>
                </li>
            </ul>

            <button className="loadMore" onClick={handleLoadMore} disabled={currentPage === pages[pages.length - 1]}>
                Load More
            </button>
        </>
    )
}

export default Pagination
