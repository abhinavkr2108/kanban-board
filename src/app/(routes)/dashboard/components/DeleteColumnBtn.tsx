"use client";
import { TrashIcon } from "lucide-react";
import React from "react";

interface DeleteColumnBtnProps {
  column: {
    id: string;
    name: string;
  };
}

export default function DeleteColumnBtn({ column }: DeleteColumnBtnProps) {
  const deleteColumn = (id: string) => {
    console.log("delete column: ", id);
  };
  return (
    <TrashIcon
      className="h-6 w-6 text-red-500 cursor-pointer"
      onClick={() => deleteColumn(column.id)}
    />
  );
}
