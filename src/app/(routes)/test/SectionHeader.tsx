"use client";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/store";
import React from "react";

export default function SectionHeader() {
  const user = useUserStore((state) => state.user);
  return (
    <header className="bg-secondary">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-secondary-foreground sm:text-3xl">
              Welcome {user?.firstName}
            </h1>

            <p className="mt-1.5 text-sm text-secondary-foreground">
              Start creating your Kanban Board 🎉
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <Button variant={"destructive"}>Logout</Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
