import { useState, useEffect } from "react";
import { BoardType, TaskType } from "../types";
import { getInitialBoard } from "@/helpers/getInitialBoard";

export function useBoard(projectId: string) {
  const [board, setBoard] = useState<BoardType>(() => {
    const savedBoard = localStorage.getItem(`board-${projectId}`);
    if (savedBoard) {
      return JSON.parse(savedBoard);
    }
    return getInitialBoard(projectId);
  });
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | undefined>(
    undefined
  );
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem(`board-${projectId}`, JSON.stringify(board));
  }, [board, projectId]);

  useEffect(() => {
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

  const onDragEnd = (result: any) => {
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
      status: destination.droppableId,
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

  // Calculate project statistics
  const totalTasks = board.tasks.length;
  const completedTasks = board.tasks.filter(
    (task) => task.status === "DONE"
  ).length;
  const inProgressTasks = board.tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;
  const progress = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return {
    board,
    isTaskFormOpen,
    editingTask,
    selectedUsers,
    filteredTasks,
    onDragEnd,
    handleTaskSubmit,
    handleUserSelect,
    openNewTaskForm,
    closeTaskForm,
    openEditTaskForm,
    // Project statistics
    stats: {
      totalTasks,
      completedTasks,
      inProgressTasks,
      progress,
    },
  };
}
