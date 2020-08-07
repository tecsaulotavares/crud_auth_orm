import * as dotenv from "dotenv";
dotenv.config();

import App from "./app";
import "./db";

const { PORT } = process.env;

App.listen(PORT, () => console.log("Server On"));
