import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router';

const LatestBooksSection = () => {
    const axiosSecure = useAxiosSecure();

    const { data: books = [] } = useQuery({
        queryKey: ['latest-books'],
        queryFn: async () => {
            const res = await axiosSecure.get('/books/latest');
            return res.data;
        },
    });

    return (
        <div className="my-20">
            {/* Section Heading */}
            <div className="text-center my-10">
                <p className="text-secondary text-lg">New Books</p>
                <h2 className="text-primary text-4xl font-bold">Latest Books Section</h2>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {books.map((book) => (
                    <div
                        key={book._id}
                        className="bg-white shadow rounded-lg p-4 hover:bg-[#fff3f6] transition transform duration-300 flex flex-col justify-between"
                    >
                        {/* Book Info */}
                        <div>
                            <img
                                src={book.image}
                                alt={book.name}
                                className="w-full h-48 object-contain rounded mb-5"
                            />
                            <h3 className="text-xl font-bold mt-2">{book.name}</h3>
                            <p className="text-gray-600 mt-1">Author: {book.author}</p>
                            <p className="text-gray-600 mt-1">Price: {book.price} BDT</p>
                        </div>

                        {/* View Details Button */}
                        <div className="mt-4 text-right">
                            <Link to={`/books/${book._id}`}>
                                <button className="border-primary border py-1.5 px-6 rounded-lg text-primary font-bold hover:bg-secondary hover:text-white hover:border-secondary transform transition duration-300 text-sm">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show All Books Button */}
            <div className="text-center">
                <Link to="/books">
                    <button className="my-10 border-primary border py-2 px-10 rounded-lg text-primary font-bold hover:bg-secondary hover:text-white hover:border-secondary transform transition duration-300">
                        Show All Books
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LatestBooksSection;
