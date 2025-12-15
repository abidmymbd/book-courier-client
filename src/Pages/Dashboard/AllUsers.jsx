import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

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
        await axiosSecure.patch(`/users/${id}/role`, { role });
        refetch();
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
                                <td className='text-primary font-bold'>{user.displayName}</td>
                                <td>{user.email}</td>
                                <td className="capitalize font-semibold">
                                    {user.role}
                                </td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() =>
                                            handleRoleChange(user._id, 'librarian')
                                        }
                                        className="btn btn-xs btn-outline btn-primary"
                                    >
                                        Make Librarian
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleRoleChange(user._id, 'admin')
                                        }
                                        className="btn btn-xs btn-outline btn-secondary"
                                    >
                                        Make Admin
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

export default AllUsers;
