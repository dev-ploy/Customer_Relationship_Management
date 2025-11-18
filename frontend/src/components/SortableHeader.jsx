import React from 'react'

const SortableHeader = ({ children, onSort, sortKey, currentSortKey, sortOrder }) => {
  const isSorted = sortKey === currentSortKey

  return (
    <th 
      onClick={() => onSort(sortKey)} 
      className="px-8 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-indigo-700 transition-colors duration-200"
    >
      <div className="flex items-center space-x-2">
        <span>{children}</span>
        {isSorted && (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            {sortOrder === 'asc' ? (
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            )}
          </svg>
        )}
      </div>
    </th>
  )
}

export default SortableHeader
