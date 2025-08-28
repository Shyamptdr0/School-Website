// app/krishna-academy-admin/layout.jsx
import "../globals.css";
import { AuthProvider } from "./Providers";

export const metadata = { title: "Admin Panel" };
export const template = "empty";

export default function AdminLayout({ children }) {
    return (
        <html lang="en">
        <body style={{ fontFamily: "sans-serif" }}>
        <AuthProvider>
            {children} {/* All admin pages go here */}
        </AuthProvider>
        </body>
        </html>
    );
}
