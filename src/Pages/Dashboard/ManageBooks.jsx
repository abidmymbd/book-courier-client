import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const ManageBooks = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch all books
    const { data: books = [] } = useQuery({
        queryKey: ['all-books'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-books'); // <-- নতুন endpoint
            return res.data;
        }
    });

    // Toggle Publish / Unpublish
    const toggleStatus = async (book) => {
        const newStatus = book.status === 'published' ? 'unpublished' : 'published';

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
                        queryClient.invalidateQueries(['all-books']);
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

    // Delete book
    const deleteBook = async (book) => {
        Swal.fire({
            title: `Are you sure you want to delete this book?`,
            text: `Book: "${book.name}"`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, delete it!`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/books/${book._id}`);
                    if (res.data.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: `Book "${book.name}" has been deleted.`,
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                        queryClient.invalidateQueries(['all-books']);
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete book.",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl text-primary font-bold mb-6">Manage Books</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Book Image</th>
                            <th>Book Name</th>
                            <th>Status</th>
                            <th>Toggle Publish</th>
                            <th>Actions</th>
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
                                        className={`btn btn-sm ${book.status === 'published' ? 'border border-secondary bg-white text-secondary hover:text-white hover:bg-secondary hover:border-secondary' : 'bg-primary text-white hover:bg-secondary'}`}
                                        onClick={() => toggleStatus(book)}
                                    >
                                        {book.status === 'published' ? 'Unpublish' : 'Publish'}
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => deleteBook(book)} className="btn btn-sm text-xl bg-red-500 text-white">
                                        <FiTrash2 />
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

export default ManageBooks;
