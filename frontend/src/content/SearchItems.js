import React from 'react'
import '../App.css'
// import { FaSearch } from 'react-icons/fa'

const SearchItems = ({search, setSearch}) => {
  return (
    <form className = "searchForm">
          <input 
              type="text"
              placeholder='Search'
              id='searchItem'
              autoFocus
              required 
              value = {search} 
              // controlling the input
              onChange = {(e)=>setSearch(e.target.value)}       
          />
          {/* <button>
            <FaSearch/>
          </button> */}
        </form>
  )
}

export default SearchItems
