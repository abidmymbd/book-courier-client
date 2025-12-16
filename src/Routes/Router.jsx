import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import AddBooks from "../Pages/Dashboard/AddBooks";
import Books from "../Pages/Books/Books";
import MyAddedBooks from "../Pages/Dashboard/MyAddedBooks";
import EditBook from "../Pages/Dashboard/EditBook";
import SingleBook from "../Pages/Books/SingleBook";
import Orders from "../Pages/Dashboard/Orders";
import MyOrders from "../Pages/Dashboard/MyOrders";
import Payment from "../Pages/Dashboard/Payment";
import PaymentSuccess from "../Pages/Dashboard/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/PaymentCancel";
import MyProfile from "../Pages/Dashboard/MyProfile";
import Invoices from "../Pages/Dashboard/Invoices";
import AllUsers from "../Pages/Dashboard/AllUsers";
import ManageBooks from "../Pages/Dashboard/ManageBooks";
import MyWishlist from "../Pages/Dashboard/MyWishlist";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
                loader: () => fetch('/servicecenter.json').then(res => res.json()),
            },
            {
                path: 'books',
                Component: Books,
            },
            {
                path: 'books/:id',
                Component: SingleBook,
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('/servicecenter.json').then(res => res.json()),
            },
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login,
            },
            {
                path: 'register',
                Component: Register,
            },
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'add-book',
                Component: AddBooks,
            },
            {
                path: 'my-added-books',
                Component: MyAddedBooks,
            },
            {
                path: 'orders',
                Component: Orders,
            },
            {
                path: 'my-orders',
                Component: MyOrders,
            },
            {
                path: 'my-wishlist',
                Component: MyWishlist,
            },
            {
                path: 'payment/:orderId',
                Component: Payment,
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess,
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancel,
            },
            {
                path: 'edit-book/:id',
                Component: EditBook,
            },
            {
                path: 'my-profile',
                Component: MyProfile,
            },
            {
                path: 'invoices',
                Component: Invoices,
            },
            {
                path: 'all-users',
                Component: AllUsers,
            },
            {
                path: 'manage-books',
                Component: ManageBooks,
            },
        ]
    },
]);
