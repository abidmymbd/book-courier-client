import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from 'recharts';

const Statistics = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch users
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // Fetch orders
    const { data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders');
            return res.data;
        }
    });

    // Fetch payments
    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        }
    });

    // Prepare chart data
    const ordersByStatus = ['pending', 'cancelled', 'completed'].map(status => ({
        status,
        count: orders.filter(o => o.status === status).length
    }));

    const paymentsByStatus = [
        { name: 'Paid', value: payments.filter(p => p.paymentStatus === 'paid').length },
        { name: 'Unpaid', value: payments.filter(p => p.paymentStatus !== 'paid').length }
    ];

    const userSignupData = users
        .map(u => ({ date: new Date(u.createdAt).toLocaleDateString() }))
        .reduce((acc, curr) => {
            const existing = acc.find(a => a.date === curr.date);
            if (existing) existing.count += 1;
            else acc.push({ date: curr.date, count: 1 });
            return acc;
        }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <section className="py-10 bg-gray-50 w-11/12 mx-auto">
            <div className="text-center mb-10">
                <p className="text-secondary text-lg">Statistics</p>
                <h2 className="text-primary text-4xl font-bold">Our Platform Data</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                {/* Line Chart: Users Signups */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-2xl transition">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
                        User Signups Over Time
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={userSignupData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart: Orders Status */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-2xl transition">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
                        Orders by Status
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={ordersByStatus}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="status" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#00C49F" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart: Payments */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-2xl transition md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
                        Payments Status
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={paymentsByStatus}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {paymentsByStatus.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default Statistics;
