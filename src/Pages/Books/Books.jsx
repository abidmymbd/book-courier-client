import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router';

const Books = () => {
    const axiosSecure = useAxiosSecure();

    const { data: books = [] } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books`);
            return res.data;
        }
    });

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map(book => (
                <Link
                    to={`/books/${book._id}`}
                    key={book._id}
                    className="bg-white shadow rounded-lg p-4 hover:bg-[#fff3f6] transform transition duration-300 block cursor-pointer"
                >
                    <img
                        src={book.image}
                        alt={book.name}
                        className="w-full h-48 object-contain rounded"
                    />

                    <h3 className="text-xl font-bold mt-2">{book.name}</h3>

                    <p className="text-lg text-gray-600 font-bold my-2">
                        Author: {book.author}
                    </p>

                    <p className="text-sm text-gray-600 flex">
                        Price:
                        <span className="font-bold ml-2">{book.price} BDT</span>
                    </p>

                    <p className="mt-2 text-gray-700">
                        {book.description}
                    </p>
                </Link>
            ))}

        </div>
    );
};

export default Books;
