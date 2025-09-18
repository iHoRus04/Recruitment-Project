const API_DOMAIN = "http://localhost:3000/";

const request = async (path, options={})=>{
    try {
        const response = await fetch(API_DOMAIN + path,{
        headers:{
            "Content-Type": "application/json",
        },
        ...options,
        });
        if(!response.ok){
            throw new Error(`Fetch API error! status: ${response.status}`);
        }
    
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
   
    
};
export const get = (path) => request(path);
export const post = (path,data) => request(path,{
    method: "POST",
    body: JSON.stringify(data),
});
export const update = (path,data)=> request(path,{
    method: "PATCH",
    body: JSON.stringify(data),
})
export const del = (path) => request(path, {
    method: "DELETE",
});
