import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const config = process.env.MODEL;

export const TodoSchema = new Schema(JSON.parse(config.replace(/'/g,"\"").replace(/"s/g,"'")));