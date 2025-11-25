
import React, { useContext, useState } from 'react';
import { AuthContext } from "../providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const AddHabit = () => {
  const { user } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const IMGBB_KEY = "549399a3608631ef596c7b4da04c6c64";

  // Handle file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageURL(""); 
    setPreview(URL.createObjectURL(file));
  };

  // Handle URL input
  const handleURLChange = (e) => {
    setImageURL(e.target.value);
    setImageFile(null); // reset file
    setPreview(e.target.value);
  };

  // Upload file to ImgBB
  const uploadImageToImgBB = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const url = `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`;
    const response = await axios.post(url, formData);
    return response.data.data.url;
  };

  // Submit form
  const handleAddHabit = async (e) => {
    e.preventDefault();
    const form = e.target;

    let finalImage = "";

    // CASE 1: If file uploaded → upload to imgbb
    if (imageFile) {
      const loadingToast = toast.loading("Uploading image...");
      try {
        finalImage = await uploadImageToImgBB();
        toast.dismiss(loadingToast);
        toast.success("Image uploaded!");
      } catch {
        toast.dismiss(loadingToast);
        toast.error("Image upload failed!");
        return;
      }
    }
    // CASE 2: If URL was given → use it directly
    else if (imageURL.trim().length > 3) {
      finalImage = imageURL;
    }

    // CASE 3: Nothing → empty string

    const newHabit = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      reminderTime: form.reminderTime.value,
      email: user?.email,
      userName: user?.displayName,
      createdAt: new Date(),
      isPublic: true,
      image: finalImage,
      status: "pending",
    };

    try {
      const res = await axios.post("http://localhost:5000/habits", newHabit);
      if (res.data.insertedId) {
        toast.success("Habit added!");
        form.reset();
        setPreview(null);
        setImageFile(null);
        setImageURL("");
      }
    } catch {
      toast.error("Failed to add habit!");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-xl shadow-lg mb-10 bg-white">
      <Toaster />
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Add New Habit</h2>

      <form onSubmit={handleAddHabit} className="space-y-4">

        {/* Preview Image */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-40 object-cover rounded-lg border"
          />
        )}

        {/* Upload Image Input */}
        <input
          type="file"
          accept="image/*"
          className="w-full border rounded p-2"
          onChange={handleImageChange}
        />

        {/* OR URL Input */}
        <input
          type="text"
          placeholder="OR paste image URL"
          value={imageURL}
          onChange={handleURLChange}
          className="w-full border rounded p-2"
        />

        <input name="title" type="text" placeholder="Habit Title" required className="w-full p-2 border rounded" />

        <textarea name="description" placeholder="Description" required className="w-full p-2 border rounded"></textarea>

        <select name="category" required className="w-full p-2 border rounded">
          <option value="">Select Category</option>
          <option value="Morning">Morning</option>
          <option value="Work">Work</option>
          <option value="Fitness">Fitness</option>
          <option value="Evening">Evening</option>
          <option value="Study">Study</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Health">Health</option>
          
        </select>

        <input name="reminderTime" type="time" className="w-full p-2 border rounded" />

        <button className="btn btn-outline btn-primary w-full">Add Habit</button>
      </form>
    </div>
  );
};

export default AddHabit;
