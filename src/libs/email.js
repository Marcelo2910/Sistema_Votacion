import nodemailer from 'nodemailer'
import {CORREO, PASS_CORREO,PORT_CORREO} from '../config.js'

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: PORT_CORREO, // para enviar de forma segura se usa el puerto 465
    secure: true, // va en true cuando el puerto es 465 en false para otros
    auth: {
        user: CORREO,
        pass: PASS_CORREO
    },
    tls: {
        rejectUnauthorized: false
    }
});

transporter.verify().then(() => {
    console.log('Listo para enviar emails')
})

