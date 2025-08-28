"use client";

import { useEffect, useState, useRef } from "react";

export default function CurriculumUpload() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [classGroup, setClassGroup] = useState("");
    const [curriculums, setCurriculums] = useState([]);
    const [message, setMessage] = useState("");
    const fileInputRef = useRef(null);

    // Filter state
    const [filterClassGroup, setFilterClassGroup] = useState("");

    // Fetch all curriculums
    const fetchCurriculums = async () => {
        const res = await fetch("/api/curriculum/upload");
        const data = await res.json();
        setCurriculums(data);
    };

    useEffect(() => {
        fetchCurriculums();
    }, []);

    // Handle Upload
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return setMessage("❌ Please select a PDF file");
        if (!classGroup) return setMessage("❌ Please select a class group");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("classGroup", classGroup);

        const res = await fetch("/api/curriculum/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (data.success) {
            setMessage("✅ Uploaded successfully!");
            setFile(null);
            setTitle("");
            // keep classGroup selected (remove reset here)

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            // Immediately add new curriculum to UI
            setCurriculums((prev) => [data.curriculum, ...prev]);
        } else {
            setMessage("❌ Error: " + data.error);
        }
    };

    // Handle Delete
    const handleDelete = async (id) => {
        const res = await fetch(`/api/curriculum/upload?id=${id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (data.success) {
            setCurriculums((prev) => prev.filter((c) => c._id !== id));
            setMessage("🗑️ Deleted successfully");
        } else {
            setMessage("❌ Error: " + data.error);
        }
    };

    // Filtered list
    const filteredCurriculums = filterClassGroup
        ? curriculums.filter((c) => c.classGroup === filterClassGroup)
        : curriculums;

    return (
        <div className="p-5">
            <h1 className="text-xl font-bold mb-4">📘 Curriculum Management</h1>

            {/* Upload Form */}
            <form
                onSubmit={handleUpload}
                className="mb-4 flex gap-2 items-center flex-wrap"
            >
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded"
                />

                <select
                    value={classGroup}
                    onChange={(e) => setClassGroup(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">-- Select Class Group --</option>
                    <option value="IX & X">IX & X</option>
                    <option value="XI & XII">XI & XII</option>
                </select>

                <input
                    type="file"
                    accept="application/pdf"
                    ref={fileInputRef}
                    onChange={(e) => setFile(e.target.files[0])}
                    className="border p-2 rounded"
                />

                <button
                    type="submit"
                    className="px-4 py-2 bg-sky-800 text-white rounded cursor-pointer"
                >
                    Upload
                </button>
            </form>

            {message && (
                <p className="mb-2 text-sm text-gray-700">{message}</p>
            )}

            {/* Filter Dropdown */}
            <div className="mb-4">
                <label className="mr-2 font-medium">Show Only:</label>
                <select
                    value={filterClassGroup}
                    onChange={(e) => setFilterClassGroup(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">All</option>
                    <option value="IX & X">IX & X</option>
                    <option value="XI & XII">XI & XII</option>
                </select>
            </div>

            {/* Uploaded Curriculum List */}
            <ul>
                {filteredCurriculums.map((c) => (
                    <li
                        key={c._id}
                        className="mb-2 flex items-center justify-between border-b pb-1 gap-4"
                    >
                        {/* File Title & Link */}
                        <div className="flex items-center gap-2">
                            <a
                                href={c.file}
                                target="_self"
                                className="text-blue-600 underline"
                            >
                                {c.title}
                            </a>
                        </div>

                        {/* Show classGroup as text (not editable) */}
                        <span className="px-2 py-1 bg-gray-100 rounded">
                            {c.classGroup}
                        </span>

                        {/* Delete Button */}
                        <button
                            onClick={() => handleDelete(c._id)}
                            className="text-red-500"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
