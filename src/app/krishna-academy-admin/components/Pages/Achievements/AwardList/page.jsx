"use client";

import { useEffect, useState, useRef } from "react";

export default function AwardList() {
    const [photos, setPhotos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null); // 👈 preview state

    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editFile, setEditFile] = useState(null);
    const [editPreview, setEditPreview] = useState(null); // 👈 preview for edit
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [loading, setLoading] = useState(false);

    const fileRef = useRef();
    const editFileRef = useRef();

    // Fetch awards
    const fetchPhotos = async () => {
        try {
            const res = await fetch("/api/award");
            const data = await res.json();
            setPhotos(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    const resetEditState = () => {
        setEditId(null);
        setEditTitle("");
        setEditDescription("");
        setEditFile(null);
        setEditPreview(null);
        if (editFileRef.current) editFileRef.current.value = "";
    };

    // Upload
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select an image");
        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description || "");
        formData.append("file", file);

        try {
            const res = await fetch("/api/award", { method: "POST", body: formData });
            const data = await res.json();
            if (data.success) {
                setTitle("");
                setDescription("");
                setFile(null);
                setPreview(null); // reset preview
                if (fileRef.current) fileRef.current.value = "";
                fetchPhotos();
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert("Upload failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Update
    const handleUpdate = async (id) => {
        if (!id) return;
        setLoading(true);
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", editTitle);
        formData.append("description", editDescription || "");
        if (editFile) formData.append("file", editFile);

        try {
            const res = await fetch("/api/award", { method: "PUT", body: formData });
            const data = await res.json();
            if (data.success) {
                resetEditState();
                fetchPhotos();
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert("Update failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete
    const handleDelete = async (id) => {
        if (!id) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/award?id=${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setConfirmDeleteId(null);
                fetchPhotos();
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert("Delete failed: " + err.message);
        } finally {
            setLoading(false);
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
                    onChange={(e) => {
                        const f = e.target.files[0];
                        setFile(f);
                        if (f) setPreview(URL.createObjectURL(f));
                        else setPreview(null);
                    }}
                    ref={fileRef}
                    className="border p-2 rounded"
                />

                {/* Preview new upload */}
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded border"
                    />
                )}

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
                                        placeholder="Edit title"
                                    />
                                    <textarea
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        className="border p-1 rounded w-full mb-1"
                                        placeholder="Edit description"
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const f = e.target.files[0];
                                            setEditFile(f);
                                            if (f) setEditPreview(URL.createObjectURL(f));
                                            else setEditPreview(null);
                                        }}
                                        ref={editFileRef}
                                        className="border p-1 rounded w-full mb-1"
                                    />

                                    {/* Preview edit upload */}
                                    {editPreview && (
                                        <img
                                            src={editPreview}
                                            alt="Edit Preview"
                                            className="w-32 h-32 object-cover rounded border mb-2"
                                        />
                                    )}

                                    <div className="flex gap-2 mt-1">
                                        <button
                                            onClick={() => handleUpdate(p._id)}
                                            disabled={loading}
                                            className="bg-green-600 text-white px-2 py-1 rounded"
                                        >
                                            {loading ? "Saving..." : "Save"}
                                        </button>
                                        <button
                                            onClick={resetEditState}
                                            className="bg-gray-400 text-white px-2 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
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

// Truncate description with Read More + scroll
function Description({ text }) {
    const [expanded, setExpanded] = useState(false);
    const words = text.split(" ");
    const truncated = words.slice(0, 10).join(" ");

    if (words.length <= 30) {
        return (
            <p className="text-sm text-gray-600 whitespace-pre-line">
                {text}
            </p>
        );
    }

    return (
        <div>
            {expanded ? (
                <div className="max-h-32 overflow-y-auto text-sm text-gray-600 whitespace-pre-line p-1 border rounded">
                    {text}
                </div>
            ) : (
                <p className="text-sm text-gray-600 whitespace-pre-line">
                    {truncated}...
                </p>
            )}
            <button
                onClick={() => setExpanded(!expanded)}
                className="text-sky-600 underline mt-1 text-sm"
            >
                {expanded ? "Show less" : "Read more"}
            </button>
        </div>
    );
}
