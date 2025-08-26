"use client";

import { useEffect, useState, useRef } from "react";

export default function AwardList() {

    const [photos, setPhotos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editFile, setEditFile] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileRef = useRef();
    const editFileRef = useRef();

    // Fetch
    const fetchPhotos = async () => {
        const res = await fetch("/api/award");
        const data = await res.json();
        setPhotos(data);
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    // Upload
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select an image");
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description || "");
        formData.append("file", file);

        const res = await fetch("/api/award", { method: "POST", body: formData });
        const data = await res.json();

        setLoading(false);
        if (data.success) {
            setTitle("");
            setDescription("");
            setFile(null);
            fileRef.current.value = "";
            fetchPhotos();
        } else {
            alert(data.error);
        }
    };

    // Update
    const handleUpdate = async (id) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", editTitle);
        formData.append("description", editDescription || "");
        if (editFile) formData.append("file", editFile);

        const res = await fetch("/api/award", { method: "PUT", body: formData });
        const data = await res.json();

        setLoading(false);
        if (data.success) {
            setEditId(null);
            setEditTitle("");
            setEditDescription("");
            setEditFile(null);
            if (editFileRef.current) editFileRef.current.value = "";
            fetchPhotos();
        } else {
            alert(data.error);
        }
    };

    // Delete
    const handleDelete = async (id) => {
        setLoading(true);
        const res = await fetch(`/api/awards?id=${id}`, { method: "DELETE" });
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
            <h1 className="text-xl font-bold mb-4">🏆 Sports Gallery Management</h1>

            {/* Upload Form */}
            <form onSubmit={handleUpload} className="flex flex-col gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Photo Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    ref={fileRef}
                    className="border p-2 rounded"
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
                                    <textarea
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        className="border p-1 rounded w-full mb-1"
                                    />
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
                                    <Description text={p.description || ""} />
                                    <div className="flex justify-between mt-2">
                                        <button
                                            onClick={() => {
                                                setEditId(p._id);
                                                setEditTitle(p.title);
                                                setEditDescription(p.description || "");
                                            }}
                                            className="text-sky-600"
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

// Component to truncate description with Read More
function Description({ text }) {
    const [expanded, setExpanded] = useState(false);
    const words = text.split(" ");
    const truncated = words.slice(0, 10).join(" ");

    if (words.length <= 50) return <p className="text-sm text-gray-600 whitespace-pre-line">{text}</p>;

    return (
        <p className="text-sm text-gray-600 whitespace-pre-line">
            {expanded ? text : truncated + "..."}{" "}
            <button
                onClick={() => setExpanded(!expanded)}
                className="text-sky-600 underline"
            >
                {expanded ? "Show less" : "Read more"}
            </button>
        </p>
    );
}
