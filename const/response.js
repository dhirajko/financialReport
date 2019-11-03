const success=(code,data)=>{
    return{
        status_code:code,
        message: "SUCCESS",
        data: data
    }
}
const failed=(code,message)=>{
    return{
        status_code:code,
        message: "FAILED",
        data: message
    }
}

module.exports={failed,success}