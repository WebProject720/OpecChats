import { z } from "zod";

export const CreateGroupSchema = z.object({
  name: z.string().max(15, "Max Lenght 15").min(3, "Min Length 3"),
  code: z.string().optional().refine(val => {
    // Check if the field has a value, then ensure its length is at least 3
    return !val || val.length >= 3;
  }, {
    message: "If provided, must be at least 3 characters long",
  }),
});
