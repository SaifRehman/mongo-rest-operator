import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
let jsonData = require(process.env.PATH)
export const MongoSchema = new Schema(JSON.parse(jsonData));