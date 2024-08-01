import { z } from "zod";

export const username = z
  .string()
  .max(20, "Username must not more then 20 character")
  .min(5, "Username character are greater then 5 character");

export const email = z
  .string()
  .email("Invalid Email")
  .min(5, "Email character must be greater then 5")
  .max(40, "Email character not greater then 40");

export const password = z
  .string()
  .min(5, "Password must greater then 5 character")
  .max(30, "password must less then 30 character");

export const signUpSchema = z.object({
  username: username,
  email: email,
  password: password,
});
