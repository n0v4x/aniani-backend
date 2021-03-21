"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const episodes_1 = __importDefault(require("./routes/episodes"));
const episode_1 = __importDefault(require("./routes/episode"));
const releases_1 = __importDefault(require("./routes/releases"));
const port = process.env.PORT || 3000;
const app = express_1.default();
app.use(cors_1.default());
app.use("/api/episodes", episodes_1.default);
app.use("/api/episode", episode_1.default);
app.use("/api/releases", releases_1.default);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=index.js.map