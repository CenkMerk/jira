import { UserType } from "../types";
import { Plus } from "lucide-react";
import { Button } from "./ui/Button";
interface BoardHeaderProps {
  users: UserType[];
  selectedUsers: string[];
  onUserSelect: (userId: string) => void;
  onNewTask: () => void;
  projectName: string;
}

export default function BoardHeader({
  users,
  selectedUsers,
  onUserSelect,
  onNewTask,
  projectName,
}: BoardHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{projectName}</h1>
          <p className="text-gray-600 mt-1">Task Board</p>
        </div>
        <Button
          onClick={onNewTask}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="mr-2" />
          New Task
        </Button>
      </div>
      <div className="mt-4 flex space-x-2">
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center rounded-full transition-all ${
              selectedUsers.includes(user.id)
                ? "bg-indigo-100 ring-2 ring-indigo-600"
                : "bg-white hover:bg-gray-50"
            } ${
              selectedUsers.length > 0 && !selectedUsers.includes(user.id)
                ? "opacity-40 hover:opacity-100"
                : "opacity-100"
            }`}
            onClick={() => onUserSelect(user.id)}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="h-8 w-8 rounded-full"
              title={user.name}
            />
            <span className="hidden md:inline-block text-sm text-gray-700 px-2">
              {user.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
