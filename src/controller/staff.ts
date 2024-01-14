import { RequestHandler } from "express"
import { dataReturn, errorReturn, getErrorMessage } from "../ulti/hook"
import StaffModel from "../model/staff"

// Tim theo ten
export const getMangageStaff: RequestHandler = async (req, res)=>{
    try {

        const nameSearch = req.query.name || ""
        const data = await StaffModel.find({name:{$regex: nameSearch , $options :'i'}})
  
        res.send(dataReturn({
            items:data
        }))
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}

// Tim theo tuoi 
export const getStaffByAge: RequestHandler = async (req, res) => {
    try {
      const today = new Date();  
      const data = await StaffModel.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $gt: [today.getFullYear(), {$year: "$birthday"}] },
                { $lt: [today.getFullYear() + 1, {$year: "$birthday"}] },
              ],
            },
          },
        },
      ]);  
      res.send(dataReturn({
        items: data,
      }));
    } catch (error) {
      res.send(errorReturn(getErrorMessage(error)));
    }
  };
  
export const createStaff: RequestHandler = async (req,res) => {
    try {
        const dataBody = req.body
        const data = await StaffModel.create(dataBody)
       res.send(dataReturn(data,'them moi thanh cong'))
    } catch (error) {
       res.send(error)
    }
}

export const updateStaff: RequestHandler = async (req,res) =>{
    try {
        const id = req.params.id 
        const dataBody = req.body
        const updatedStaff = await StaffModel.findByIdAndUpdate(id,dataBody)
        res.send(dataReturn(updatedStaff))

    } catch (error) {
        res.send(error)
    }
}

export const detailStaff : RequestHandler = async (req, res) => {
    try {
        const id = req.params.id 
        const staff = await StaffModel.findOne({_id:id})
        res.send(dataReturn(staff))
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}

export const deleteStaff : RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const deletedStaff = await StaffModel.findByIdAndDelete(id)
        res.send(dataReturn(deletedStaff,'xoa thanh cong'))
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}