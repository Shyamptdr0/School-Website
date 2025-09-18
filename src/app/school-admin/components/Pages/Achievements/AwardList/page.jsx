"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function AwardList() {
    const [photos, setPhotos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(false);

    // Edit states
    const [editOpen, setEditOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editFiles, setEditFiles] = useState([]);
    const [editPreviews, setEditPreviews] = useState([]);
    const [deletedImages, setDeletedImages] = useState([]);

    // Delete states
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Fetch awards
    const fetchPhotos = async () => {
        try {
            const res = await fetch("/api/award");
            const data = await res.json();
            setPhotos(data || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    // Reset form
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setFiles([]);
        setPreviews([]);
    };

    // Remove file from upload preview
    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    // Upload new award
    const handleUpload = async (e) => {
        e.preventDefault();
        if (files.length === 0) return alert("Please select at least one image");

        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description || "");
        files.forEach((file) => formData.append("files", file));

        try {
            const res = await fetch("/api/award", { method: "POST", body: formData });
            const data = await res.json();
            if (data.success) {
                resetForm();
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

    // Open edit dialog
    const openEdit = (p) => {
        setEditId(p._id);
        setEditTitle(p.title);
        setEditDescription(p.description || "");
        setEditFiles([]);
        setEditPreviews([]);
        setDeletedImages([]);
        setEditOpen(true);
    };

    // Save edited award
    const handleEditSave = async () => {
        if (!editId) return;
        setLoading(true);

        const formData = new FormData();
        formData.append("id", editId);
        formData.append("title", editTitle);
        formData.append("description", editDescription || "");
        editFiles.forEach((file) => formData.append("files", file));
        deletedImages.forEach((url) => formData.append("deletedImages[]", url));

        try {
            const res = await fetch("/api/award", { method: "PUT", body: formData });
            const data = await res.json();
            if (data.success) {
                setEditOpen(false);
                setDeletedImages([]);
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

    // Open delete dialog
    const openDelete = (id) => {
        setDeleteId(id);
        setDeleteOpen(true);
    };

    // Confirm delete
    const confirmDelete = async () => {
        if (!deleteId) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/award?id=${deleteId}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) fetchPhotos();
            else alert(data.error);
        } catch (err) {
            alert("Delete failed: " + err.message);
        } finally {
            setLoading(false);
            setDeleteOpen(false);
            setDeleteId(null);
        }
    };

    return (
        <div className="p-6 space-y-6 relative">
            {loading && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
                    <span className="text-white text-lg font-bold">Loading...</span>
                </div>
            )}

            <h1 className="text-xl font-bold">Award List Management</h1>

            {/* Upload Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Upload Awards</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Input
                        placeholder="Photo Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="max-h-32 overflow-y-auto resize-none"
                    />
                    <div className="space-y-2">
                        <Button
                            type="button"
                            onClick={() => document.getElementById("fileInput")?.click()}
                            className="bg-sky-700 text-white"
                        >
                            + Add Image
                        </Button>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            hidden
                            multiple
                            onChange={(e) => {
                                const selectedFiles = e.target.files;
                                if (selectedFiles) {
                                    const filesArray = Array.from(selectedFiles);
                                    setFiles((prev) => [...prev, ...filesArray]);
                                    setPreviews((prev) => [
                                        ...prev,
                                        ...filesArray.map((f) => URL.createObjectURL(f)),
                                    ]);
                                }
                            }}
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        {previews.map((src, i) => (
                            <div key={i} className="relative">
                                <img
                                    src={src}
                                    alt="preview"
                                    className="w-24 h-24 object-cover rounded border"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeFile(i)}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="space-x-2">
                    <Button onClick={handleUpload} disabled={loading} className="bg-green-700 text-white">
                        {loading ? "Uploading..." : "Upload"}
                    </Button>
                    <Button type="button" variant="secondary" onClick={resetForm} disabled={loading}>
                        Reset
                    </Button>
                </CardFooter>
            </Card>

            {/* Gallery */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((p) => (
                    <Card key={p._id}>
                        <div className="flex gap-2 overflow-x-auto p-2">
                            {(p.imageUrls || (p.imageUrl ? [p.imageUrl] : [])).map((url, idx) => (
                                <img
                                    key={idx}
                                    src={url}
                                    alt={`award ${idx}`}
                                    className="w-24 h-24 object-cover rounded"
                                />
                            ))}
                        </div>
                        <CardHeader>
                            <CardTitle>{p.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="max-h-32 overflow-y-auto">
                            <p className="text-sm text-gray-600 whitespace-pre-line">{p.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={() => openEdit(p)}>
                                Edit
                            </Button>
                            <Button variant="destructive" onClick={() => openDelete(p._id)}>
                                Delete
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Edit Dialog */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Edit Award</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                        <Input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Edit title"
                        />
                        <Textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Edit description"
                            className="max-h-48 overflow-y-auto resize-none"
                        />

                        <Button
                            type="button"
                            onClick={() => document.getElementById("editFileInput")?.click()}
                        >
                            + Add Image
                        </Button>
                        <input
                            id="editFileInput"
                            type="file"
                            hidden
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                                const selectedFiles = e.target.files;
                                if (selectedFiles) {
                                    const filesArray = Array.from(selectedFiles);
                                    setEditFiles((prev) => [...prev, ...filesArray]);
                                    setEditPreviews((prev) => [
                                        ...prev,
                                        ...filesArray.map((f) => URL.createObjectURL(f)),
                                    ]);
                                }
                            }}
                        />

                        {/* Existing and new images */}
                        <div className="flex flex-wrap gap-2">
                            {/* Existing images */}
                            {(photos.find((p) => p._id === editId)?.imageUrls || []).map((src, i) => (
                                <div key={`existing-${i}`} className="relative">
                                    <img
                                        src={src}
                                        alt="existing preview"
                                        className="w-24 h-24 object-cover rounded border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setDeletedImages((prev) => [...prev, src]);
                                            setPhotos((prev) =>
                                                prev.map((p) =>
                                                    p._id === editId
                                                        ? { ...p, imageUrls: p.imageUrls.filter((_, idx) => idx !== i) }
                                                        : p
                                                )
                                            );
                                        }}
                                        className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}

                            {/* New images */}
                            {editPreviews.map((src, i) => (
                                <div key={`new-${i}`} className="relative">
                                    <img
                                        src={src}
                                        alt="edit preview"
                                        className="w-24 h-24 object-cover rounded border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditFiles((prev) => prev.filter((_, idx) => idx !== i));
                                            setEditPreviews((prev) => prev.filter((_, idx) => idx !== i));
                                        }}
                                        className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            onClick={handleEditSave}
                            disabled={loading}
                            className="bg-green-600 text-white"
                        >
                            {loading ? "Saving..." : "Save"}
                        </Button>
                        <Button variant="secondary" onClick={() => setEditOpen(false)}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this award?</p>
                    <DialogFooter className="space-x-2">
                        <Button
                            onClick={confirmDelete}
                            className="bg-red-600 text-white"
                            disabled={loading}
                        >
                            {loading ? "Deleting..." : "Delete"}
                        </Button>
                        <Button variant="secondary" onClick={() => setDeleteOpen(false)} disabled={loading}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
