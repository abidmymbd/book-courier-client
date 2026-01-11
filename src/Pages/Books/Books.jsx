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

    const [searchTerm, setSearchTerm] = React.useState('');
    const [sortOption, setSortOption] = React.useState('date-new'); // default: newest first

    const filteredBooks = books
        .filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            switch (sortOption) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'date-new':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'date-old':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                default:
                    return 0;
            }
        });

    return (
        <div className='py-5'>
            {/* Search & Combined Sort */}
            <div className="mb-4 my-5 flex flex-col sm:flex-row gap-4 rounded items-center">
                <input
                    type="text"
                    placeholder="Search by book name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded flex-1"
                />

                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="date-new">Date: Newest First</option>
                    <option value="date-old">Date: Oldest First</option>
                </select>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {filteredBooks.map(book => (
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
        </div>
    );
};

export default Books;
