import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { FiEdit } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyAddedBooks = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: books = [] } = useQuery({
        queryKey: ['my-books', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/books?email=${user.email}`);
            return res.data;
        }
    });

    const toggleStatus = async (book) => {
        const newStatus = book.status === 'published' ? 'unpublished' : 'published';

        // SweetAlert confirm
        Swal.fire({
            title: `Are you sure you want to ${newStatus} this book?`,
            text: `Book: "${book.name}"`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${newStatus} it!`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/books/${book._id}/status`, { status: newStatus });
                    if (res.data.success) {
                        Swal.fire({
                            title: "Success!",
                            text: `Book "${book.name}" is now ${newStatus}.`,
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                        queryClient.invalidateQueries(['my-books', user.email]);
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to update book status.",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl text-primary font-bold mb-6">My Books</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Book Image</th>
                            <th>Book Name</th>
                            <th>Status</th>
                            <th>Toggle Publish</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book._id}>
                                <th>{index + 1}</th>
                                <td><img src={book.image} alt={book.name} className="w-14 h-14 object-cover rounded" /></td>
                                <td className="font-medium">{book.name}</td>
                                <td>
                                    <span className={`badge ${book.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                                        {book.status}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm"
                                        onClick={() => toggleStatus(book)}
                                    >
                                        {book.status === 'published' ? 'Unpublish' : 'Publish'}
                                    </button>
                                </td>
                                <td>
                                    <Link to={`/dashboard/edit-book/${book._id}`} className='text-primary text-lg'>
                                        <FiEdit />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAddedBooks;
