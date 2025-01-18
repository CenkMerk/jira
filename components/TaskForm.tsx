"use client";

import { useState, useEffect } from "react";
import { TaskType, UserType } from "../types";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Partial<TaskType>) => void;
  users: UserType[];
  task?: TaskType;
}

export default function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  users,
  task,
}: TaskFormProps) {
  const [formData, setFormData] = useState<Partial<TaskType>>(
    task || {
      title: "",
      description: "",
      assignee: null,
      storyPoints: 0,
      startDate: null,
      dueDate: null,
      status: "OPEN",
    }
  );

  useEffect(() => {
    if (task) {
      setFormData(task);
    } else if (!isOpen) {
      setFormData({
        title: "",
        description: "",
        assignee: null,
        storyPoints: 0,
        startDate: null,
        dueDate: null,
        status: "OPEN",
      });
    }
  }, [task, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div></div>
  );
}
