"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tasks, useTasksStore } from "@/lib/store";
import { Trash2Icon } from "lucide-react";
import React, { useState } from "react";

interface TasksProps {
  task: Tasks;
}
export default function TaskItems({ task }: TasksProps) {
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const removeTask = useTasksStore((state) => state.removeTask);
  return (
    <Card
      className="px-4 py-[10px] flex justify-between items-center"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <div>{task.content}</div>
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
