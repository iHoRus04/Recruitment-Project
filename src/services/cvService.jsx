import {del, get, post, update} from "../utils/request"
export const applyCv = async (data)=>{
    const res = post("cv",data);
    return res;
}
export const getCV = async ()=>{
    const res = await get("cv");
    return res;
} 
export const findCV = async (id)=>{
    const res = await get(`cv/${id}`);
    return res;
} 
export const statusCV = async (id,data)=>{
    const res = await update(`cv/${id}`,data);
    return res;
}
export const getCompanyCV = async (id)=>{
    const res = await get(`cv?idCompany=${id}`);
    return res;
} 
export const deleteCV  = async (id)=>{
    const res = await del(`cv/${id}`);
    return res;
}