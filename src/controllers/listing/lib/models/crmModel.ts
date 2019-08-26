import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
let jsonData = require('/etc/config/keys.json')
export const MongoSchema = new Schema(JSON.parse(jsonData));