"use client";

const BookModal = ({ book, onClose }) => {
    console.log("Book Modal component", book);
    const coverUrl = book?.cover_i
        ? `https://covers.openlibrary.org/b/id/${book?.cover_i}-L.jpg`
        : "https://via.placeholder.com/200x300?text=No+Cover";

    return (
        <>
            <div className="fixed insert-0 bg-gray-300 bg-opacity-50 flex justify-center items-center z-50 p-2"
            style={{borderRadius: "8px"}}>
                <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
                    <button onClick={onClose}
                        className="absolute top-2 right-3 text-gray-500 hover:text-gray-800">
                        ✖
                    </button>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <img
                            src={coverUrl} alt={book?.title}
                            className="w-40 h-56 object-cover rounded" />

                        <div>
                            <h2 className="text-xl font-bold mb-2">
                                {book?.title}
                            </h2>
                            <p className="text-gray-600 mb-1">
                                <strong>Author:</strong>{"  "}
                                {book?.author_name ? book?.author_name.join(", ") : "Unknown"}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <strong>First Published:</strong>{" "}
                                {book?.first_publish_year || "—"}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <strong>Publisher:</strong>{" "}
                                {book?.publisher ? book?.publisher[0] : "—"}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <strong>Edition Count:</strong> {book?.edition_count}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default BookModal;