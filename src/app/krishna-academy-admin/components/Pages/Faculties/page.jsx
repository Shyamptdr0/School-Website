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

// Use a string path for dummy image (must be in public folder)
const DUMMY_IMAGE = "/dummy-image.jpg";

export default function FacultyPage() {
    const [faculties, setFaculties] = useState([]);
    const [form, setForm] = useState({ name: "", profession: "", file: null });
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editMsg, setEditMsg] = useState("");

    // Fetch all faculties
    useEffect(() => {
        fetch("/api/faculty")
            .then((r) => r.json())
            .then(setFaculties);
    }, []);

    // Reset form whenever dialog closes
    useEffect(() => {
        if (!isDialogOpen) {
            setForm({ name: "", profession: "", file: null });
            setPreview("");
            setEditId(null);
            setEditMsg("");
            setLoading(false);
        }
    }, [isDialogOpen]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setForm({ ...form, file });
        setPreview(URL.createObjectURL(file));
        if (editId) setEditMsg("You selected a new image for editing.");
    };

    const openAddDialog = () => {
        setEditId(null);
        setForm({ name: "", profession: "", file: null });
        setPreview("");
        setEditMsg("");
        setIsDialogOpen(true);
    };

    const handleEdit = (faculty) => {
        setEditId(faculty._id);
        setForm({ name: faculty.name, profession: faculty.profession, file: null });
        setPreview(faculty.imageUrl || DUMMY_IMAGE);
        setEditMsg("");
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let imageUrl = preview || DUMMY_IMAGE;
        let imageId = editId
            ? faculties.find((f) => f._id === editId)?.imageId || ""
            : form.file
                ? ""
                : "dummy-image";

        // Upload new image if selected
        if (form.file) {
            const formData = new FormData();
            formData.append("file", form.file);
            const uploadRes = await fetch("/api/upload", { method: "POST", body: formData }).then((r) => r.json());
            imageUrl = uploadRes.imageUrl;
            imageId = uploadRes.imageId;
        }

        if (editId) {
            const updatedFaculty = await fetch(`/api/faculty/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: form.name, profession: form.profession, imageUrl, imageId }),
            }).then((r) => r.json());

            setFaculties(faculties.map((f) => (f._id === editId ? updatedFaculty : f)));
            setIsDialogOpen(false); // <-- Close dialog after editing
        } else {
            const newFaculty = await fetch("/api/faculty", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: form.name, profession: form.profession, imageUrl, imageId }),
            }).then((r) => r.json());

            setFaculties([...faculties, newFaculty]);
            setIsDialogOpen(false); // Close dialog after adding
        }

        setLoading(false);
    };

    const handleDelete = async (id) => {
        await fetch(`/api/faculty/${id}`, { method: "DELETE" });
        setFaculties(faculties.filter((f) => f._id !== id));
    };

    return (
        <div className="p-4 md:p-6">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">Faculty Management</h1>

            <div className="flex justify-center md:justify-start mb-4">
                <Button
                    variant="outline"
                    className="border-sky-800 border-2 cursor-pointer"
                    onClick={openAddDialog}
                >
                    Add Faculty
                </Button>
            </div>

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

                            <div className="grid gap-3">
                                <Label>Profile Image</Label>
                                <Input type="file" accept="image/*" onChange={handleFileChange} />
                                {preview && (
                                    <Image
                                        src={preview}
                                        alt="Preview"
                                        width={200}
                                        height={200}
                                        className="rounded-md object-cover"
                                    />
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

            {/* Faculty List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-6 justify-items-center">
                {faculties.map((f) => (
                    <div
                        key={f._id}
                        className="border rounded-md shadow-sm w-44 flex flex-col items-center p-2 bg-white"
                        >
                        {/* Image container */}
                        <div className="w-40 h-48 overflow-hidden rounded-md border">
                            <Image
                                src={f.imageUrl || DUMMY_IMAGE}
                                alt={f.name}
                                width={144}
                                height={192}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Text */}
                        <h2 className="font-semibold mt-2 text-center text-sm">{f.name}</h2>
                        <p className="text-xs text-gray-600 text-center">{f.profession}</p>

                        {/* Buttons */}
                        <div className="flex gap-2 mt-2">
                            <Button onClick={() => handleEdit(f)} className="bg-sky-800 text-white px-2 py-1 text-xs">
                                Edit
                            </Button>
                            <Button onClick={() => handleDelete(f._id)} className="bg-red-500 text-white px-2 py-1 text-xs">
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
