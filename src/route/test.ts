import express from "express"
import { protect } from "../controller/auth"
import { createTest, deleteTest, detailTest, getMangageTest, updateTest } from "../controller/test"
const routerTest = express.Router()
routerTest.use(protect)

routerTest.get('/',getMangageTest) //=> student
routerTest.post('/', createTest )
routerTest.get('/:id', detailTest ) //=> student/123 => param id = 123
routerTest.delete('/:id', deleteTest )
routerTest.put('/:id',updateTest)

export default routerTest
// noi den controller cua test
