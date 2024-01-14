import express from "express"
import { protect } from "../controller/auth"
import { createStaff, deleteStaff, detailStaff, getMangageStaff, getStaffByAge, updateStaff } from "../controller/staff"
const routerStaff = express.Router()
routerStaff.use(protect)

routerStaff.get('/', getMangageStaff) 
routerStaff.get('/', getStaffByAge)
routerStaff.post('/', createStaff )
routerStaff.get('/:id', detailStaff )
routerStaff.delete('/:id', deleteStaff )
routerStaff.put('/:id',updateStaff)

export default routerStaff