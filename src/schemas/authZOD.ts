import { z, object, string } from "zod";
const invalid_type_error = "invalid input";
const required_error = "invalid input";

export const username = z
  .string({ invalid_type_error, required_error })
  .trim()
  .min(1, "Username Required")
  .min(5, "Too short username")
  .max(20, "Too large username")

export const email = z
  .string({ invalid_type_error, required_error })
  .min(1, "Email Required")
  .email("Invalid Email syntax")
  .min(5, "Too short email")
  .max(40, "Too large email");

export const password = z
  .string({ invalid_type_error, required_error })
  .min(1, "Password Required")
  .min(5, "Too short password")
  .max(30, "Too large password");

export const OTP = z.number();

export const signUpSchema = z.object({
  username: username,
  email: email,
  password: password,
});
export const signInSchema = z.object({
  username: username,
  email: email,
  password: password,
});
export const OtpSchema = z.object({
  otp: OTP,
});
