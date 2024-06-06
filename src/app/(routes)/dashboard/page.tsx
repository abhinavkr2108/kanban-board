import React from "react";
import SectionHeader from "./components/SectionHeader";
import KanbanBoard from "./components/KanbanBoard";

export default function DashboardPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <SectionHeader />
      <div className="flex-grow bg-primary-foreground">
        <KanbanBoard />
      </div>
    </div>
  );
}
