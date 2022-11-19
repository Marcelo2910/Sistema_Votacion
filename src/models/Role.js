import mongoose from "mongoose";



export const ROLES = ["user","admin"]

const roleSchema = new mongoose.Schema({
    nombre:String
},{
    versionKey:false
})

export default mongoose.model("Role", roleSchema)