"use client";

import Sidebar from "@/components/Sidebar";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen h-screen relative overflow-hidden">
      <Sidebar />
      <div className="flex-1 w-0 overflow-y-auto">{children}</div>
    </main>
  );
}
