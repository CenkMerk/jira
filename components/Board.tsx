"use client";

import { DragDropContext } from "@hello-pangea/dnd";
import TaskForm from "./TaskForm";
import BoardHeader from "./BoardHeader";
import BoardColumn from "./BoardColumn";
import { useBoard } from "../hooks/useBoard";

interface BoardProps {
  projectId: string;
}

export default function Board({ projectId }: BoardProps) {
  const {
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
  } = useBoard(projectId);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 overflow-x-auto">
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