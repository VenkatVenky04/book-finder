"use client";
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import BookModal from './components/BookModal';
import BookCard from './components/BookCard';

export default function Home() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [visibleCount, setVisibleCount] = useState(20);


  const fetchBooks = async (query) => {
    if (!query) return;
    setLoading(true);
    setError("");
    setBooks([]);
    setVisibleCount(20);

    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await res.json();

      if (!data.docs || data.docs.length === 0) {
        setError("No Books Found. Try Another Title..");
      }
      setBooks(data.docs)
    } catch (error) {
      setError("Something Went Wrong. Please Try Again..");
    } finally {
      setLoading(false);
    }
  }

  const handleShowMore = () => {
    setVisibleCount((pre) => pre + 20)
  }

  const closeModal = () => setSelectedBook(null);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">📚 Book Finder</h1>

      <SearchBar onSearch={fetchBooks} />

      {loading && <p className="mt-4 text-gray-600 text-2xl">Loading Books..</p>}
      {!loading && books.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.slice(0, visibleCount).map((book, index) => (
              <div onClick={() => setSelectedBook(book)}
                key={book.key || index}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={
                    book.cover_i
                      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                      : "https://via.placeholder.com/150x220?text=No+Cover"
                  }
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{book.title}</h3>
                  <p className="text-sm text-gray-600">
                    {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    First published: {book.first_publish_year || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < books.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleShowMore}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-2 rounded transition"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      )}

      {error && <p className="mt-4 text-red-600">{error}</p>}

      <div className='grid gap-6 mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {books.map((book) => {
          <BookCard key={book.key} book={book} onClick={() => { setSelectedBook(book) }} />
        })}
      </div>

      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </main>
  );
}
