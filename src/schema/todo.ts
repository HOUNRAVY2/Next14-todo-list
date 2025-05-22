import {z} from "zod";
export const TodoSchema = z.object({
  todo: z.string(),
  isCompleted: z.boolean(),
  createdAt: z.string().optional(),
});