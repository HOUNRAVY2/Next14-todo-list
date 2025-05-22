import type { Metadata } from "next";
import { Todos } from "@/components/page";
export const metadata: Metadata = {
  title: "To do list",
  description: "各种有趣、刺激、身体发热的小说",
};

export default async function Index() {
  return <Todos />
}
