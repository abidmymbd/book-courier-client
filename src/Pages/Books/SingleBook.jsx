import React, { useState } from 'react';
import { Link, useParams } from 'react-router';
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


    const { data: book = {}, isLoading } = useQuery({
        queryKey: ['book', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books/${id}`);
            return res.data;
        }
    });

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
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-full">
            <button className="btn btn-square loading"></button>
        </div>
    }


    return (
        <div className="max-w-3xl my-10 mx-auto p-6 bg-white shadow rounded">
            <img
                src={book.image}
                alt={book.name}
                className="w-full h-80 object-contain"
            />

            <h1 className="text-3xl text-primary font-bold mt-4">{book.name}</h1>
            <p className="text-xl mt-2">Author: {book.author}</p>
            <p className="text-xl font-bold mt-2">Price: {book.price} BDT</p>

            <p className="mt-4 text-gray-700">
                {book.description}
            </p>

            <div className='text-center'>
                <button
                    onClick={() => document.getElementById('order_modal').showModal()}
                    className="my-10 border-primary border py-2 px-10 rounded-lg text-primary font-bold hover:bg-secondary hover:text-white hover:border-secondary transform transition duration-300"> Order Now</button>
            </div>


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
                            <button type="submit" className="btn border-primary border py-2 px-10 rounded-lg text-primary font-bold hover:bg-secondary hover:text-white hover:border-secondary transform transition duration-300">
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

        </div>
    );
};

export default SingleBook;
