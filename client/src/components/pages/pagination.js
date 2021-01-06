import React from 'react'


const pagination = ({postsPerPage,totalPosts, paginate}) => {
    const pageNumber= []

    for(let i=1;i<=Math.ceil(totalPosts/postsPerPage);i++){
        pageNumber.push(i)
    }
    return (
        <nav>
            <ul className='pagination'>
                {
                    pageNumber.map(number=> (
                        <li  key={number} className='page-item'>
                            <a  onClick={()=> paginate(number)} className='page-link'>{number}</a>
                        </li>
                    ))
                }
            </ul>

        </nav>
    )
}

export default pagination
