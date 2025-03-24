import { config } from "dotenv";

config();

const port = process.env.PORT || 8080;
const db = process.env.DB || "mongodb://localhost:27017/basic-auth-backend";

export const serverConfig = {
  port,
  db,
};


