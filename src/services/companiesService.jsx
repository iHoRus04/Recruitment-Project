import { get, update } from "../utils/request";

export const getCompany = async ()=>{
 const res = await get(`companies`);
 return res;
}
export const findCompany = async (id)=>{
 const res = await get(`companies/${id}`);
 return res;
}
export const editCompany = async (id,data)=>{
    const res = update(`companies/${id}`,data);
    return res;
}