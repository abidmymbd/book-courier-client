import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Orders = () => {
    const axiosSecure = useAxiosSecure();

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders');
            return res.data;
        }
    });

    const handleCancel = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        });

        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/orders/${id}`);
            if (res.data.success) {
                Swal.fire(
                    'Cancelled!',
                    'The order has been cancelled.',
                    'success'
                );
                refetch();
            }
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        const res = await axiosSecure.patch(`/orders/${id}/status`, { status: newStatus });
        if (res.data.success) {
            Swal.fire(
                'Updated!',
                'Order status updated.',
                'success'
            );
            refetch();
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center h-full">
            <button className="btn btn-square loading"></button>
        </div>
    );

    return (
        <div className="p-6">
            <h2 className="text-2xl text-primary font-bold mb-6">All Orders</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Book Name</th>
                            <th>Price (BDT)</th>
                            <th>Status</th>
                            <th>Payment Status</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, idx) => (
                            <tr key={order._id}>
                                <td>{idx + 1}</td>
                                <td className='text-primary font-semibold'>{order.bookName}</td>
                                <td>{order.price}</td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className="select select-bordered select-sm w-full max-w-xs">
                                        <option value="pending">Pending</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </td>
                                <td>{order.paymentStatus}</td>
                                <td>
                                    <button
                                        onClick={() => handleCancel(order._id)}
                                        className="btn btn-sm border-primary border rounded-lg text-primary font-bold hover:bg-secondary hover:text-white hover:border-secondary transform transition duration-300">
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
