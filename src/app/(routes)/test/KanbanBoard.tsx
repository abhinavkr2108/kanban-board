"use client";
import { Button } from "@/components/ui/button";
import { ListPlusIcon, PlusCircleIcon, PlusIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import { Tasks, useColumnStore, useTasksStore } from "@/lib/store";
// import {
//   DndContext,
//   DragEndEvent,
//   DragOverlay,
//   DragStartEvent,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Column = {
  name: string;
  id: string;
};

interface TaskOrderMap {
  [key: string]: number;
}

export default function KanbanBoard() {
  // Zustand States
  const columns = useColumnStore((state) => state.columns);
  const tasks = useTasksStore((state) => state.tasks);
  const setTask = useTasksStore((state) => state.setTask);
  const moveColumns = useColumnStore((state) => state.moveColumns);
  const setColumn = useColumnStore((state) => state.setColumn);
  const addColumn = useColumnStore((state) => state.addColumn);

  //State Variables
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Tasks | null>(null);

  const columnsId = useMemo(() => {
    return columns.map((column) => column.id);
  }, [columns]);

  const [name, setName] = React.useState("");

  //Functions

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: Date.now().toString(),
      name: name,
    };
    addColumn(columnToAdd);
  };

  function reorder<T>(list: T[], startIdx: number, endIdx: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIdx, 1);
    result.splice(endIdx, 0, removed);
    return result;
  }

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) return;

    // dropping in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // moving column
    if (type === "column") {
      const newColumnOrder = reorder(columns, source.index, destination.index);
      newColumnOrder.map((column, index) => ({ ...column, order: index }));
      setColumn(newColumnOrder);
    }

    // moving task itemsif (type === "task") {
    const newTasksData: Tasks[] = [...tasks];
    const sourceTasks = newTasksData.filter(
      (task) => task.columnId === source.droppableId
    );
    const destinationTasks = newTasksData.filter(
      (task) => task.columnId === destination.droppableId
    );

    if (sourceTasks.length === 0 || destinationTasks.length === 0) return;

    // Moving tasks within the same column
    if (type === "task") {
      // Clone the tasks array to avoid direct mutation
      let updatedTasks = [...tasks];

      // Find the index of the source column in the tasks array
      const sourceColumnIndex = updatedTasks.findIndex(
        (task) => task.columnId === source.droppableId
      );
      const destinationColumnIndex = updatedTasks.findIndex(
        (task) => task.columnId === destination.droppableId
      );

      // Only proceed if both source and destination are valid and refer to the same column
      if (
        sourceColumnIndex !== -1 &&
        sourceColumnIndex === destinationColumnIndex
      ) {
        // Extract tasks from the source column
        const columnTasks = updatedTasks.filter(
          (task) => task.columnId === source.droppableId
        );

        // Reorder tasks within the column
        const reorderedColumnTasks = reorder(
          columnTasks,
          source.index,
          destination.index
        );

        // Clear out the tasks from the source column in the updatedTasks array
        updatedTasks = updatedTasks.filter(
          (task) => task.columnId !== source.droppableId
        );

        // Merge reordered tasks back into the updatedTasks array
        reorderedColumnTasks.forEach((task, index) => {
          task.order = index; // Update the order property for each task
          updatedTasks.push(task); // Add the reordered task back into the array
        });

        // Remove duplicates that might have been added during the push operation
        updatedTasks = updatedTasks.filter(
          (task, index, self) =>
            index === self.findIndex((t) => t.taskId === task.taskId)
        );

        // Update the state with the fully updated tasks array
        setTask(updatedTasks);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mt-5 flex items-center overflow-x-auto overflow-y-hidden">
        <Droppable droppableId="columns" type="column" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
            >
              {columns.map((column, index) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} size={"lg"}>
              <div className="flex items-center gap-3">
                <PlusCircleIcon className="h-6 w-6" />
                Create Column
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Column</DialogTitle>
              <DialogDescription>
                Enter the name of your column
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-start gap-3">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button type="submit" onClick={createNewColumn}>
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DragDropContext>
  );
}
