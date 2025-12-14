import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user?.email}`);
            return res.data;
        }
    });

    const handleCancel = async (id) => {
        await axiosSecure.patch(`/orders/${id}/cancel`);
        refetch();
    };

    if (isLoading) return <div className="flex justify-center items-center h-full">
        <button className="btn btn-square loading"></button>
    </div>

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Book</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order, i) => (
                        <tr key={order._id}>
                            <td>{i + 1}</td>
                            <td className='text-primary font-semibold'>{order.bookName}</td>
                            <td>{order.price}</td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>{order.status}</td>
                            <td>{order.paymentStatus}</td>

                            <td className="space-x-2">
                                {order.status === 'pending' && order.paymentStatus === 'unpaid' && (
                                    <>
                                        <Link to={`/dashboard/payment/${order._id}`}>
                                            <button className="btn btn-sm bg-primary text-white font-bold hover:bg-secondary hover:text-white  transform transition duration-300">
                                                Pay Now
                                            </button>
                                        </Link>

                                        <button
                                            onClick={() => handleCancel(order._id)}
                                            className="btn btn-sm border border-secondary bg-white text-secondary hover:text-white hover:bg-secondary hover:border-secondary"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default MyOrders;