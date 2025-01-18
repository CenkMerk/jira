"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { mockProjects } from "@/data/mocData";
import Board from "@/components/Board";

export default function ProjectPage() {
  const params = useParams();
  const projectId = typeof params.id === "string" ? params.id : "";

  // Check if project exists
  const projectExists = mockProjects.some((p) => p.id === projectId);
  if (!projectExists) {
    notFound();
  }

  return <Board projectId={projectId} />;
} 