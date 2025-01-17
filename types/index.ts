export type UserType = {
  id: string;
  name: string;
  avatar: string;
};

export type ProjectType = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskStatusType = "OPEN" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";

export type TaskType = {
  id: string;
  title: string;
  description: string;
  assignee: UserType | null;
  status: TaskStatusType;
  storyPoints: number;
  startDate: string | null;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  projectId: string;
};

export type ColumnType = {
  id: TaskStatusType;
  title: string;
  tasks: TaskType[];
};

export type BoardType = {
  columns: ColumnType[];
  tasks: TaskType[];
  users: UserType[];
  project: ProjectType;
};
