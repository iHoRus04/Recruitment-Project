import { get, post } from "../utils/request"

export const registerUser = async (data)=>{
    const res = await post("companies",data);
    return res;
}
export const getUser = async ()=>{
    const res = await get("users");
    return res;
}
export const loginUser = async (data)=>{
    const res = await get(`companies?email=${data.email}&password=${data.password}`);
    return res;
}
