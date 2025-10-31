"use client";
import React, { useState } from 'react';

const SearchBar = ({onSearch}) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!query.trim()) return; 
        onSearch(query.trim());
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='flex w-full max-w-md'>
                <input type="text" placeholder='Search For Books..'
                    value={query}
                    onChange={(e) => { setQuery(e.target.value) }}
                    className='border flex-grow border-indigo-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500' />
                <button type='submit' onClick={handleSubmit}
                    className='bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700'>
                    Search
                </button>
            </form>
        </>
    )

}
export default SearchBar;