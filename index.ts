import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";

import resolvers from "./resolvers";

const port = process.env.PORT || 9000;
const app = express();

app.use(cors(), bodyParser.json());

const typeDefs = fs.readFileSync("./schema.graphql", { encoding: "utf-8" });

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors(), bodyParser.json());

app.use("/graphql", graphqlExpress({ schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen(port, () => console.info(`Server started on port ${port}`));
