"use client";

import { useState, useEffect } from "react";
import { mockProjects } from "@/data/mocData";
import { getInitialBoard } from "@/helpers/getInitialBoard";
import Link from "next/link";
import { BoardType } from "@/types";

export default function Home() {
  const [projectBoards, setProjectBoards] = useState<{ [key: string]: BoardType }>(() => {
    // Client-side only code
    if (typeof window !== 'undefined') {
      const boards: { [key: string]: BoardType } = {};
      mockProjects.forEach(project => {
        const savedBoard = localStorage.getItem(`board-${project.id}`);
        boards[project.id] = savedBoard ? JSON.parse(savedBoard) : getInitialBoard(project.id);
      });
      return boards;
    }
    return {};
  });

  useEffect(() => {
    // Initialize or update boards on client-side
    const initialBoards: { [key: string]: BoardType } = {};
    mockProjects.forEach(project => {
      const savedBoard = localStorage.getItem(`board-${project.id}`);
      initialBoards[project.id] = savedBoard ? JSON.parse(savedBoard) : getInitialBoard(project.id);
    });
    setProjectBoards(initialBoards);
  }, []);

  const projectStats = mockProjects.map(project => {
    const board = projectBoards[project.id];
    if (!board) return { ...project, totalTasks: 0, completedTasks: 0, inProgressTasks: 0, progress: 0 };

    const totalTasks = board.tasks.length;
    const completedTasks = board.tasks.filter(task => task.status === "DONE").length;
    const inProgressTasks = board.tasks.filter(task => task.status === "IN_PROGRESS").length;
    const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      ...project,
      totalTasks,
      completedTasks,
      inProgressTasks,
      progress
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Proje Yönetimi
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectStats.map((project) => (
            <Link
              href={`/project/${project.id}`}
              key={project.id}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {project.name}
                </h2>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                  {project.description}
                </p>

                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>İlerleme</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-between text-sm">
                  <div>
                    <span className="text-gray-600">Toplam Görev:</span>
                    <span className="ml-1 font-medium text-gray-900">
                      {project.totalTasks}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Devam Eden:</span>
                    <span className="ml-1 font-medium text-gray-900">
                      {project.inProgressTasks}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Tamamlanan:</span>
                    <span className="ml-1 font-medium text-gray-900">
                      {project.completedTasks}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
