"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tasks, useTasksStore } from "@/lib/store";
import { DragStartEvent } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2Icon } from "lucide-react";
import React, { useState } from "react";

interface TasksProps {
  task: Tasks;
}
export default function TaskItems({ task }: TasksProps) {
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.taskId,
    data: { type: "tasks", task: task },
    disabled: editMode,
  });

  const style = {
    transition: transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        className="px-4 py-[10px] flex justify-between items-center cursor-default opacity-40"
      >
        <p className="w-full h-[90%] overflow-y-auto overflow-x-auto whitespace-pre-wrap">
          {task.content}
        </p>
      </Card>
    );
  }

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
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="px-4 py-[10px] flex justify-between items-center cursor-grab relative"
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
  );
}
