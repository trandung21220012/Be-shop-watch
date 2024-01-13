import mongoose from "mongoose";
const testSchema = new mongoose.Schema({
  name: String,
  age: Number,
  class: String,
});

const TestModel = mongoose.model('test', testSchema);
export default TestModel 
///sua cart thanh test

// name:string , age: number ,class :string