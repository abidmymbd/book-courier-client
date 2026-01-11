import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line
} from 'recharts';

const DashboardHome = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all dashboard data
    const { data: stats = {} } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/dashboard-stats');
            return res.data;
        },
    });

    const orderStatusData = [
        { name: 'Pending', value: stats.pendingOrders || 0 },
        { name: 'Completed', value: stats.completedOrders || 0 },
        { name: 'Cancelled', value: stats.cancelledOrders || 0 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

    return (
        <div className="p-6 space-y-10">
            {/* Welcome Header */}
            <h2 className="text-4xl text-primary font-bold text-center mb-10">
                Welcome to Dashboard
            </h2>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white shadow-lg p-5 rounded-xl text-center hover:shadow-xl transition">
                    <p className="text-gray-500">Total Books</p>
                    <p className="text-2xl font-bold text-primary">{stats.totalBooks || 0}</p>
                </div>
                <div className="bg-white shadow-lg p-5 rounded-xl text-center hover:shadow-xl transition">
                    <p className="text-gray-500">Total Orders</p>
                    <p className="text-2xl font-bold text-primary">{stats.totalOrders || 0}</p>
                </div>
                <div className="bg-white shadow-lg p-5 rounded-xl text-center hover:shadow-xl transition">
                    <p className="text-gray-500">Total Users</p>
                    <p className="text-2xl font-bold text-primary">{stats.totalUsers || 0}</p>
                </div>
                <div className="bg-white shadow-lg p-5 rounded-xl text-center hover:shadow-xl transition">
                    <p className="text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-primary">${stats.totalRevenue || 0}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pie Chart: Order Status */}
                <div className="bg-white p-5 shadow-lg rounded-xl">
                    <h3 className="text-xl font-bold text-gray-700 mb-5">Orders Status</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={orderStatusData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {orderStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Line Chart: Monthly Revenue */}
                <div className="bg-white p-5 shadow-lg rounded-xl">
                    <h3 className="text-xl font-bold text-gray-700 mb-5">Monthly Revenue</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={stats.monthlyRevenue || []}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white shadow-lg rounded-xl p-5">
                <h3 className="text-xl font-bold text-gray-700 mb-5">Recent Orders</h3>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th>Order ID</th>
                                <th>User</th>
                                <th>Book</th>
                                <th>Status</th>
                                <th>Payment</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentOrders?.map(order => (
                                <tr key={order._id} className="hover:bg-gray-50 transition">
                                    <td>{order._id.slice(-6)}</td>
                                    <td>{order.userEmail}</td>
                                    <td>{order.bookName}</td>
                                    <td>{order.status}</td>
                                    <td>{order.paymentStatus}</td>
                                    <td>${order.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
