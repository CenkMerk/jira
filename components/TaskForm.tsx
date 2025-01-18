"use client";

import { useState, useEffect } from "react";
import { TaskType, UserType } from "../types";
import Dialog from "./ui/Dialog";
import { InputText } from "./ui/InputText";
import { Label } from "./ui/Label";
import { InputTextarea } from "./ui/InputTextarea";
import { Dropdown } from "./ui/Dropdown";
import { InputNumber } from "./ui/InputNumber";
import { Calendar } from "./ui/Calendar";
import { Button } from "./ui/Button";

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
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={task ? "Edit Task" : "Create New Task"}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <InputText
              id="title"
              required
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <InputTextarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Dropdown
              value={formData.assignee?.id}
              onChange={(value) => {
                const user =
                  value === "none" ? null : users.find((u) => u.id === value);
                setFormData({ ...formData, assignee: user || null });
              }}
              options={users}
              optionLabel="name"
              optionValue="id"
              itemTemplate={(option) => (
                <div className="flex items-center gap-2">
                  <img src={option.avatar} className="h-6 w-6 rounded-full" />
                  <span>{option.name}</span>
                </div>
              )}
              valueTemplate={(option) => (
                <div className="flex items-center gap-2">
                  <img src={option.avatar} className="h-6 w-6 rounded-full" />
                  <span>{option.name}</span>
                </div>
              )}
              showClear
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="storyPoints">Story Points</Label>
            <InputNumber
              id="storyPoints"
              min={0}
              value={formData.storyPoints}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({
                  ...formData,
                  storyPoints: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Calendar
                id="startDate"
                required
                type="date"
                value={formData.startDate || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, startDate: e.target.value });
                  // Reset due date if it becomes invalid
                  if (formData.dueDate && e.target.value > formData.dueDate) {
                    setFormData(prev => ({ ...prev, dueDate: e.target.value }));
                  }
                }}
                max={formData.dueDate || undefined}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Calendar
                id="dueDate"
                type="date"
                required
                value={formData.dueDate || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                min={formData.startDate || undefined}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {task ? "Save Changes" : "Create Task"}
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
}
