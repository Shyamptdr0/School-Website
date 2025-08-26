"use client";

import React, { useEffect, useState } from "react";

export default function NoticeAdmin() {
    const [notices, setNotices] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState(null);

    const fetchNotices = async () => {
        const res = await fetch("/api/notice");
        const data = await res.json();
        setNotices(data ? [data] : []);
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const handleAdd = async () => {
        if (!title || !content) return alert("Title and content are required");
        await fetch("/api/notice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content, isActive: true }),
        });
        setTitle("");
        setContent("");
        fetchNotices();
    };

    const handleEdit = (notice) => {
        setEditingId(notice._id);
        setTitle(notice.title);
        setContent(notice.content);
    };

    const handleUpdate = async () => {
        if (!title || !content) return alert("Title and content are required");
        await fetch(`/api/notice/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content, isActive: true }),
        });
        setEditingId(null);
        setTitle("");
        setContent("");
        fetchNotices();
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this notice?")) return;
        await fetch(`/api/notice/${id}`, { method: "DELETE" });
        fetchNotices();
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setTitle("");
        setContent("");
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-2xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-4">School Notices Admin</h2>

            {/* Add / Edit Form */}
            <div className="mb-4 flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Notice Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 border rounded"
                />
                <textarea
                    placeholder="Notice Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="p-2 border rounded"
                />
                {editingId ? (
                    <div className="flex gap-2">
                        <button
                            onClick={handleUpdate}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        >
                            Update Notice
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleAdd}
                        className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded"
                    >
                        Add Notice
                    </button>
                )}
            </div>

            {/* List of Notices */}
            <div className="mt-6">
                <h3 className="font-semibold mb-2">Current Notice:</h3>
                {notices.length === 0 ? (
                    <p>No active notice.</p>
                ) : (
                    notices.map((n) => (
                        <div
                            key={n._id}
                            className="p-4 bg-white rounded shadow mb-2 flex justify-between items-start"
                        >
                            <div>
                                <h4 className="font-bold">{n.title}</h4>
                                <p>{n.content}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <button
                                    onClick={() => handleEdit(n)}
                                    className="text-blue-600 font-bold"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(n._id)}
                                    className="text-red-600 font-bold"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
