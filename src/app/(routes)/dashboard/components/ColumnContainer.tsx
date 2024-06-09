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
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
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

  // Hooks from react-dnd
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: "column", column: column },
    disabled: editMode,
  });

  const style = {
    transition: transition,
    transform: CSS.Transform.toString(transform),
  };

  // items for sortable context
  const taskItems = useMemo(() => {
    return tasks.map((task) => task.taskId);
  }, [tasks]);

  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="opacity-30"
      >
        <CardHeader>
          <div className="bg-slate-100 p-3 flex items-center justify-between rounded-md">
            <h3 className="text-xl font-bold text-black">{column.name}</h3>
            <DeleteColumnBtn column={column} />
          </div>
        </CardHeader>
      </Card>
    );
  }

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
    <Card ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <CardHeader>
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
        <div className="flex flex-col gap-4">
          <SortableContext items={taskItems}>
            {tasks
              .filter((task) => task.columnId === column.id)
              .map((task) => (
                <TaskItems key={task.taskId} task={task} />
              ))}
          </SortableContext>
        </div>
      </CardContent>
      <CardFooter>
        <AddTasksBtn column={column} />
      </CardFooter>
    </Card>
  );
}
