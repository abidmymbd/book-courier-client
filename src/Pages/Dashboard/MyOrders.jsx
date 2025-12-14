import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const MyOrders = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return (
        <div className="flex justify-center items-center h-full">
            <button className="btn btn-square loading"></button>
        </div>
    );

    return (
        <div>

            <div className="p-6">
                <h2 className="text-2xl text-primary font-bold mb-6">My Orders</h2>

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Book Name</th>
                                <th>Price (BDT)</th>
                                <th>Status</th>
                                <th>Payment Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, idx) => (
                                <tr key={order._id}>
                                    <td>{idx + 1}</td>
                                    <td className='text-primary font-bold'>{order.bookName}</td>
                                    <td>{order.price}</td>
                                    <td>{order.status}</td>
                                    <td>{order.paymentStatus}</td>
                                    <td>
                                        <Link to={`/dashboard/payment/${order._id}`}>
                                            <button className="btn btn-sm bg-primary  text-white font-bold hover:bg-secondary hover:text-white  transform transition duration-300">
                                                Pay
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default MyOrders;