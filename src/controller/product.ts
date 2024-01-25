import { RequestHandler } from "express"
import productModel from "../model/product"
import { dataReturn, errorReturn, getErrorMessage } from "../ulti/hook"
import trademarkModel from "../model/trademark"
// import FavoriteModel from "../model/favorite"


export const getMangageProduct: RequestHandler = async (req, res)=>{
    try {
        // const userId =123
        const name = req.query.name || ""
        const activePage = +req.query.page
        const limit = +req.query.pageSize
        const skip = (activePage -1)*limit
        const record = await productModel.countDocuments()
        const totalPage = Math.ceil(record/limit)
        const data = await productModel.find({name:{$regex: name , $options :'i'}}).skip(skip).limit(limit)
        // console.log("🚀 ~ file: product.ts:20 ~ constgetMangageProduct:RequestHandler= ~ data:", data)
        // const listIdFavoriteProduct = (await FavoriteModel.find({userId: userId})).map((i)=> i.productId)
        // data.map((i)=>(
        //     {
        //         ...data,
        //         favorite: listIdFavoriteProduct.includes(i._id)
        //     }\
        
        // ))
        const idTrademark = data.map((i)=>(i.trademarkId))
        const listTrademark = await trademarkModel.find({ '_id': { $in: idTrademark } })

      const dataR =  data.map((i)=>{ // 
        return {
            _id:i._id,
            name:i.name,
            discountedPrice:i.discountedPrice,
            originalPrice:i.originalPrice,
            images:i.images,
            trademark :  listTrademark.find((value)=>value._id.toString() == i.trademarkId) // là một phương thức gọi trên mảng listTrademark, dùng để tìm phần tử trong listTrademark có _id giống với i.trademarkId.
        }
        // thêm thông tin về thương hiệu của sản phẩm từ mảng listTrademark, và trả về một mảng mới với các đối tượng sản phẩm có thông tin thương hiệu bổ sung
       })

    // const trademark = await trademarkModel.findById(data.trademarkId)
        res.send(dataReturn({
            items:dataR, total:totalPage
        }))
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}

export const createProduct: RequestHandler = async (req,res) => {
    try {
        const dataBody = req.body
        const data = await productModel.create({...dataBody,trademarkId:dataBody.trademark})
       res.send(dataReturn(data,'them moi thanh cong'))
    } catch (error) {
       res.send(error)
    }
}

export const detailProduct : RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const product = await productModel.findOne({_id:id})
        const trademark = await trademarkModel.findOne({_id:product.trademarkId})
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cloneProduct:any = {...product} 
        const dataRe ={...cloneProduct._doc, trademark}
        res.send(dataReturn(dataRe))
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}

export const getNewProduct : RequestHandler = async (req, res) => {
    try {
    const activePage = +req.query.page
    const limit = +req.query.pageSize
    const skip = (activePage -1)*limit
    const record = await productModel.countDocuments()
    const totalPage = Math.ceil(record/limit)
    const data = await productModel.find().sort({createdAt: -1}).skip(skip).limit(limit) 
    const idTrademark = data.map((i)=>(i.trademarkId))
    const listTrademark = await trademarkModel.find({ '_id': { $in: idTrademark } })

  const dataR =  data.map((i)=>{ // 
    return {
        _id:i._id,
        name:i.name,
        discountedPrice:i.discountedPrice,
        originalPrice:i.originalPrice,
        images:i.images,
        trademark :  listTrademark.find((value)=>value._id.toString() == i.trademarkId) 
    }
   
   })

// const trademark = await trademarkModel.findById(data.trademarkId)
    res.send(dataReturn({
        items:dataR, total:totalPage
    }))
} catch (error) {
    res.send(errorReturn(getErrorMessage(error)))
}
}
