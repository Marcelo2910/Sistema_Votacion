import bcrypt from 'bcryptjs'
import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    matricula:{
        type: String,
        unique: true,
        required:true
    },
    username:{
        type:String,
        unique: true,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    apellidos:{
        type:String,
        required:true
    },
    representacion:{
        type:String,
        required:true
    },
    sector:{
        type:String,
        enum: ['Estudiante','Docente','Trabajador'],
        required:true
    },
    sexo:{
        type:String,
        enum: ['Hombre','Mujer'],
        required:true
    },
    unidad_academica:{
        type:String,
        required:true
    },
    programa_academico:{
        type:String,
        required:true
    },
    email:{
        type: String,
        unique: true,
        required:true
    },
    password:{
        type:String,
        required:true
    },roles: [{
        ref: "Role",
        type: mongoose.Schema.Types.ObjectId,
    }],
    imagen: String //busboy o multer
},{
    timestamps:true,
    versionKey:false
})



usuarioSchema.statics.encriptaPass = async (password) => {
   const passHash = await bcrypt.hash(password, 10)
   return passHash
}

usuarioSchema.statics.comparaPass = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default mongoose.model('User', usuarioSchema)