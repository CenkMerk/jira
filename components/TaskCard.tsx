import { TaskType } from "../types";
import { DraggableProvided } from "@hello-pangea/dnd";
import Image from "next/image";

interface TaskCardProps {
  task: TaskType;
  provided: DraggableProvided;
  onClick: () => void;
}

export default function TaskCard({ task, provided, onClick }: TaskCardProps) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="cursor-pointer rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <h3 className="font-medium text-gray-900">{task.title}</h3>
      <p className="mt-1 text-sm text-gray-600">{task.description}</p>
      {task.assignee && (
        <div className="mt-2 flex items-center space-x-2">
          <Image
            src={task.assignee.avatar}
            alt={task.assignee.name}
            className="h-6 w-6 rounded-full"
            width={24}
            height={24}
          />
          <span className="text-sm text-gray-600">{task.assignee.name}</span>
        </div>
      )}
      <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
        <span>{task.storyPoints} points</span>
        <span>
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString("tr-TR")
            : ""}
        </span>
      </div>
    </div>
  );
}
