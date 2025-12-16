import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const SingleBook = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);

    // Fetch single book
    const { data: book = {}, isLoading: bookLoading } = useQuery({
        queryKey: ['book', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books/${id}`);
            return res.data;
        }
    });

    // Fetch user orders to check if they can review
    const { data: orders = [], refetch: refetchOrders } = useQuery({
        queryKey: ['userOrders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user?.email}`);
            return res.data;
        }
    });

    const hasOrdered = orders.some(order => order.bookId === id);

    // Fetch reviews safely (yellow-free)
    useEffect(() => {
        const fetchData = async () => {
            if (!book._id) return;
            try {
                const res = await axiosSecure.get(`/reviews?bookId=${book._id}`);
                setReviews(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [book._id, axiosSecure]);

    // Handle order submission
    const handleOrder = async (e) => {
        e.preventDefault();
        const orderData = {
            bookId: book._id,
            bookName: book.name,
            price: book.price,
            userName: user.displayName,
            userEmail: user.email,
            phone,
            address
        };

        try {
            const res = await axiosSecure.post('/orders', orderData);
            if (res.data.insertedId) {
                document.getElementById('order_modal').close();
                Swal.fire({
                    title: "Order placed",
                    text: "Order placed successfully!",
                    icon: "success"
                });
                setPhone('');
                setAddress('');
                refetchOrders(); // ✅ Refetch orders immediately to show review form
            }
        } catch (err) {
            console.error(err);
            Swal.fire({ title: "Error", text: "Failed to place order", icon: "error" });
        }
    };

    const handleAddToWishlist = async () => {
        if (!user) {
            return Swal.fire('Login required', 'Please login first', 'warning');
        }

        const wishlistItem = {
            bookId: book._id,
            bookName: book.name,
            userEmail: user.email
        };

        try {
            const res = await axiosSecure.post('/wishlist', wishlistItem);
            if (res.data.insertedId) {
                Swal.fire('Added!', 'Book added to wishlist', 'success');
            } else {
                Swal.fire('Info', 'Already in wishlist', 'info');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to add wishlist', 'error');
        }
    };


    // Handle review submission
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const reviewData = {
            bookId: book._id,
            userId: user.uid,
            userName: user.displayName,
            userEmail: user.email,
            rating,
            comment
        };

        try {
            const res = await axiosSecure.post('/reviews', reviewData);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Review Submitted",
                    text: "Thank you for your review!",
                    icon: "success"
                });
                setRating(5);
                setComment('');
                // Fetch reviews again after submission
                const res2 = await axiosSecure.get(`/reviews?bookId=${book._id}`);
                setReviews(res2.data);
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: error.response?.data?.message || "Failed to submit review",
                icon: "error"
            });
        }
    };

    if (bookLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <button className="btn btn-square loading"></button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl my-10 mx-auto p-6 bg-white shadow rounded">
            {/* Book Details */}
            <img
                src={book.image}
                alt={book.name}
                className="w-full h-80 object-contain"
            />
            <h1 className="text-3xl text-primary font-bold mt-4">{book.name}</h1>
            <p className="text-xl mt-2">Author: {book.author}</p>
            <p className="text-xl font-bold mt-2">Price: {book.price} BDT</p>
            <p className="mt-4 text-gray-700">{book.description}</p>

            {/* Order Button */}
            <div className='text-center'>
                <button
                    onClick={() => document.getElementById('order_modal').showModal()}
                    className="my-10 border-primary border py-2 px-10 rounded-lg text-primary font-bold hover:bg-secondary hover:text-white hover:border-secondary transform transition duration-300">
                    Order Now
                </button>

                <button
                    onClick={handleAddToWishlist}
                    className="ml-5 my-10 border-primary border py-2 px-10 rounded-lg text-primary font-bold hover:bg-secondary hover:text-white hover:border-secondary transform transition duration-300">
                    Add to Wishlist
                </button>
            </div>

            {/* Order Modal */}
            <dialog id="order_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl mb-4">Place Your Order</h3>
                    <form onSubmit={handleOrder} className="space-y-4">
                        <div>
                            <label className="label">Name</label>
                            <input
                                type="text"
                                value={user?.displayName}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label">Email</label>
                            <input
                                type="email"
                                value={user?.email}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label">Phone Number</label>
                            <input
                                type="text"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label">Address</label>
                            <textarea
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="textarea textarea-bordered w-full"
                            />
                        </div>
                        <div className="modal-action">
                            <button
                                type="submit"
                                className="btn border-primary border py-2 px-10 rounded-lg text-primary font-bold hover:bg-secondary hover:text-white hover:border-secondary transform transition duration-300">
                                Place Order
                            </button>
                            <button
                                type="button"
                                className="btn border-primary border"
                                onClick={() => document.getElementById('order_modal').close()}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* Review Form */}
            {hasOrdered && (
                <div className="mt-8 p-4 border rounded bg-gray-50">
                    <h3 className="text-xl text-primary font-bold mb-2">Give your review</h3>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div>
                            <label>Rating (1-5)</label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div>
                            <label>Comment</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="textarea textarea-bordered w-full"
                                required
                            />
                        </div>
                        <button type="submit" className="border-primary border py-2 px-10 rounded-lg text-primary font-bold hover:bg-secondary hover:text-white hover:border-secondary transform transition duration-300">
                            Submit Review
                        </button>
                    </form>
                </div>
            )}

            {/* Display Reviews */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4">Reviews</h3>
                {reviews.length === 0 && <p>No reviews yet.</p>}
                {reviews.map(review => (
                    <div key={review._id} className="border-b py-2">
                        <p className="font-bold">{review.userName} - {review.rating} / 5</p>
                        <p>{review.comment}</p>
                        <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SingleBook;
