import mongoose from "mongoose";

const votacionschema = new mongoose.Schema({
    tema:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Temas',
        required:true
    },
    tipo_voto : {
        type: String,
        required: true, 
        enum : [ 'favor','contra','abstinencia'] 
    }
},{
    timestamps: true,
    versionKey: false
})

export default mongoose.model('Votacion', votacionschema)