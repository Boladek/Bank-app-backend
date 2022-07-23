import express, {  } from "express";
import bodyParser from "body-parser";
import logger from "./utils/logger";
import routes from "./routes";
import cors from "cors";
import 'dotenv/config';
import {connect} from "./database/index";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/", routes);
connect();
app.listen(process.env.PORT, () => {
  logger.info("listening on port 8080");
});
