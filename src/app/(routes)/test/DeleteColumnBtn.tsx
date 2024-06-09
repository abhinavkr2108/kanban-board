"use client";
import { Column, useColumnStore } from "@/lib/store";
import { TrashIcon } from "lucide-react";
import React from "react";

interface DeleteColumnBtnProps {
  column: Column;
}

export default function DeleteColumnBtn({ column }: DeleteColumnBtnProps) {
  const removeColumn = useColumnStore((state) => state.removeColumn);
  const deleteColumn = (id: string) => {
    removeColumn(id);
  };

  return (
    <TrashIcon
      className="h-6 w-6 text-red-500 cursor-pointer"
      onClick={() => deleteColumn(column.id)}
    />
  );
}
