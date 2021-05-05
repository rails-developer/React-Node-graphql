import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const port = process.env.PORT || 9000;
const app = express();

app.listen(port, () => console.info(`Server started on port ${port}`));
