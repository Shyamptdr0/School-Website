"use client";

import { useEffect, useState } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CurriculumUser() {
    const [curriculums, setCurriculums] = useState([]);

    // Fetch all curriculums
    const fetchCurriculums = async () => {
        const res = await fetch("/api/curriculum/upload");
        const data = await res.json();
        setCurriculums(data);
    };

    useEffect(() => {
        fetchCurriculums();
    }, []);

    // Group by classGroup
    const grouped = {
        "IX & X": curriculums.filter((c) => c.classGroup === "IX & X"),
        "XI & XII": curriculums.filter((c) => c.classGroup === "XI & XII"),
    };

    return (
        <div className="p-6 mt-50 h-screen">
            <h1 className="text-2xl font-bold mb-6 text-center">📘 Curriculum</h1>

            <Tabs defaultValue="IX & X" className="w-full">
                <TabsList className="flex justify-center mb-6">
                    <TabsTrigger value="IX & X">IX & X</TabsTrigger>
                    <TabsTrigger value="XI & XII">XI & XII</TabsTrigger>
                </TabsList>

                {/* IX & X Tab */}
                <TabsContent value="IX & X">
                    {grouped["IX & X"].length === 0 ? (
                        <p className="text-center text-gray-500">No curriculum available</p>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {grouped["IX & X"].map((c) => (
                                <Card key={c._id} className="shadow-md">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{c.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <a
                                            href={c.file}
                                            target="_self"
                                            className="text-blue-600 underline"
                                        >
                                            Open PDF
                                        </a>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                {/* XI & XII Tab */}
                <TabsContent value="XI & XII">
                    {grouped["XI & XII"].length === 0 ? (
                        <p className="text-center text-gray-500">No curriculum available</p>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {grouped["XI & XII"].map((c) => (
                                <Card key={c._id} className="shadow-md">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{c.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <a
                                            href={c.file}
                                            target="_self"
                                            className="text-blue-600 underline"
                                        >
                                            Open PDF
                                        </a>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
