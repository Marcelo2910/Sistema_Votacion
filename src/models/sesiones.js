import mongoose from "mongoose";

const sesionSchema = new mongoose.Schema({
    fecha_sesion: {
        type: String,
        default:Date,
        required: true
    },
    
    tipo_sesion : {
        type: String,
        required: true, 
        enum : [ 'Sesión Extraordinaria','Sesión Ordinaria','Sesión Especial','Sesión Solemne'] 
    }
}, {
    timestamps: true,
    versionKey: false
})

sesionSchema.pre('remove', function(next){
    this.model('Temas').remove({sesion:this._id},next)
})

export default mongoose.model('Sesion', sesionSchema)