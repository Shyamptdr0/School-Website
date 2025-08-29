"use client";

import { useEffect, useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Awards() {
    const [photos, setPhotos] = useState([]);
    const [openPhoto, setOpenPhoto] = useState(null);
    const [bigImage, setBigImage] = useState(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const res = await fetch("/api/award");
                const data = await res.json();
                setPhotos(data || []);
            } catch (err) {
                console.error("Failed to fetch photos", err);
            }
        };
        fetchPhotos();
    }, []);

    const handleOpenPhoto = (photo) => {
        setBigImage(null);
        setOpenPhoto(photo);
    };

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
                                <div
                                    className="border rounded-lg shadow-sm bg-white overflow-hidden cursor-pointer"
                                    onClick={() => handleOpenPhoto(p)}
                                >
                                    {p.imageUrls?.[0] && (
                                        <img
                                            src={p.imageUrls[0]}
                                            alt={p.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-4">
                                        <h2 className="font-medium text-lg">{p.title}</h2>
                                        <Button
                                            variant="link"
                                            className="text-blue-500 mt-2 p-0 cursor-pointer"
                                            onClick={() => handleOpenPhoto(p)}
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

            {/* Award Modal */}
            {openPhoto && (
                <Dialog open={!!openPhoto} onOpenChange={() => setOpenPhoto(null)}>
                    <DialogContent className="w-full p-6">
                        <DialogHeader>
                            <DialogTitle>
                                {bigImage ? "Image Preview" : openPhoto.title}
                            </DialogTitle>
                            <DialogClose className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl">
                            </DialogClose>
                        </DialogHeader>

                        <div className="flex flex-col items-center justify-center gap-6 w-full">
                            {bigImage ? (
                                // Big image view without scroll on hover
                                <div className="w-full flex justify-center items-center bg-black p-6 rounded-lg overflow-hidden">
                                    <img
                                        src={bigImage}
                                        alt="Big preview"
                                        className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                                        onClick={() => setBigImage(null)}
                                    />
                                </div>
                            ) : (
                                <>
                                    {openPhoto.imageUrls?.length > 0 && (
                                        <div className="flex overflow-x-auto gap-3 mb-6">
                                            {openPhoto.imageUrls.map((url, i) => (
                                                <img
                                                    key={i}
                                                    src={url}
                                                    alt={`${openPhoto.title} ${i + 1}`}
                                                    className="w-56 h-56 object-cover rounded cursor-pointer  transition-transform duration-200"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setBigImage(url);
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    <div className="max-h-64 overflow-y-auto p-4 border rounded bg-gray-50 w-full">
                                        <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                                            {openPhoto.description || "No description available."}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
