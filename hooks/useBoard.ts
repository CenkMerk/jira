import { useState, useEffect } from "react";
import { BoardType } from "../types";
import { getInitialBoard } from "@/helpers/getInitialBoard";

export function useBoard(projectId: string) {
  const [board, setBoard] = useState<BoardType>(() => {
    const savedBoard = localStorage.getItem(`board-${projectId}`);
    if (savedBoard) {
      return JSON.parse(savedBoard);
    }
    return getInitialBoard(projectId);
  });

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
    stats: {
      totalTasks,
      completedTasks,
      inProgressTasks,
      progress,
    },
  };
}
