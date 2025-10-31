"use client";
export default function BookCard({ book, onClick }) {
    console.log("book data in card Component", book)
    const coverId = book.cover_i;
    const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : "https://via.placeholder.com/150x200?text=No+Cover";

    return (
        <>
            <div onClick={onClick}
                className="bg-white shadow hover:shadow-lg transition cursor-pointer rounded-lg overflow-hidden">
                <img src={coverUrl} alt={book.title} className="w-full h-56 object-cover" />
                <div className="p-3">
                    <h2 className="font-semibold text-lg text-gray-800 truncate">
                        {book.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {book.author_name ? book.author_name[0] : "Unknown Author"}
                    </p>
                    <p className="text-xs text-gray-400">
                        {book.first_publish_year || "-"}
                    </p>
                </div>
            </div>
        </>
    )
}