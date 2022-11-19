import mongoose from "mongoose";

const asistenciaSchema = new mongoose.Schema({
    tema: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Temas',
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    asistencia: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model('Asistencia',asistenciaSchema)