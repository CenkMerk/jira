"use client";

import { ChevronRight, Home } from "lucide-react";
import { useState, useEffect, TouchEvent } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { mockProjects } from "@/data/mocData";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const params = useParams();
  const router = useRouter();
  const projectId = typeof params.id === "string" ? params.id : "";
  const [isOpen, setIsOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance in pixels
  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && isOpen) {
      setIsOpen(false);
    } else if (isRightSwipe && !isOpen) {
      setIsOpen(true);
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      const toggle = document.getElementById("sidebar-toggle");
      if (
        isOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        toggle &&
        !toggle.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Toggle button with pill design */}
      <button
        id="sidebar-toggle"
        className="lg:hidden fixed top-1/2 -translate-y-1/2 left-0 z-50 
                 bg-indigo-600 text-white rounded-r-full p-2 shadow-lg
                 hover:bg-indigo-700 transition-all duration-300
                 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronRight
          size={24}
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        id="sidebar"
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0
          transition-transform duration-300 ease-in-out
          w-64 h-full bg-gray-100 border-r border-gray-200 p-4
          flex flex-col overflow-hidden
        `}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Link
          href="/"
          className="flex items-center gap-2 p-3 mb-4 rounded-lg hover:bg-gray-200 transition-colors text-gray-900"
          onClick={() => setIsOpen(false)}
        >
          <Home size={20} />
          <span className="font-medium">Ana Sayfa</span>
        </Link>
        <div className="h-px bg-gray-200 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-4">Projects</h2>
        <div className="space-y-2 flex-1 overflow-y-auto">
          {mockProjects.map((project) => (
            <div
              key={project.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                projectId === project.id
                  ? "bg-indigo-100 text-indigo-900"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => {
                setIsOpen(false);
                router.push(`/project/${project.id}`);
              }}
            >
              <h3 className="font-medium">{project.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
