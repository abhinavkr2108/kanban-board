"use client";
import React, { useState } from "react";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Column, useColumnStore, useTasksStore } from "@/lib/store";

interface AddTasksBtnProps {
  column: Column;
}
export default function AddTasksBtn({ column }: AddTasksBtnProps) {
  const [taskContent, setTaskContent] = useState<string>("");
  const addTask = useTasksStore((state) => state.addTask);

  const addTasks = () => {
    const newTask = {
      taskId: crypto.randomUUID(),
      columnId: column.id,
      content: taskContent,
    };

    console.log("Column Id:", column.id);

    addTask(newTask);
    setTaskContent("");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full text-white font-bold">Add Tasks</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Tasks</DialogTitle>
          <DialogDescription>Add tasks to your kanban board</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Label htmlFor="name" className="text-start">
            Task Name
          </Label>
          <Textarea
            id="name"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <div className="flex flex-row items-center gap-4">
              <Button type="submit" onClick={addTasks}>
                Add Task
              </Button>
              <Button type="submit" variant={"destructive"}>
                Cancel
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
