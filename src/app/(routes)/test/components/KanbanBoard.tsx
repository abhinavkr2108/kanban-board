"use client";
import { Button } from "@/components/ui/button";
import { ListPlusIcon, PlusCircleIcon, PlusIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import { Tasks, useColumnStore } from "@/lib/store";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { DragDropContext } from "react-beautiful-dnd";
import { createPortal } from "react-dom";
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
import TaskItems from "./TaskItems";

type Column = {
  name: string;
  id: string;
};

export default function KanbanBoard() {
  // Zustand States
  const columns = useColumnStore((state) => state.columns);
  const moveColumns = useColumnStore((state) => state.moveColumns);
  const addColumn = useColumnStore((state) => state.addColumn);

  //Dnd Kit Hooks
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  ); // For delete column functionality to work

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

  const onDragStart = (e: DragStartEvent) => {
    console.log(e);
    if (e.active.data.current?.type === "column") {
      setActiveColumn(e.active.data.current?.column);
      return;
    }
    if (e.active.data.current?.type === "task") {
      setActiveTask(e.active.data.current?.task);
      return;
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) return;

    const activeColumnIndex = columns.findIndex(
      (column) => column.id === activeColumnId
    );
    const overColumnIndex = columns.findIndex(
      (column) => column.id === overColumnId
    );
    // Array Move
    moveColumns(columns, activeColumnIndex, overColumnIndex);
  };
  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="mt-5 flex items-center overflow-x-auto overflow-y-hidden">
        <div className="container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/** It requires that you pass it a sorted array of the unique identifiers associated with the elements that use the SortableContext */}
          <SortableContext items={columnsId}>
            {columns.map((column) => (
              <ColumnContainer key={column.id} column={column} />
            ))}
          </SortableContext>
          <Dialog>
            <DialogTrigger>
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
      </div>
      {/** Drag Overlay shows the shadow of the column that we are dragging*/}
      {createPortal(
        <DragOverlay>
          {activeColumn && <ColumnContainer column={activeColumn} />}
          {activeTask && <TaskItems task={activeTask} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
