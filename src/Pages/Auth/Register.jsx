import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import axios from 'axios';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { registerUser, updateUserProfile } = useAuth()

    const location = useLocation();
    const navigate = useNavigate();

    const handleRegistration = (data) => {
        console.log('after register', data.photo[0]);
        const profilePic = data.photo[0];

        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user);

                const formData = new FormData();
                formData.append('image', profilePic);

                const imageAPIURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_bb}`

                axios.post(imageAPIURL, formData)
                    .then(res => {
                        console.log('after image upload', res.data.data.url)

                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }

                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('profile updated')
                                navigate(location.state || '/');
                            })
                            .catch(error => console.log(error))
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <form className='card-body' onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                    <h3 className="text-3xl text-center text-primary font-bold">Don't Have an Account</h3>
                    <p className='text-center text-xl font-semibold text-primary'>Please Register</p>

                    {/* name field */}
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input w-full" placeholder="Your Name" />
                    {errors.name?.type === 'required' && <p className='text-red-500'>Name is required.</p>}

                    {/* photo image field */}
                    <label className="label">Photo</label>

                    <input type="file" {...register('photo', { required: true })} className="file-input  w-full" placeholder="Your Photo" />

                    {errors.name?.type === 'required' && <p className='text-red-500'>Photo is required.</p>}

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

                    <button className="btn btn-primary text-white mt-4">Register</button>
                </fieldset>
                <p>Already Have an Account?<Link
                    state={location.state}
                    className='text-blue-400 underline'
                    to="/login">Login</Link>
                </p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;