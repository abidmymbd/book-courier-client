import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import axios from 'axios';

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, reset, watch } = useForm();


    const fetchBook = async () => {
        try {
            const res = await axiosSecure.get(`/books/${id}`);
            reset(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to load book data"
            });
            navigate('/dashboard/my-added-books');
        }
    };

    
    if (loading) fetchBook();

    const onSubmit = async (data) => {
        try {
            let imageURL = data.image;

            if (data.image[0] instanceof File) {
                const formData = new FormData();
                formData.append("image", data.image[0]);
                const imageAPIURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_bb}`;
                const imgRes = await axios.post(imageAPIURL, formData);
                imageURL = imgRes.data.data.display_url;
            }

            const updatedBook = {
                name: data.name,
                author: data.author,
                price: parseFloat(data.price),
                status: data.status.toLowerCase(),
                description: data.description,
                image: imageURL,
            };

            await axiosSecure.patch(`/books/${id}`, updatedBook);

            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Book updated successfully",
                timer: 2000,
                showConfirmButton: false
            });

            navigate('/dashboard/my-added-books');
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to update book"
            });
        }
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-6">Edit Book</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="font-semibold">Book Name</label>
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold">Author</label>
                    <input
                        type="text"
                        {...register("author", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold">Price (BDT)</label>
                    <input
                        type="number"
                        {...register("price", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold">Status</label>
                    <select
                        {...register("status", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="published">Published</option>
                        <option value="unpublished">Unpublished</option>
                    </select>
                </div>

                <div>
                    <label className="font-semibold">Description</label>
                    <textarea
                        {...register("description", { required: true })}
                        className="textarea textarea-bordered w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold">Book Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        className="file-input file-input-bordered w-full"
                    />
                    {typeof watch("image") === "string" && (
                        <img src={watch("image")} alt="Book" className="w-24 h-24 mt-2" />
                    )}
                </div>

                <button
                    type="submit"
                    className="btn bg-primary text-white hover:bg-secondary border-none w-full mt-4"
                >
                    Update Book
                </button>
            </form>
        </div>
    );
};

export default EditBook;
