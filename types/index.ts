export type User = {
  id: string;
  name: string;
  avatar: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskStatus = "OPEN" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";

export type Task = {
  id: string;
  title: string;
  description: string;
  assignee: User | null;
  status: TaskStatus;
  storyPoints: number;
  startDate: string | null;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  projectId: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
  tasks: Task[];
};

export type Board = {
  columns: Column[];
  tasks: Task[];
  users: User[];
  project: Project;
};
