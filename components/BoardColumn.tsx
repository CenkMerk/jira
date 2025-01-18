import { TaskType } from "../types";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

interface BoardColumnProps {
  id: string;
  title: string;
  tasks: TaskType[];
  onTaskClick: (task: TaskType) => void;
}

export default function BoardColumn({ id, title, tasks, onTaskClick }: BoardColumnProps) {
  return (
    <div className="rounded-lg bg-gray-200 p-2 sm:p-4">
      <h2 className="mb-2 sm:mb-4 text-base sm:text-lg font-semibold text-gray-700">{title}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-1 sm:space-y-2 min-h-[100px]"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <TaskCard
                    task={task}
                    provided={provided}
                    onClick={() => onTaskClick(task)}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
} 