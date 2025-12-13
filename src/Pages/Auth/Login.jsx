import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (data) => {
        console.log('form data', data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>

            <form className='card-body' onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">
                    <h3 className="text-3xl text-center text-primary font-bold">Welcome back</h3>
                    <p className='text-center text-xl font-semibold text-primary'>Please Login</p>

                    {/* email */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input w-full" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>Email is required.</p>}
                    {/* password */}
                    <label className="label">Password</label>
                    <input type="password"  {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                    })} className="input w-full" placeholder="Password" />
                    {errors.password?.type === 'required' && <p className='text-red-500'>Password is required.</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-500'>
                        Password must be 6 characters or longer
                    </p>}
                    {errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have at least one uppercase, at least one lowercase, at least one number, and at least one special characters</p>}

                    <button className="btn btn-primary text-white mt-4 hover:bg-secondary hover:text-white transition-all duration-200 delay-100 border-none">Login</button>
                </fieldset>
                <p>New to Book Courier ?<Link
                    state={location.state}
                    className='text-blue-400 underline'
                    to="/register">Register</Link>
                </p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;