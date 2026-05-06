export const authMiddleware = async ({
  jwt,
  headers: { authorization },
  status,
}: {
  jwt: any;
  headers: { authorization?: string };
  status: (code: number, msg?: string) => any;
}) => {
  const token = authorization?.replace(/^Bearer\s+/, "");
  if (!token) return status(401, "Missing authorization token");

  const payload = await jwt.verify(token);
  if (!payload) return status(401, "Invalid token");

  return { user: payload };
};
