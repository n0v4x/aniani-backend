import dotenv from "dotenv";

dotenv.config();

import cors from "cors";
import express from "express";
import episodes from "./routes/episodes";
import episode from "./routes/episode";
import releases from "./routes/releases";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use("/api/episodes", episodes);
app.use("/api/episode", episode);
app.use("/api/releases", releases);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
