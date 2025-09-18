import { del, get, post, update } from "../utils/request"

export const getJobs = async ()=>{
    const res = await get(`jobs`);
    return res;
}
export const getListCity = async ()=>{
    const jobs = await get(`jobs`);
    const cities = jobs.flatMap(item => item.city);
    const res = [...new Set(cities)];
    return res;
}
export const findJobs = async (id)=>{
    const res = await get(`jobs/${id}`);
    return res;
}
export const getCompanyJobs= async (id)=>{
    const res = await get(`jobs?idCompany=${id}`);
    return res;
    
}
export const getCity = async ()=>{
    const res = await get("cities");
    return res;
}
export const getTags = async ()=>{
    const res = await get("tags");
    return res;
}

export const createJob = async (data)=>{
    const res = await post("jobs",data);
    return res;
}
export const updateJob = async (id,data)=>{
    const res = await update(`jobs/${id}`,data);
    return res;
}
export const deleteJob = async (id)=>{
    const res = await del(`jobs/${id}`);
    return res;
}