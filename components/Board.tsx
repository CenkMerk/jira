"use client";

import { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import TaskForm from "./TaskForm";
import BoardHeader from "./BoardHeader";
import BoardColumn from "./BoardColumn";
import { getInitialBoard } from "@/helpers/getInitialBoard";
import { BoardType, TaskType, TaskStatusType } from "@/types";

interface BoardProps {
  projectId: string;
}

export default function Board({ projectId }: BoardProps) {
  const [board, setBoard] = useState<BoardType>(() => {
    // Client-side only code
    if (typeof window !== 'undefined') {
      const savedBoard = localStorage.getItem(`board-${projectId}`);
      if (savedBoard) {
        return JSON.parse(savedBoard);
      }
    }
    return getInitialBoard(projectId);
  });
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | undefined>(
    undefined
  );
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    // Save to localStorage whenever board changes
    localStorage.setItem(`board-${projectId}`, JSON.stringify(board));
  }, [board, projectId]);

  useEffect(() => {
    // Load from localStorage when projectId changes
    const savedBoard = localStorage.getItem(`board-${projectId}`);
    if (savedBoard) {
      setBoard(JSON.parse(savedBoard));
    } else {
      setBoard(getInitialBoard(projectId));
    }
  }, [projectId]);

  const filteredTasks =
    selectedUsers.length > 0
      ? board.tasks.filter(
          (task) => task.assignee && selectedUsers.includes(task.assignee.id)
        )
      : board.tasks;

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const task = filteredTasks.find((t) => t.id === draggableId);
    if (!task) return;

    const updatedTask: TaskType = {
      ...task,
      status: destination.droppableId as TaskStatusType,
      updatedAt: new Date().toISOString(),
    };

    const updatedTasks = board.tasks.map((t) =>
      t.id === draggableId ? updatedTask : t
    );

    const updatedColumns = board.columns.map((col) => ({
      ...col,
      tasks: updatedTasks
        .filter((task) =>
          selectedUsers.length > 0
            ? task.assignee && selectedUsers.includes(task.assignee.id)
            : true
        )
        .filter((task) => task.status === col.id),
    }));

    setBoard({
      ...board,
      tasks: updatedTasks,
      columns: updatedColumns,
    });
  };

  const handleTaskSubmit = (taskData: Partial<TaskType>) => {
    if (editingTask) {
      const updatedTask = {
        ...editingTask,
        ...taskData,
        updatedAt: new Date().toISOString(),
      };

      const updatedTasks = board.tasks.map((t) =>
        t.id === editingTask.id ? updatedTask : t
      );

      const updatedColumns = board.columns.map((col) => ({
        ...col,
        tasks: updatedTasks.filter((task) => task.status === col.id),
      }));

      setBoard({
        ...board,
        tasks: updatedTasks,
        columns: updatedColumns,
      });
    } else {
      const newTask: TaskType = {
        id: Math.random().toString(36).substr(2, 9),
        ...taskData,
        status: taskData.status || "OPEN",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        projectId: board.project.id,
      } as TaskType;

      const updatedTasks = [...board.tasks, newTask];
      const updatedColumns = board.columns.map((col) => ({
        ...col,
        tasks: updatedTasks.filter((task) => task.status === col.id),
      }));

      setBoard({
        ...board,
        tasks: updatedTasks,
        columns: updatedColumns,
      });
    }

    setEditingTask(undefined);
    setIsTaskFormOpen(false);
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const openNewTaskForm = () => {
    setEditingTask(undefined);
    setIsTaskFormOpen(true);
  };

  const closeTaskForm = () => {
    setIsTaskFormOpen(false);
    setEditingTask(undefined);
  };

  const openEditTaskForm = (task: TaskType) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-8">
      <BoardHeader
        users={board.users}
        selectedUsers={selectedUsers}
        onUserSelect={handleUserSelect}
        onNewTask={openNewTaskForm}
        projectName={board.project.name}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
          {board.columns.map((column) => (
            <BoardColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={filteredTasks.filter((task) => task.status === column.id)}
              onTaskClick={openEditTaskForm}
            />
          ))}
        </div>
      </DragDropContext>

      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={closeTaskForm}
        onSubmit={handleTaskSubmit}
        users={board.users}
        task={editingTask}
      />
    </div>
  );
}
