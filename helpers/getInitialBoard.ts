import { BoardType } from "../types";
import {
  mockProjects,
  mockTasks,
  mockUsers,
  mockColumns,
} from "../data/mocData";

export const getInitialBoard = (projectId: string): BoardType => {
  const project =
    mockProjects.find((p) => p.id === projectId) || mockProjects[0];
  const projectTasks = mockTasks.filter(
    (task) => task.projectId === project.id
  );

  return {
    columns: mockColumns.map((column) => ({
      ...column,
      tasks: projectTasks.filter((task) => task.status === column.id),
    })),
    tasks: projectTasks,
    users: mockUsers,
    project,
  };
};
