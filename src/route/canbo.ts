import  express  from "express"
import { getCanbo,createcanbo,updatecanbo,detailcanbo,deletecanbo } from "../controller/canbo";

const routerCanbo = express.Router()


routerCanbo.get('/',getCanbo)
routerCanbo.post('/', createcanbo)
routerCanbo.put('/id',updatecanbo)
routerCanbo.get('/id',detailcanbo)
routerCanbo.delete('/id',deletecanbo)

export default routerCanbo 

