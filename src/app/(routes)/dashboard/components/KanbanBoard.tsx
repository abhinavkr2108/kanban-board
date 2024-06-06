"use client";
import { Button } from "@/components/ui/button";
import { ListPlusIcon, PlusCircleIcon, PlusIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import { useColumnStore } from "@/lib/store";
import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
type Column = {
  name: string;
  id: string;
};

export default function KanbanBoard() {
  // Zustand States
  const columns = useColumnStore((state) => state.columns);
  const addColumn = useColumnStore((state) => state.addColumn);

  //State Variables
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const columnsId = useMemo(() => {
    return columns.map((column) => column.id);
  }, [columns]);

  const [name, setName] = React.useState("");

  //Functions

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: Date.now().toString(),
      name: `Column ${columns.length + 1}`,
    };
    addColumn(columnToAdd);
  };

  const onDragStart = (e: DragStartEvent) => {
    console.log(e);
    if (e.active.data.current?.type === "column") {
      setActiveColumn(e.active.data.current?.column);
      return;
    }
  };
  return (
    <DndContext onDragStart={onDragStart}>
      <div className="mt-5 flex items-center overflow-x-auto overflow-y-hidden">
        <div className="container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/** It requires that you pass it a sorted array of the unique identifiers associated with the elements that use the SortableContext */}
          <SortableContext items={columnsId}>
            {columns.map((column) => (
              <ColumnContainer key={column.id} column={column} />
            ))}
          </SortableContext>
          <Button variant={"outline"} size={"lg"} onClick={createNewColumn}>
            <div className="flex items-center gap-3">
              <PlusCircleIcon className="h-6 w-6" />
              Create Column
            </div>
          </Button>
        </div>
      </div>
      {/** Drag Overlay shows the shadow of the column that we are dragging*/}
      <DragOverlay>
        {activeColumn && <ColumnContainer column={activeColumn} />}
      </DragOverlay>
    </DndContext>
  );
}
