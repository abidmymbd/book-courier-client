import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const AddBooks = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const handleAddBook = (data) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to add this book?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Upload image
                    const imageFile = data.image[0];
                    const formData = new FormData();
                    formData.append("image", imageFile);

                    const imageAPIURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_bb}`;

                    const imgRes = await axios.post(imageAPIURL, formData);
                    const imageURL = imgRes.data.data.display_url;

                    // Build book data
                    const bookInfo = {
                        name: data.name,
                        author: data.author,
                        price: parseFloat(data.price),
                        status: data.status.toLowerCase(),
                        description: data.description,
                        image: imageURL,
                        email: user.email,
                        createdAt: new Date(),
                    };

                    // Save book
                    axiosSecure.post('/books', bookInfo)
                        .then(res => {
                            console.log(res.data);
                        });

                    // Show success
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Book "${data.name}" added successfully!`,
                        showConfirmButton: false,
                        timer: 2000,
                    });

                    reset();
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong while adding the book.",
                        icon: "error",
                    });
                }
            }
        });
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-6">
                Add a New Book
            </h2>

            <form onSubmit={handleSubmit(handleAddBook)} className="space-y-4">

                {/* User Email */}
                <div>
                    <label className="font-semibold">User Email</label>
                    <input
                        type="email"
                        defaultValue={user?.email}
                        readOnly
                        {...register("email")}
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Book Name */}
                <div>
                    <label className="font-semibold">Book Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Book name is required" })}
                        className="input input-bordered w-full"
                        placeholder="Enter book name"
                    />
                </div>

                {/* Author */}
                <div>
                    <label className="font-semibold">Author</label>
                    <input
                        type="text"
                        {...register("author", { required: "Author name is required" })}
                        className="input input-bordered w-full"
                        placeholder="Book author"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="font-semibold">Price (BDT)</label>
                    <input
                        type="number"
                        {...register("price", { required: "Price is required" })}
                        className="input input-bordered w-full"
                        placeholder="Book price"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="font-semibold">Status</label>
                    <select
                        {...register("status", { required: "Status is required" })}
                        className="select select-bordered w-full"
                    >
                        <option value="published">Published</option>
                        <option value="unpublished">Unpublished</option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="font-semibold">Description</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className="textarea textarea-bordered w-full"
                        placeholder="Write a short description"
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="font-semibold">Book Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image", { required: "Book image is required" })}
                        className="file-input file-input-bordered w-full"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn bg-primary text-white hover:bg-secondary border-none w-full mt-4"
                >
                    Add Book
                </button>
            </form>
        </div>
    );
};

export default AddBooks;
