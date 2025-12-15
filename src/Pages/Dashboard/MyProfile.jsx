import React, { useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import axios from "axios";
import { auth } from "../../firebase.init";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [newName, setNewName] = useState("");
    const [newPhotoFile, setNewPhotoFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handlePhotoChange = (e) => {
        setNewPhotoFile(e.target.files[0]);
    };

    const handleUpdate = async () => {
        if (!newName && !newPhotoFile) return;

        setLoading(true);

        try {
            let photoURL = user.photoURL;


            if (newPhotoFile) {
                const formData = new FormData();
                formData.append("image", newPhotoFile);

                const imageAPIURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_bb}`;
                const response = await axios.post(imageAPIURL, formData);
                photoURL = response.data.data.display_url;
            }


            await updateProfile(auth.currentUser, {
                displayName: newName || user.displayName,
                photoURL: photoURL,
            });

            setNewName("");
            setNewPhotoFile("");
            window.location.reload();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-xl font-semibold">Loading user info...</h2>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center mt-10 w-11/12 mx-auto">
            <img
                src={user.photoURL || "avatar.png"}
                alt="User"
                className="w-32 h-32 rounded-full border-4 border-gray-300"
            />
            <h2 className="text-2xl my-3 font-bold">{user.displayName || "No Name"}</h2>
            <p className="text-gray-600">{user.email}</p>

            <div className="card bg-base-200 p-6 mt-4 w-full max-w-md space-y-3">
                <input
                    type="text"
                    placeholder="New Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="input input-bordered w-full"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="input w-full"
                />

                <button
                    onClick={handleUpdate}
                    className="btn btn-primary w-full"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </div>
        </div>
    );
};

export default Profile;
