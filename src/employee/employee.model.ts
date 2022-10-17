import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});





export interface Employee extends Document {
  id: string;
  name: string;
  age: number;

}
