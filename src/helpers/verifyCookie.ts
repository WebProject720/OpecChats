import jwt from "jsonwebtoken";

export const verifyCookie = (cookie: string = "") => {
  console.log("cookie", cookie);
  const res = jwt.verify(cookie, process.env.JWT_SECRET_KEY || "");
  console.log(res);
};
