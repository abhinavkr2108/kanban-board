"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DeleteIcon, Edit2Icon, TrashIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import DeleteColumnBtn from "./DeleteColumnBtn";
import { Column, Tasks, useColumnStore, useTasksStore } from "@/lib/store";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddTasksBtn from "./AddTasksBtn";
import TaskItems from "./TaskItems";

interface ColumnContainerProps {
  column: Column;
  index: number;
}
export default function ColumnContainer({
  column,
  index,
}: ColumnContainerProps) {
  const [editMode, setEditMode] = useState<boolean>(false);

  // Columns Properties from Zustand Store
  const columns = useColumnStore((state) => state.columns);
  const setColumn = useColumnStore((state) => state.setColumn);

  //Tasks Properties from Zustand Store
  const tasks = useTasksStore((state) => state.tasks);

  const updateColumn = (id: string, name: string) => {
    if (name.length == 0) {
      return;
    }
    const newColumns = columns.map((column) => {
      if (column.id === id) {
        return { ...column, name: name };
      }
      return column;
    });
    setColumn(newColumns);
  };
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Card {...provided.draggableProps} ref={provided.innerRef}>
          <CardHeader {...provided.dragHandleProps}>
            <div className="bg-slate-100 p-3 flex items-center justify-between rounded-md">
              <h3
                className="text-xl font-bold text-black"
                onClick={() => setEditMode(true)}
              >
                {editMode ? (
                  <Input
                    type="text"
                    className="bg-white w-[80%] rounded-md"
                    onBlur={() => setEditMode(false)}
                    autoFocus
                    value={column.name}
                    onChange={(e) => {
                      updateColumn(column.id, e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setEditMode(false);
                      }
                    }}
                  />
                ) : (
                  column.name
                )}
              </h3>
              <DeleteColumnBtn column={column} />
            </div>
          </CardHeader>
          <CardContent>
            <Droppable droppableId={column.id} type="task">
              {(provided) => (
                <div
                  className="flex flex-col gap-4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasks
                    .filter((task) => task.columnId === column.id)
                    .map((task, index: number) => (
                      <TaskItems key={task.taskId} task={task} index={index} />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </CardContent>
          <CardFooter>
            <AddTasksBtn column={column} />
          </CardFooter>
        </Card>
      )}
    </Draggable>
  );
}
