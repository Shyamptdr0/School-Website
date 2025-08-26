"use client";

import { useEffect, useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";

export default function Photo() {
    const [photos, setPhotos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    // Fetch photos
    const fetchPhotos = async () => {
        try {
            const res = await fetch("/api/gallery");
            const data = await res.json();
            setPhotos(data);
        } catch (err) {
            console.error("Failed to fetch photos", err);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/category");
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    useEffect(() => {
        fetchPhotos();
        fetchCategories();
    }, []);

    const openModal = (photo) => {
        setSelectedPhoto(photo);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPhoto(null);
        setModalOpen(false);
    };

    // Filter photos by selected category
    const filteredPhotos = selectedCategory
        ? photos.filter((p) => p.category?._id === selectedCategory)
        : photos;

    return (
        <div className="p-6 min-h-screen mt-50">
            <h1 className="text-2xl font-bold mb-6">🏆 Sports Gallery</h1>

            {/* Category Filter */}
            {categories.length > 0 && (
                <div className="mb-4 flex gap-2 flex-wrap">
                    <button
                        onClick={() => setSelectedCategory("")}
                        className={`px-3 py-1 rounded ${
                            selectedCategory === "" ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                    >
                        All
                    </button>
                    {categories.map((c) => (
                        <button
                            key={c._id}
                            onClick={() => setSelectedCategory(c._id)}
                            className={`px-3 py-1 rounded ${
                                selectedCategory === c._id ? "bg-blue-600 text-white" : "bg-gray-200"
                            }`}
                        >
                            {c.name}
                        </button>
                    ))}
                </div>
            )}

            {filteredPhotos.length === 0 ? (
                <p>No photos available.</p>
            ) : (
                <section id="photos">
                    <div className="columns-2 sm:columns-3 gap-4">
                        {filteredPhotos.map((p, idx) => (
                            <BlurFade key={p._id} delay={0.25 + idx * 0.05} inView>
                                <div
                                    className="relative mb-4 rounded-lg overflow-hidden cursor-pointer group"
                                    onClick={() => openModal(p)}
                                >
                                    {/* Image */}
                                    <img
                                        src={p.imageUrl}
                                        alt={p.title}
                                        className="w-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-sm"
                                    />

                                    {/* Overlay with title and category */}
                                    <div className="absolute inset-0   bg-opacity-30 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                                        <h2 className="p-1 bg-white/70 rounded-sm  text-black text-lg font-semibold text-center transform transition-transform duration-300 group-hover:-translate-y-4">
                                            {p.title}
                                        </h2>
                                        {p.category && (
                                            <p className="text-sm p-1 bg-white/70 rounded-sm  text-black mt-1 transform transition-transform duration-300 group-hover:-translate-y-2">
                                                {p.category.name}
                                            </p>
                                        )}
                                    </div>
                                </div>



                            </BlurFade>
                        ))}
                    </div>
                </section>
            )}

            {/* Modal for selected photo */}
            {modalOpen && selectedPhoto && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <button
                        className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center text-3xl font-bold shadow-lg hover:bg-black hover:bg-opacity-70 transition"
                        onClick={closeModal}
                    >
                        &times;
                    </button>

                    <div className="bg-white rounded-lg max-w-3xl w-full p-4 relative">
                        <img
                            src={selectedPhoto.imageUrl}
                            alt={selectedPhoto.title}
                            className="w-full h-auto object-cover rounded"
                        />
                        <h2 className="mt-2 text-lg font-medium text-center">{selectedPhoto.title}</h2>
                        {selectedPhoto.category && (
                            <p className="text-center text-gray-500">{selectedPhoto.category.name}</p>
                        )}

                        {/* Related photos */}
                        <div className="mt-4 grid grid-cols-3 gap-2">
                            {photos
                                .filter(
                                    (p) =>
                                        p._id !== selectedPhoto._id &&
                                        p.category?._id === selectedPhoto.category?._id
                                )
                                .map((p) => (
                                    <div key={p._id} className="relative group rounded overflow-hidden">
                                        <img
                                            src={p.imageUrl}
                                            alt={p.title}
                                            className="w-full h-24 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
                                            onClick={() => setSelectedPhoto(p)}
                                        />
                                    </div>
                                ))}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
