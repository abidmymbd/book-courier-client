import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div className="p-6 text-center">
            <h2 className="text-3xl text-secondary font-bold mb-6">Payment Cancelled</h2>
            <h2 className="text-2xl text-primary font-semibold mb-15">Please try again</h2>
            <Link to='/dashboard/my-orders'>
                <button className="btn btn-xl bg-primary py-5 px-15 text-white font-bold hover:bg-secondary hover:text-white  transform transition duration-300">Go Back to My Orders</button>
            </Link>
        </div>
    );
};

export default PaymentCancel;