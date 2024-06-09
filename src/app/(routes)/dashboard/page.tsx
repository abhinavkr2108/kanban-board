import React from "react";
import KanbanBoard from "./KanbanBoard";
import SectionHeader from "./SectionHeader";

export default function TestPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <SectionHeader />
      <div className="flex-grow bg-primary-foreground">
        <KanbanBoard />
      </div>
    </div>
  );
}
