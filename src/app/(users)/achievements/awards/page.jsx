"use client";

import { useEffect, useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";

export default function Awards() {
    const [photos, setPhotos] = useState([]);

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
                <p>No photos available.</p>
            ) : (
                <section id="photos">
                    <div className="columns-2 gap-4 sm:columns-3">
                        {photos.map((p, idx) => (
                            <BlurFade key={p._id} delay={0.25 + idx * 0.05} inView>
                                <div className="mb-4 rounded-lg overflow-hidden border shadow-sm bg-white">
                                    <img
                                        src={p.imageUrl}
                                        alt={p.title}
                                        className="w-full object-contain"
                                    />
                                    <div className="p-2">
                                        <h2 className="font-medium">{p.title}</h2>
                                        <Description text={p.description || ""} />
                                    </div>
                                </div>
                            </BlurFade>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

// Reuse same Description component for "Read more"
function Description({ text }) {
    const [expanded, setExpanded] = useState(false);
    const words = text.split(" ");
    const truncated = words.slice(0, 50).join(" ");

    if (words.length <= 50)
        return <p className="text-sm text-gray-600 whitespace-pre-line">{text}</p>;

    return (
        <p className="text-sm text-gray-600 whitespace-pre-line">
            {expanded ? text : truncated + "..."}{" "}
            <button
                onClick={() => setExpanded(!expanded)}
                className="text-blue-500 underline"
            >
                {expanded ? "Show less" : "Read more"}
            </button>
        </p>
    );
}
