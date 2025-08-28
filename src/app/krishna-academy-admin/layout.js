import "../globals.css";
import { AuthProvider } from "./Providers";

export const metadata = {
    title: "Admin Panel",
    icons: {
        icon: "/logo1.webp",   // 👈 WebP favicon
        shortcut: "/logo1.webp",
        apple: "/logo1.webp",
    },
};;
export const template = "empty";

export default function AdminLayout({ children }) {
    return (
        <html lang="en">
        <body style={{ fontFamily: "sans-serif" }}>
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
