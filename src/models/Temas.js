import mongoose from "mongoose";

const temasSchema = new mongoose.Schema({
    sesion: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Sesion',
        required: true
    },
    temaDescripcion: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model('Temas',temasSchema)