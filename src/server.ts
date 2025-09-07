import http from "http";
import app from "./app";
import { PORT } from "./config/env.config";
import { connectDB } from "./config/db.config";
import './config/env.config'

connectDB();
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});

server.on("error", (error) => {
  console.error("Error occurred:", error);
});
