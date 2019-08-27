import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const config = require('./keys.txt');

export const TodoSchema = new Schema({
    "Username": {
        "type": "String"
    },
    "Task": {
        "type": "String"
    },
    "Completed":{
        "type": "Boolean"
    },
    "Time": {
        "type": "String"
    }
    
});