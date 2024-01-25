import express from "express"
import { createProduct,getMangageProduct,detailProduct,getNewProduct} from "../controller/product"
const routerProduct = express.Router()
routerProduct.get('/', getMangageProduct )
routerProduct.get('/:id', detailProduct )
routerProduct.post('/', createProduct )
routerProduct.get('/new',getNewProduct)

export default routerProduct