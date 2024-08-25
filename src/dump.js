
import {printSchema, buildSchema} from "graphql";
import { readFileSync } from 'fs';

const typeDefs = readFileSync('./graphql/schema.graphql', 'utf8')
const schema = buildSchema(typeDefs)
console.log(printSchema(typeDefs))