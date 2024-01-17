import { RequestHandler } from "express";
import CanboModel from "../model/canbo";
import { dataReturn, errorReturn, getErrorMessage } from "../ulti/hook";

// Tinh tuoi tinh bang timestamp 
const  calculateAge = (birthTimestamp: number) => {
  const currentTimestamp = Date.now();
  const ageInMilliseconds = currentTimestamp - birthTimestamp;
  const ageInSeconds = ageInMilliseconds / 1000;
  const ageInYears = ageInSeconds / (365.25 * 24 * 60 * 60); 
  const roundedAge = Math.floor(ageInYears);

  return roundedAge;
}

interface SearchOptions {
  name?: { $regex: string; $options: 'i' };
  age?: number;
  country?: { $regex: string; $options: 'i' };
}

export const getCanbo: RequestHandler = async (req, res) => {
  try {
    const searchOptions: SearchOptions = {};
    if (typeof req.query.name === 'string') {
      searchOptions.name = { $regex: req.query.name, $options: 'i' };
    }
    if (typeof req.query.age === 'string') {
      searchOptions.age = parseInt(req.query.age, 10);
    }
    if (typeof req.query.country === 'string') {
      searchOptions.country = { $regex: req.query.country, $options: 'i' };
    }
    const data = await CanboModel.find(searchOptions);
    //khai bao dataFormat gan bang bien value
    const dataFormat = data.map((value)=> {
      return {
        ...value,age:calculateAge(value.birthday) 
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