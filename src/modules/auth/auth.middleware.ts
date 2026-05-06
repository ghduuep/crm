export const authMiddleware = async (ctx) => {
  const token = ctx.headers.authorization?.replace(/^Bearer\s+/, "");

  if (!token) {
    ctx.set.status = 401;
    return {
      code: "UNAUTHORIZED",
      message: "Missing authorization token",
    }
  }

  const payload = await ctx.jwt.verify(token);

  if (!payload) {
    ctx.set.status = 401;
    return {
      code: "UNAUTHORIZED",
      message: "Invalid token",
    }
  }

  ctx.user = payload;
};
