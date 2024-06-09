"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tasks, useTasksStore } from "@/lib/store";
import { Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

interface TasksProps {
  task: Tasks;
  index: number;
}
export default function TaskItems({ task, index }: TasksProps) {
  // State Variables
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [taskContent, setTaskContent] = useState<string>("");
  const [activeTask, setActiveTask] = useState<Tasks | null>(null);

  // Tasks Properties from Zustand Store
  const removeTask = useTasksStore((state) => state.removeTask);
  const tasks = useTasksStore((state) => state.tasks);
  const setTask = useTasksStore((state) => state.setTask);

  // Hooks from react-dnd

  // Functions
  const updateTask = (taskId: string, content: string) => {
    if (content.length == 0) {
      return;
    }

    const newTasks = tasks.map((task) => {
      if (task.taskId !== taskId) {
        return task;
      }
      return {
        ...task,
        content: content,
      };
    });
    setTask(newTasks);
  };
  return (
    <Draggable draggableId={task.taskId} index={index}>
      {(provided) => (
        <Card
          className="px-4 py-[10px] flex justify-between items-center cursor-grab relative"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
          // onClick={() => setEditMode(true)}
        >
          <div>
            {editMode ? (
              <Textarea
                className="w-full"
                autoFocus
                onBlur={() => setEditMode(false)}
                value={task.content}
                onChange={(e) => {
                  updateTask(task.taskId, e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.shiftKey) {
                    setEditMode(false);
                    updateTask(task.taskId, taskContent);
                    e.preventDefault();
                  }
                }}
              />
            ) : (
              <p className="w-full h-[90%] overflow-y-auto overflow-x-auto whitespace-pre-wrap">
                {task.content}
              </p>
            )}
          </div>
          <div>
            {mouseOver && (
              <Trash2Icon
                onClick={() => removeTask(task.taskId)}
                className=" text-red-500 opacity-50 hover:opacity-100"
              />
            )}
          </div>
        </Card>
      )}
    </Draggable>
  );
}
