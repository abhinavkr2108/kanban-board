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
    }),
    {
      name: "columns",
    }
  )
);
