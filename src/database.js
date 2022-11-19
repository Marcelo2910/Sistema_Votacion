import mongoose from "mongoose"
import {DATABASE} from './config.js'

mongoose.connect(DATABASE)
    .then(db => console.log('Db esta conectada'))
    .catch(error => console.log('No se conecto a la base de datos'))