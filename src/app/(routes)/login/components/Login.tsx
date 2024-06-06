"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { use, useState } from "react";
import { User, useUserStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function Login() {
  const [user, setuser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const setUser = useUserStore((state) => state.setUser);

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (user.firstName === "" || user.email === "" || user.password === "") {
      toast({
        title: "Error!",
        description: "Please fill all the fields",
        variant: "destructive",
      });
      return;
    }
    console.log(user);
    setUser(user);

    router.push("/dashboard");
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Abhinav"
                  required
                  value={user.firstName}
                  onChange={(e) =>
                    setuser({ ...user, firstName: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Kumar"
                  required
                  value={user.lastName}
                  onChange={(e) =>
                    setuser({ ...user, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setuser({ ...user, email: e.target.value })}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={user.password}
                required
                onChange={(e) => setuser({ ...user, password: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Get Started
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
