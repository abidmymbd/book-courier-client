import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const MyWishlist = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: wishlist = [], refetch } = useQuery({
        queryKey: ['wishlist', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist?email=${user?.email}`);
            return res.data;
        }
    });

    const handleRemove = async (id) => {
        const confirm = await Swal.fire({
            title: 'Remove?',
            text: 'Remove from wishlist?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes'
        });

        if (!confirm.isConfirmed) return;

        await axiosSecure.delete(`/wishlist/${id}`);
        refetch();
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl text-primary font-bold mb-6">My Wishlist</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Book Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlist.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td className='text-primary font-semibold'>{item.bookName}</td>
                                <td>
                                    <button
                                        onClick={() => handleRemove(item._id)}
                                        className="btn btn-sm border-secondary border rounded-lg text-secondary font-bold hover:bg-secondary hover:text-white hover:border-secondary transform transition duration-300">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {wishlist.length === 0 && (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No wishlist items
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyWishlist;
