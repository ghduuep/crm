import jwt from "@elysiajs/jwt";

export const authJwt = jwt({
  name: "jwt",
  secret: process.env.JWT_SECRET_KEY!,
  alg: "HS256",
  exp: "7d",
});
