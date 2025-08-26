"use client";

import { useEffect, useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Awards() {
    const [photos, setPhotos] = useState([]);
    const [openPhoto, setOpenPhoto] = useState(null); // store clicked photo for modal

    const fetchPhotos = async () => {
        try {
            const res = await fetch("/api/award");
            const data = await res.json();
            setPhotos(data);
        } catch (err) {
            console.error("Failed to fetch photos", err);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    return (
        <div className="p-6 min-h-screen mt-50">
            <h1 className="text-2xl font-bold mb-6">🏆 Award List</h1>

            {photos.length === 0 ? (
                <p>No awards available.</p>
            ) : (
                <section id="photos">
                    <div className="grid md:grid-cols-3 gap-4">
                        {photos.map((p, idx) => (
                            <BlurFade key={p._id} delay={0.25 + idx * 0.05} inView>
                                <div className="border rounded-lg shadow-sm bg-white overflow-hidden cursor-pointer"  onClick={() => setOpenPhoto(p)}>
                                    {p.imageUrl && (
                                        <img
                                            src={p.imageUrl}
                                            alt={p.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-4">
                                        <h2 className="font-medium text-lg">{p.title}</h2>
                                        <Button
                                            variant="link"
                                            className="text-blue-500 mt-2 p-0 cursor-pointer"
                                            onClick={() => setOpenPhoto(p)}
                                        >
                                            Read more
                                        </Button>
                                    </div>
                                </div>
                            </BlurFade>
                        ))}
                    </div>
                </section>
            )}

            {/* Modal */}
            {/* Modal */}
            <Dialog open={!!openPhoto} onOpenChange={() => setOpenPhoto(null)}>
                <DialogContent className="max-w-lg w-full">
                    <DialogHeader>
                        <DialogTitle>{openPhoto?.title}</DialogTitle>
                        <DialogClose className="absolute right-4 top-4 text-gray-500 hover:text-gray-800">
                        </DialogClose>
                    </DialogHeader>

                    {openPhoto?.imageUrl && (
                        <img
                            src={openPhoto.imageUrl}
                            alt={openPhoto.title}
                            className="w-full h-64 object-cover rounded mb-4"
                        />
                    )}

                    {/* Scrollable description */}
                    <div className="max-h-48 overflow-y-auto p-2 border rounded bg-gray-50">
                        <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                            {openPhoto?.description || "No description available."}
                        </p>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
}
