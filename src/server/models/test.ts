import {ITest} from "../domain/ITest";
import Database from '../dbConfigs';
import {Schema} from "mongoose";

const {mongo: {model}} = Database;

const TestSchema: Schema = new Schema({text: {type: String}});

export default model<ITest>('Test',TestSchema);

