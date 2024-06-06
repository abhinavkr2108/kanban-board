"use client";
import { Button } from "@/components/ui/button";
import { ListPlusIcon, PlusCircleIcon, PlusIcon } from "lucide-react";
import React from "react";
import ColumnContainer from "./ColumnContainer";
import { useColumnStore } from "@/lib/store";

type Column = {
  name: string;
  id: string;
};

export default function KanbanBoard() {
  // const [columns, setColumns] = React.useState<Column[]>([]);
  const columns = useColumnStore((state) => state.columns);
  const addColumn = useColumnStore((state) => state.addColumn);
  const [name, setName] = React.useState("");

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: Date.now().toString(),
      name: `Column ${columns.length + 1}`,
    };
    addColumn(columnToAdd);
  };
  return (
    <div className="mt-5 flex items-center overflow-x-auto overflow-y-hidden">
      <div className="container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {columns.map((column) => (
          <ColumnContainer key={column.id} column={column} />
        ))}
        <Button variant={"outline"} size={"lg"} onClick={createNewColumn}>
          <div className="flex items-center gap-3">
            <PlusCircleIcon className="h-6 w-6" />
            Create Column
          </div>
        </Button>
      </div>
    </div>
  );
}
