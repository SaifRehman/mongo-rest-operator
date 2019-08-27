import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const config = require(process.env.MODEL);

export const TodoSchema = new Schema(JSON.parse(config));