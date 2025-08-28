"use client";

import { useEffect, useState, useRef } from "react";

export default function PhotoGallery() {
    const [photos, setPhotos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");

    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);

    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editFile, setEditFile] = useState(null);
    const [editCategory, setEditCategory] = useState("");

    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [loading, setLoading] = useState(false);

    const fileRef = useRef();
    const editFileRef = useRef();

    // Fetch photos
    const fetchPhotos = async () => {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setPhotos(data);
    };

    // Fetch categories
    const fetchCategories = async () => {
        const res = await fetch("/api/category");
        const data = await res.json();
        setCategories(data);
    };

    useEffect(() => {
        fetchPhotos();
        fetchCategories();
    }, []);

    // Add new category
    const addCategory = async () => {
        if (!newCategory) return alert("Enter category name");
        setLoading(true);
        const res = await fetch("/api/category", {
            method: "POST",
            body: JSON.stringify({ name: newCategory }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setLoading(false);
        if (data.success) {
            setNewCategory("");
            fetchCategories();
        } else {
            alert(data.error);
        }
    };

    // Update category
    const updateCategory = async (id, name) => {
        if (!name) return alert("Category name required");
        setLoading(true);
        const res = await fetch("/api/category", {
            method: "PUT",
            body: JSON.stringify({ id, name }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setLoading(false);
        if (data.success) fetchCategories();
        else alert(data.error);
    };

    // Delete category
    const deleteCategory = async (id) => {
        if (!confirm("Delete this category?")) return;
        setLoading(true);
        const res = await fetch(`/api/category?id=${id}`, { method: "DELETE" });
        const data = await res.json();
        setLoading(false);
        if (data.success) fetchCategories();
        else alert(data.error);
    };

    // Upload photo
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select an image");
        if (!selectedCategory) return alert("Select a category");
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        formData.append("category", selectedCategory);

        const res = await fetch("/api/gallery", { method: "POST", body: formData });
        const data = await res.json();

        setLoading(false);
        if (data.success) {
            setTitle("");
            setFile(null);
            setSelectedCategory("");
            fileRef.current.value = "";
            fetchPhotos();
        } else {
            alert(data.error);
        }
    };

    // Update photo
    const handleUpdate = async (id) => {
        if (!editTitle) return alert("Title required");
        if (!editCategory) return alert("Select category");
        setLoading(true);

        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", editTitle);
        formData.append("category", editCategory);
        if (editFile) formData.append("file", editFile);

        const res = await fetch("/api/gallery", { method: "PUT", body: formData });
        const data = await res.json();

        setLoading(false);
        if (data.success) {
            setEditId(null);
            setEditTitle("");
            setEditCategory("");
            setEditFile(null);
            if (editFileRef.current) editFileRef.current.value = "";
            fetchPhotos();
        } else {
            alert(data.error);
        }
    };

    // Delete photo
    const handleDelete = async (id) => {
        setLoading(true);
        const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
        const data = await res.json();
        setLoading(false);
        if (data.success) {
            setConfirmDeleteId(null);
            fetchPhotos();
        } else {
            alert(data.error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">🏆 Photo Gallery Management</h1>

            {/* Category Management */}
            <div className="mb-6 border p-4 rounded">
                <h2 className="font-semibold mb-2">Manage Categories</h2>
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        placeholder="New Category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="border p-2 rounded flex-1"
                    />
                    <button onClick={addCategory} className="bg-sky-800 text-white px-4 py-2 rounded">
                        Add
                    </button>
                </div>

                {categories.map((c) => (
                    <div key={c._id} className="flex gap-2 mb-1 items-center">
                        <input
                            type="text"
                            value={c.name}
                            onChange={(e) => {
                                const newName = e.target.value;
                                setCategories((prev) =>
                                    prev.map((cat) => (cat._id === c._id ? { ...cat, name: newName } : cat))
                                );
                            }}
                            className="border p-1 rounded flex-1"
                        />
                        <button
                            onClick={() => updateCategory(c._id, c.name)}
                            className="bg-green-600 text-white px-2 py-1 rounded"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => deleteCategory(c._id)}
                            className="bg-red-600 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Upload Form */}
            <form onSubmit={handleUpload} className="flex flex-col gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Photo Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border p-2 rounded"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    ref={fileRef}
                    className="border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-sky-800 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </form>

            {/* Gallery */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((p) => (
                    <div key={p._id} className="border rounded shadow-md overflow-hidden relative">
                        <img src={p.imageUrl} alt={p.title} className="w-full h-48 object-cover" />
                        <div className="p-2">
                            {editId === p._id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="border p-1 rounded w-full mb-1"
                                    />
                                    <select
                                        value={editCategory}
                                        onChange={(e) => setEditCategory(e.target.value)}
                                        className="border p-1 rounded w-full mb-1"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((c) => (
                                            <option key={c._id} value={c._id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setEditFile(e.target.files[0])}
                                        ref={editFileRef}
                                        className="border p-1 rounded w-full mb-1"
                                    />
                                    <button
                                        onClick={() => handleUpdate(p._id)}
                                        disabled={loading}
                                        className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                                    >
                                        {loading ? "Saving..." : "Save"}
                                    </button>
                                    <button
                                        onClick={() => setEditId(null)}
                                        className="bg-gray-400 text-white px-2 py-1 rounded"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h2 className="font-medium">{p.title}</h2>
                                    {p.category && <p className="text-sm text-gray-500">{p.category.name}</p>}
                                    <div className="flex justify-between mt-2">
                                        <button
                                            onClick={() => {
                                                setEditId(p._id);
                                                setEditTitle(p.title);
                                                setEditCategory(p.category?._id || "");
                                            }}
                                            className="text-blue-500"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => setConfirmDeleteId(p._id)}
                                            className="text-red-500"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Delete Confirmation Overlay */}
                        {confirmDeleteId === p._id && (
                            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                                <div className="bg-white p-4 rounded shadow-md text-center">
                                    <p className="mb-4">Are you sure you want to delete?</p>
                                    <button
                                        onClick={() => handleDelete(p._id)}
                                        disabled={loading}
                                        className="bg-red-600 text-white px-3 py-1 rounded mr-2"
                                    >
                                        {loading ? "Deleting..." : "Yes"}
                                    </button>
                                    <button
                                        onClick={() => setConfirmDeleteId(null)}
                                        className="bg-gray-400 text-white px-3 py-1 rounded"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
