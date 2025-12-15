import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleRoleChange = async (id, role) => {
        try {
            const res = await axiosSecure.patch(`/users/${id}/role`, { role });

            if (res.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Role Updated!',
                    text: `User is now ${role}`,
                    timer: 1500,
                    showConfirmButton: false,
                });
                refetch();
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update role',
            });
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <button className="btn btn-square loading"></button>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl text-primary font-bold mb-6">
                All Users
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, idx) => (
                            <tr key={user._id}>
                                <td>{idx + 1}</td>

                                <td className="font-bold text-primary">
                                    {user.displayName || 'N/A'}
                                </td>

                                <td>{user.email}</td>

                                <td className="capitalize font-semibold">
                                    {user.role}
                                </td>

                                <td className="space-x-2">

                                    {/* Make Librarian */}
                                    <button
                                        disabled={user.role === 'librarian'}
                                        onClick={() =>
                                            handleRoleChange(user._id, 'librarian')
                                        }
                                        className="btn btn-sm bg-primary text-white hover:bg-secondary"
                                    >
                                        Make Librarian
                                    </button>

                                    {/* Make Admin */}
                                    <button
                                        disabled={user.role === 'admin'}
                                        onClick={() =>
                                            handleRoleChange(user._id, 'admin')
                                        }
                                        className="btn btn-sm border border-secondary bg-white text-secondary hover:bg-secondary hover:text-white"
                                    >
                                        Make Admin
                                    </button>

                                    {/* Make User (only show if admin or librarian) */}
                                    {(user.role === 'admin' || user.role === 'librarian') && (
                                        <button
                                            onClick={() =>
                                                handleRoleChange(user._id, 'user')
                                            }
                                            className="btn btn-sm border border-black text-black"
                                        >
                                            Make User
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
