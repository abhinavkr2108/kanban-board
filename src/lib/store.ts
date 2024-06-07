import { arrayMove } from "@dnd-kit/sortable";
import exp from "constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * User Type
 */
export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

interface UserProps {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserProps>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      removeUser: () => set({ user: null }),
    }),
    {
      name: "user",
    }
  )
);

/**
 * Columns
 */
export type Column = {
  id: string;
  name: string;
};

interface ColumnProps {
  columns: Column[];
  addColumn: (column: Column) => void;
  removeColumn: (id: string) => void;
  setColumn: (column: Column[]) => void;
  moveColumns: (
    columns: Column[],
    activeColumnIndex: number,
    overColumnIndex: number
  ) => void;
}

export const useColumnStore = create<ColumnProps>()(
  persist(
    (set) => ({
      columns: [],
      addColumn: (column) =>
        set((state) => ({ columns: [...state.columns, column] })),
      removeColumn: (id) =>
        set((state) => ({
          columns: state.columns.filter((column) => column.id !== id),
        })),
      moveColumns: (columns, activeColumnIndex, overColumnIndex) =>
        set({
          columns: arrayMove(columns, activeColumnIndex, overColumnIndex),
        }),
      setColumn(column) {
        set((state) => ({ columns: column }));
      },
    }),
    {
      name: "columns",
    }
  )
);

/**
 * Tasks
 */

export type Tasks = {
  taskId: string;
  columnId: string;
  content: string;
};

interface TaskProps {
  tasks: Tasks[];
  addTask: (task: Tasks) => void;
  removeTask: (taskId: string) => void;
  setTask: (task: Tasks[]) => void;
}

export const useTasksStore = create<TaskProps>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      removeTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.taskId !== taskId),
        })),
      setTask(task) {
        set((state) => ({ tasks: task }));
      },
    }),
    {
      name: "tasks",
    }
  )
);
