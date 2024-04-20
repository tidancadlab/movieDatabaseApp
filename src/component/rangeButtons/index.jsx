import React from 'react'
import {Link} from 'react-router-dom/cjs/react-router-dom'
import {useLocation} from 'react-router-dom'

function useQuery() {
  const {search} = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

const RangeButton = ({items, queryParams, className}) => {
  const movie = useQuery().get('movie')
  return (
    <div
      className={`flex gap-3 justify-end items-center my-4 px-2 text-white ${className}`}
    >
      <button
        aria-labelledby="btn"
        className="flex justify-center items-center group"
        type="button"
        disabled={items.page <= 1}
      >
        <Link
          to={{
            search: `page=${items.page - 1}`,
          }}
          className="border-2 border-white rounded p-2 group-disabled:opacity-25 group-disabled:pointer-events-none"
        >
          ⬅️
        </Link>
      </button>
      <p
        aria-current={parseInt(queryParams) === items.page}
        className="border-2 border-white rounded p-1 px-3 aria-[current=true]:bg-white aria-[current=true]:text-black"
      >
        {items.page}
      </p>
      <button
        aria-labelledby="btn"
        className="flex justify-center items-center group"
        type="button"
        disabled={
          items.page >= (items.totalPages > 500 ? 500 : items.totalPages)
        }
      >
        <Link
          to={{
            search: `${movie ? `movie=${movie}&` : ''}page=${items.page + 1}`,
          }}
          className="border-2 border-white rounded p-2 group-disabled:opacity-25 group-disabled:pointer-events-none"
        >
          ➡️
        </Link>
      </button>
    </div>
  )
}
export default RangeButton
