import bcrypt from "bcrypt";
import { db } from "../database/db.js";
import { admins } from "../database/schema.js";
import { env } from "../config/env.js";

const run = async () => {
  const hashed = await bcrypt.hash(env.ADMIN_PASS, 10);

  await db.insert(admins).values({
    username: env.ADMIN_USER,
    email: env.MAIL_USER,
    password: hashed,
  });

  console.log("✅ Admin created");
  process.exit();
};

run();