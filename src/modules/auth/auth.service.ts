import { and, eq } from "drizzle-orm";
import { db } from "../../index";

export const authService = {
  async validateUser(email: string, password: string) {
    const user = await db.query.users.findFirst({
      where: (user) => and(eq(user.email, email), eq(user.password, password)),
    });

    if (!user) {
      return null;
    }

    return user;
  },
};
