"use client";

import { usePathname } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") {
    return <main className="flex-1">{children}</main>;
  }

  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {isAdmin ? <AdminHeader /> : <Header />}
      <main className="flex-1">{children}</main>
      {isAdmin ? null : <Footer />}
    </>
  );
}
