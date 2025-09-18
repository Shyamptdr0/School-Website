import { redirect } from "next/navigation";

export default function AdminRoot() {
    redirect("/school-admin/login");
}
