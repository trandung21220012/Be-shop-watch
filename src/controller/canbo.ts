import { RequestHandler } from "express";
import CanboModel from "../model/canbo";
import { dataReturn, errorReturn, getErrorMessage } from "../ulti/hook";
import moment from "moment";

// Tinh tuoi tinh bang timestamp 
function calculateAge(birthTimestamp: number): number {
  const birthDate = moment(birthTimestamp);
  const currentYear = moment().year();
  const birthYear = birthDate.year();

  const age = currentYear - birthYear;
  
  return age;
}

interface SearchOptions {
  name?: { $regex: string; $options: 'i' };
  birthday?: {$gte: number, $lte: number };
  country?: { $regex: string; $options: 'i' };
}

export const getCanbo: RequestHandler = async (req, res) => {
  try {
    const searchOptions: SearchOptions = {};
    if (typeof req.query.name === 'string') {
      searchOptions.name = { $regex: req.query.name.trim(), $options: 'i' };
    }
    
// thoi diem hien tai - so tuoi => lay nam sinh ra
// thoi diem dau va cuoi nam sinh ra => diem dau< bd< diem cuoi
    
    if (typeof req.query.age === 'string') {
    
      const getYear = new Date()

      const namhientai = getYear.getFullYear()
  
      const namsinh = namhientai - parseInt(req.query.age.trim())
      const daunam =moment(`${namsinh}-01-01`).startOf('year').valueOf()
      const cuoinam = moment(`${namsinh}-12-31`).endOf('year').valueOf()
      
      searchOptions.birthday =  { $gte: daunam, $lte: cuoinam };
    }
    if (typeof req.query.country === 'string') {
      searchOptions.country = { $regex: req.query.country.trim(), $options: 'i' };
    }
    const data = await CanboModel.find(searchOptions).sort({ name: 1 })

    //clone du lieu 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clone:any[] = [...data]
    
    //khai bao dataFormat gan bang bien value
    const dataFormat = clone.map((value)=> {
      return {
        ...value._doc,age:calculateAge(value.birthday) 
    //ke thua het gtri cua value voi bien calculateAge va dan gtri birthday moi 
      }
    }) 

    res.send(dataReturn({
      items: dataFormat
    }));
  } catch (error) {
    res.send(errorReturn(getErrorMessage(error)));
  }
};


export const createcanbo: RequestHandler = async (req,res) => {
    try {
        const dataBody = req.body 
        const data = await CanboModel.create(dataBody)

        res.send(dataReturn(data,'Them moi thanh cong'))
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}

export const updatecanbo: RequestHandler = async (req,res) => {
    try {
        const id = req.params.id
        const dataBody = req.body
        const updatedcanbo = await CanboModel.findByIdAndUpdate(id,dataBody) 

        res.send(dataReturn(updatedcanbo))
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}

export const detailcanbo: RequestHandler = async (req,res) => {
    try {
        const id = req.params.id
        const detaill = await CanboModel.findOne({_id:id})

        res.send(dataReturn(detaill))
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}

export const deletecanbo: RequestHandler = async (req,res) =>{
    try {
        const id = req.params.id
        const deleted = await CanboModel.findByIdAndDelete(id)

        res.send(dataReturn(deleted,'Xoa thanh cong'))
    } catch (error) {
        res.send(errorReturn(getErrorMessage(error)))
    }
}