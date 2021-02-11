import {ITest} from "../domain/ITest";
import Database from '../dbConfigs';
import {Schema} from "mongoose";

const {mongo: {model}} = Database;

const TestSchema: Schema<ITest> = new Schema<ITest>({text: {type: String, required: true}});

export default model<ITest>('Test',TestSchema);

