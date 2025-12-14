import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {

    const axiosSecure = useAxiosSecure()
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    // console.log(sessionId)

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)
                })
        }
    }, [sessionId, axiosSecure])

    return (
        <div className="p-6 text-center">
            <h2 className="text-3xl text-primary font-bold mb-2">Payment Successful</h2>
        </div>
    );
};

export default PaymentSuccess;