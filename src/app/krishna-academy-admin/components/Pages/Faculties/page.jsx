"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

// Dummy image for placeholders
const DUMMY_IMAGE = "/dummy-image.jpg";

export default function FacultyPage() {
    const [faculties, setFaculties] = useState([]);
    const [form, setForm] = useState({ name: "", profession: "", file: null });
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editMsg, setEditMsg] = useState("");

    const [deleteId, setDeleteId] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // Fetch all faculties
    useEffect(() => {
        fetch("/api/faculty")
            .then((r) => r.json())
            .then(setFaculties);
    }, []);

    // Reset form when dialog closes
    useEffect(() => {
        if (!isDialogOpen) {
            setForm({ name: "", profession: "", file: null });
            setPreview("");
            setEditId(null);
            setEditMsg("");
            setLoading(false);
        }
    }, [isDialogOpen]);

    // Handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setForm({ ...form, file });
        setPreview(URL.createObjectURL(file));
        setEditMsg("You selected a new image for editing.");
    };

    // Remove image during edit
    const removeImage = () => {
        setForm({ ...form, file: null });
        setPreview(DUMMY_IMAGE);
        setEditMsg("Image removed. Dummy image will be used on submit.");
    };

    // Open Add Dialog
    const openAddDialog = () => {
        setEditId(null);
        setForm({ name: "", profession: "", file: null });
        setPreview("");
        setEditMsg("");
        setIsDialogOpen(true);
    };

    // Open Edit Dialog
    const handleEdit = (faculty) => {
        setEditId(faculty._id);
        setForm({ name: faculty.name, profession: faculty.profession, file: null });
        setPreview(faculty.imageUrl || DUMMY_IMAGE);
        setEditMsg("");
        setIsDialogOpen(true);
    };

    // Submit Add/Edit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let imageUrl = preview;
        let imageId = "";

        if (editId) {
            // Editing existing faculty
            const originalFaculty = faculties.find(f => f._id === editId);

            if (form.file) {
                // User selected a new image
                const formData = new FormData();
                formData.append("file", form.file);
                const uploadRes = await fetch("/api/upload", { method: "POST", body: formData }).then(r => r.json());
                imageUrl = uploadRes.imageUrl;
                imageId = uploadRes.imageId;

                // Optional: Delete old image from Cloudinary
                if (originalFaculty.imageId) {
                    await fetch(`/api/delete-image/${originalFaculty.imageId}`, { method: "DELETE" });
                }

            } else if (preview === DUMMY_IMAGE && originalFaculty.imageUrl !== DUMMY_IMAGE) {
                // User clicked cross to remove image
                imageUrl = DUMMY_IMAGE;
                imageId = "dummy-image";

                // Optional: Delete old image from Cloudinary
                if (originalFaculty.imageId) {
                    await fetch(`/api/delete-image/${originalFaculty.imageId}`, { method: "DELETE" });
                }

            } else {
                // No change to image
                imageUrl = originalFaculty.imageUrl;
                imageId = originalFaculty.imageId;
            }

            const updatedFaculty = await fetch(`/api/faculty/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: form.name, profession: form.profession, imageUrl, imageId }),
            }).then(r => r.json());

            setFaculties(faculties.map(f => f._id === editId ? updatedFaculty : f));

        } else {
            // Adding new faculty
            if (form.file) {
                const formData = new FormData();
                formData.append("file", form.file);
                const uploadRes = await fetch("/api/upload", { method: "POST", body: formData }).then(r => r.json());
                imageUrl = uploadRes.imageUrl;
                imageId = uploadRes.imageId;
            } else {
                imageUrl = DUMMY_IMAGE;
                imageId = "dummy-image";
            }

            const newFaculty = await fetch("/api/faculty", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: form.name, profession: form.profession, imageUrl, imageId }),
            }).then(r => r.json());

            setFaculties([...faculties, newFaculty]);
        }

        setIsDialogOpen(false);
        setLoading(false);
    };


    // Delete confirmation
    const openDeleteDialog = (id) => {
        setDeleteId(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        await fetch(`/api/faculty/${deleteId}`, { method: "DELETE" });
        setFaculties(faculties.filter((f) => f._id !== deleteId));
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
    };

    return (
        <div className="p-4 md:p-6">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">Faculty Management</h1>

            <div className="flex justify-center md:justify-start mb-4">
                <Button variant="outline" className="border-sky-800 border-2 cursor-pointer" onClick={openAddDialog}>
                    Add Faculty
                </Button>
            </div>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px] w-full">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>{editId ? "Edit Faculty Profile" : "Add Faculty Profile"}</DialogTitle>
                            <DialogDescription>
                                {editId
                                    ? "Update faculty details and profile picture."
                                    : "Fill faculty details and upload their profile picture."}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 mt-4">
                            <div className="grid gap-3">
                                <Label>Name</Label>
                                <Input
                                    name="name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label>Profession</Label>
                                <Input
                                    name="profession"
                                    value={form.profession}
                                    onChange={(e) => setForm({ ...form, profession: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid gap-3 relative">
                                <Label>Profile Image</Label>
                                <Input type="file" accept="image/*" onChange={handleFileChange} />
                                {preview && (
                                    <div className="relative w-40 h-48">
                                        <Image
                                            src={preview}
                                            alt="Preview"
                                            fill
                                            className="rounded-md object-cover"
                                        />
                                        {editId && (
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                )}
                                {editMsg && <p className="text-sm text-blue-600">{editMsg}</p>}
                            </div>
                        </div>

                        <DialogFooter className="mt-4 flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Uploading..." : editId ? "Update" : "Upload"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[400px] w-full">
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this faculty? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={confirmDelete} className="bg-red-600 text-white">
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Faculty List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-6 justify-items-center">
                {faculties.map((f) => (
                    <div
                        key={f._id}
                        className="border rounded-md shadow-sm w-55 flex flex-col items-center p-2 bg-white"
                    >
                        <div className="w-50 h-64 overflow-hidden rounded-md border relative">
                            <Image
                                src={f.imageUrl || DUMMY_IMAGE}
                                alt={f.name}
                                width={144}
                                height={192}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <h2 className="font-semibold mt-2 text-center text-sm">{f.name}</h2>
                        <p className="text-xs text-gray-600 text-center">{f.profession}</p>

                        <div className="flex gap-2 mt-2">
                            <Button
                                onClick={() => handleEdit(f)}
                                className="bg-sky-800 text-white px-2 py-1 text-xs"
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={() => openDeleteDialog(f._id)}
                                className="bg-red-500 text-white px-2 py-1 text-xs"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
