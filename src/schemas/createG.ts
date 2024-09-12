import { z } from "zod";

export const CreateGroupSchema = z.object({
  name: z.string().max(15, "Max Lenght 15").min(3, "Min Length 3"),
  code: z.string().max(20, "Max Length 20").min(5, "Min Length 5"),
});
