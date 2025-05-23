import type { Metadata } from "next";
import { Todos } from "@/components/page";
export const metadata: Metadata = {
  title: "Todo list",
  description: "This is a simple to-do list web app built for a coding challenge. It allows users to add, edit, delete, and mark tasks as complete. The goal is to demonstrate clean code, responsive design, and efficient state management.",
 
};

export default async function Index() {
  return <Todos />
}
