"use client";

import { useState } from "react";
import LoadingAnimation from "@/components/LoadingAnimation";

export default function ClientRootWrapper({ children }) {
    const [showAnimation, setShowAnimation] = useState(true);

    if (showAnimation) {
        return <LoadingAnimation onFinish={() => setShowAnimation(false)} />;
    }

    return children;
}
