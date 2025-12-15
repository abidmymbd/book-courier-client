import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Payment = () => {
    const { orderId } = useParams();
    const axiosSecure = useAxiosSecure();

    const [loading, setLoading] = useState(false);

    // Fetch single order
    const { data: order = {}, isLoading } = useQuery({
        queryKey: ['order', orderId],
        enabled: !!orderId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${orderId}`);
            return res.data;
        }
    });

    const handlePayment = async () => {
        if (loading) return; // prevent double click
        setLoading(true);

        try {
            const paymentInfo = {
                price: order.price,
                orderId: order._id,
                userEmail: order.userEmail,
                bookName: order.bookName
            };

            const res = await axiosSecure.post(
                '/create-checkout-session',
                paymentInfo
            );

            window.location.href = res.data.url;
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <button className="btn btn-square loading"></button>
            </div>
        );
    }

    return (
        <div className="p-6 flex justify-center items-center min-h-screen">
            <div className="bg-white shadow rounded-lg p-8 w-full max-w-md text-center">

                <h2 className="text-2xl text-primary font-bold mb-4">
                    Payment
                </h2>

                <p className="text-lg mb-2">
                    Book: <span className="font-semibold">{order.bookName}</span>
                </p>

                <p className="text-lg mb-6">
                    Amount: <span className="font-bold">{order.price} BDT</span>
                </p>

                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="btn bg-primary text-white font-bold w-full hover:bg-secondary transition duration-300"
                >
                    {loading ? 'Redirecting to Payment...' : 'Pay Now'}
                </button>

            </div>
        </div>
    );
};

export default Payment;
