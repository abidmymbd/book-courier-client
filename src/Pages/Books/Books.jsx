import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Books = () => {
    const axiosSecure = useAxiosSecure();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axiosSecure.get('/books')
            .then(res => setBooks(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book) => (
                <div key={book._id} className="bg-white shadow rounded-lg p-4">
                    <img src={book.image} alt={book.name} className="w-full h-48 object-cover rounded" />
                    <h3 className="text-xl font-bold mt-2">{book.name}</h3>
                    <p className="text-sm text-gray-600">Author: {book.author}</p>
                    <p className="text-sm text-gray-600">Price: {book.price} BDT</p>
                    <p className="text-sm text-gray-600">Status: {book.status}</p>
                    <p className="mt-2 text-gray-700">{book.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Books;
