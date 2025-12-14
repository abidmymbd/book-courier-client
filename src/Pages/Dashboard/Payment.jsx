import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Payment = () => {

    const { orderId } = useParams()
    const axiosSecure = useAxiosSecure()

    const { data: order = [], isLoading } = useQuery({
        queryKey: ['orders', orderId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${orderId}`);
            return res.data;
        }
    });

    if (isLoading) return (
        <div className="flex justify-center items-center h-full">
            <button className="btn btn-square loading"></button>
        </div>
    );

    return (
        <div className="p-6 text-center">
            <h2 className="text-2xl text-primary font-bold mb-6">Payment</h2>

            <h2 className="text-primary">Please Pay for : {order.bookName} </h2>
            <Link>
                <button className='btn bg-primary  text-white font-bold hover:bg-secondary hover:text-white  transform transition duration-300 mt-5'>Pay Now</button>
            </Link>

        </div>
    );
};

export default Payment;