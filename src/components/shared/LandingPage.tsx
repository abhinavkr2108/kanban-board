"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useUserStore } from "@/lib/store";
import Link from "next/link";

export default function LandingPage() {
  const user = useUserStore((state) => state.user);
  return (
    <section>
      <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <h1 className="text-sm text-indigo-600 font-medium">
            Build products for everyone
          </h1>
          <h2 className="text-4xl text-secondary-foreground font-extrabold mx-auto md:text-5xl">
            Streamline your workflow with ease{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
              using Kanban Board
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-secondary-foreground">
            KanbanFlow is a user-friendly Kanban board website designed to help
            individuals and teams manage tasks efficiently. With features like
            drag-and-drop functionality it empowers you to visualize progress,
            prioritize tasks, and enhance productivity effortlessly.
          </p>
          <div className="flex flex-row justify-center">
            <div className="flex flex-row items-center gap-3">
              {user ? (
                <Link href="/dashboard">
                  <Button className="text-gray-100 font-bold text-lg">
                    Get started
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button className="text-gray-100 font-bold text-lg">
                    Get started
                  </Button>
                </Link>
              )}

              <Button
                variant={"secondary"}
                className="text-secondary-foreground font-bold text-lg"
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-14">
          <Image
            src="/hero_img.jpg"
            width={500}
            height={300}
            className="w-full shadow-lg rounded-lg border"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
