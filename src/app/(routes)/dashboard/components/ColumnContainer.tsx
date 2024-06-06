import { Card, CardHeader } from "@/components/ui/card";
import { DeleteIcon, Edit2Icon, TrashIcon } from "lucide-react";
import React from "react";
import DeleteColumnBtn from "./DeleteColumnBtn";
import { Column } from "@/lib/store";

interface ColumnContainerProps {
  column: Column;
}
export default function ColumnContainer({ column }: ColumnContainerProps) {
  return (
    <Card>
      <CardHeader>
        <div className="bg-slate-100 p-3 flex items-center justify-between rounded-md">
          <h3 className="text-xl font-bold text-black">{column.name}</h3>
          <DeleteColumnBtn column={column} />
        </div>
      </CardHeader>
    </Card>
  );
}
