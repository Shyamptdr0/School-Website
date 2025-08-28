import React from 'react';
import LoginForm from "@/app/krishna-academy-admin/login/page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";


export default async function Home() {
    const session = await getServerSession(authOptions);

    if (session) redirect("krishna-academy-admin/dashboard");

    return (
    <main>
      <LoginForm/>
    </main>
  );
}
