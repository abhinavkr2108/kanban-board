"use client";
import { useState, useRef, useEffect, FC, MouseEvent } from "react";
import { Button } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useUserStore } from "@/lib/store";

interface NavigationItem {
  title: string;
  path: string;
}

const Header: FC = () => {
  const [menuState, setMenuState] = useState<boolean>(false);

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    console.log("User: ", user);
  }, [user]);

  const navigation: NavigationItem[] = [
    { title: "Home", path: "/" },
    { title: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="border-b">
      <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
        <div className="flex-none lg:flex-initial">
          <a
            href="/"
            className="text-xl md:text-2xl font-bold text-secondary-foreground"
          >
            KanbanFlow
          </a>
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div
            className={`absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${
              menuState ? "" : "hidden"
            }`}
          >
            <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
              {navigation.map((item, idx) => (
                <li
                  key={idx}
                  className="text-secondary-foreground hover:text-blue-900"
                >
                  <a href={item.path}>{item.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
            <div className="flex items-center space-x-2 p-2">
              <ThemeToggle />
            </div>

            {user ? <Button>Logout</Button> : <Button>Login</Button>}

            <button
              className="outline-none text-gray-400 block lg:hidden"
              onClick={() => setMenuState(!menuState)}
            >
              {menuState ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
