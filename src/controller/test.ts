import { RequestHandler } from "express"
import { dataReturn, errorReturn, getErrorMessage } from "../ulti/hook"
import TestModel from "../model/test"


export const getMangageTest: RequestHandler = async (req, res)=>{
    //tim kiem theo name
    try {

        const nameSearch = req.query.name || ""
        const data = await TestModel.find({name:{$regex: nameSearch , $options :'i'}})
  
        res.send(dataReturn({
            items:data
        }))
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}

export const createTest: RequestHandler = async (req,res) => {
    try {
        const dataBody = req.body
        const data = await TestModel.create(dataBody)
       res.send(dataReturn(data,'them moi thanh cong'))
    } catch (error) {
       res.send(error)
    }
}

export const updateTest: RequestHandler = async (req,res) =>{
    try {
        const id = req.params.id 
        const dataBody = req.body
        const updatedTest = await TestModel.findByIdAndUpdate(id,dataBody)
        res.send(dataReturn(updatedTest))

    } catch (error) {
        res.send(error)
    }
}

export const detailTest : RequestHandler = async (req, res) => {
    try {
        const id = req.params.id /// pram
        const test = await TestModel.findOne({_id:id})
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        res.send(dataReturn(test))
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}

// trademarkModel.findByIdAndDelete(id)

export const deleteTest : RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const deletedTest = await TestModel.findByIdAndDelete(id)
        res.send(dataReturn(deletedTest,'xoa thanh cong'))
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}
