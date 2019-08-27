import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const config = require(process.env.DATAMODEL);

export const TodoSchema = new Schema(JSON.parse(config));